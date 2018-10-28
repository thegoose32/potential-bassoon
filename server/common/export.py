import math
import re
import json

import xlsxwriter


class Cell:
    def __init__(self, row, col, formula, format_name):
        self.row = row
        self.col = col
        self.format = format_name
        self.formula = formula

    @classmethod
    def from_coordinates(cls, row, col, formula, format_name=None):
        return cls(row, col, formula, format_name)

    @classmethod
    def from_colrow(cls, colrow, formula, format_name=None):
        row, col = Cell.decode_colrow(colrow)
        return cls(row, col, formula, format_name)

    @property
    def colrow(self):
        return Cell.encode_colrow(self.row, self.col)

    @staticmethod
    def decode_colrow(colrow):
        match = re.match(r'([A-Za-z]+)(\d+)', colrow)
        if match is None:
            raise ValueError(colrow + " is not a legal cell reference")
        col_string = match.group(1).upper()
        col = 0
        for c in col_string:
            col = col * 26
            col = col + ord(c) - ord('A') + 1
        row = int(match.group(2))
        return row-1, col-1

    @staticmethod
    def encode_colrow(row, col):
        if row is None or col is None:
            return None

        letter_accum = ""
        col_accum = col+1

        while True:
            letter_accum = chr(col_accum % 26 + 64) + letter_accum
            col_accum = int(col_accum / 26)
            if col_accum == 0:
                break
        return letter_accum + str(1 + row)


class ExportVersion:
    def __init__(self, name, period, display_selections, revenue_milestones,
                 external_spend, headcount_effort, forecast_expenses):
        self.name = name
        self.period = period
        self.display_selections = display_selections
        self.revenue_milestones = revenue_milestones
        self.external_spend = external_spend
        self.headcount_effort = headcount_effort
        self.forecast_expenses = forecast_expenses

    @classmethod
    def from_json(cls, json_vals, quarter_index, num_quarters):
        # this internal routine is used to convert a list in the form [{period, value}, ...] to [value, ...] where
        # the period is the index.  The latter is way simpler to use.  Brute force; allocate an empty list, then set
        # the values in it.
        def value_map_to_list(value_map_lists):
            by_program_by_quarter = []
            for value_map_list in value_map_lists:
                value_list = [None] * num_quarters
                for value_map in value_map_list:
                    value_list[quarter_index[value_map['period']]] = value_map['amount']
                by_program_by_quarter.append(value_list)
            return by_program_by_quarter

        display_selections = {ds['year']: ds['type'] for ds in json_vals['displaySelections']}
        revenue_milestones = json_vals['revenueMilestones']

        return cls(
            json_vals['versionName'],
            json_vals['versionPeriod'],
            display_selections,
            revenue_milestones,
            value_map_to_list(json_vals['externalSpend']),
            value_map_to_list(json_vals['headcountEffort']),
            value_map_to_list(json_vals['forecastExpenses'])
        )


class ExportModel:
    def __init__(self, model_name, start_year, end_year, program_names, program_fte_rates,
                 quarter_index, num_quarters, versions):
        self.model_name = model_name
        self.start_year = start_year
        self.end_year = end_year
        self.program_names = program_names
        self.program_fte_rates = program_fte_rates
        self.quarter_index = quarter_index
        self.num_quarters = num_quarters
        self.versions = versions

    @classmethod
    def from_json(cls, model_json: str):
        model = json.loads(model_json)
        model_name = model['modelName']
        start_year = int(model['startYear'])
        end_year = int(model['endYear'])
        program_names = [pi['name'] for pi in model['programs']]
        program_fte_rates = [pi['fteRate'] for pi in model['programs']]

        quarter_index = {}
        num_quarters = 0
        for y in range(start_year, end_year + 1):
            for add in (0, 0.25, 0.5, 0.75):
                quarter_index[y + add] = num_quarters
                num_quarters = num_quarters + 1

        versions = []
        for vjson in model['versions']:
            versions.append(ExportVersion.from_json(vjson, quarter_index, num_quarters))
        versions.sort(key=lambda version: version.period)

        return cls(model_name, start_year, end_year, program_names, program_fte_rates,
                   quarter_index, num_quarters, versions)


class ExportSheet:
    def __init__(self, model):
        self.current_row = 0
        self.current_col = 0
        self.next_row = None
        self.cells = []
        self.quarter_totals = [self.label_from_quarter(quarter) for quarter in sorted(model.quarter_index.keys())]
        self.quarter_totals.append("Total")
        self.references = {}

    @property
    def colrow(self):
        return Cell.encode_colrow(self.current_row, self.current_col)

    @staticmethod
    def label_from_quarter(quarter):
        frac, whole = math.modf(quarter)
        return "Q" + str(1 + int(4 * frac)) + " " + str(int(whole))

    def bump_row(self, num_rows=1):
        if self.next_row is None:
            self.current_row = self.current_row + num_rows
        else:
            self.current_row = self.next_row + num_rows - 1
            self.next_row = None
        self.current_col = 0

    def insert_row(self, values, format_name=""):
        for value in values:
            self.cells.append(Cell.from_coordinates(self.current_row, self.current_col, value, format_name))
            self.current_col = self.current_col + 1

    def insert_col(self, values, format_name=""):
        save_row = self.current_row
        for value in values:
            self.cells.append(Cell.from_coordinates(self.current_row, self.current_col, value, format_name))
            self.current_row = self.current_row + 1
        self.current_row = save_row
        self.current_col = self.current_col + 1
        self.next_row = save_row + len(values)

    def quarter_heading(self, title):
        self.cells.append(Cell.from_coordinates(self.current_row, self.current_col, title, "bold"))
        self.current_col = self.current_col + 1
        self.insert_row(self.quarter_totals, "bold")

    def insert_single_sum(self, base, format_name):
        base_row, base_col = Cell.decode_colrow(base)
        if base_row == self.current_row:
            # horizontal sum
            self.insert_row(["=SUM(" + base + ":" + Cell.encode_colrow(base_row, self.current_col-1) + ")"],
                            format_name)
        else:
            # vertical sum
            self.insert_col(["=SUM(" + base + ":" + Cell.encode_colrow(self.current_row-1, base_col) + ")"],
                            format_name)

    def insert_sum_col(self, num_rows, cols_before, format_name=""):
        self.insert_col(["=SUM(" + Cell.encode_colrow(row, self.current_col-cols_before) + ":" +
                         Cell.encode_colrow(row, self.current_col-1) + ")" for row in
                         range(self.current_row, self.current_row + num_rows)], format_name)

    def insert_sum_row(self, rows_above, num_cols, format_name="", format_label="", label="Total"):
        self.insert_col([label], format_label)
        self.insert_row(["=SUM(" + Cell.encode_colrow(self.current_row-rows_above, col) + ":" +
                        Cell.encode_colrow(self.current_row-1, col) + ")" for col in
                        range(self.current_col, self.current_col + num_cols)], format_name)
        self.current_col = self.current_col + num_cols

    def set_reference(self, name, fixed_row=False, fixed_col=False, offset_row=0, offset_col=0):
        self.references['['+name+']'] = \
            [self.current_row + offset_row, self.current_col + offset_col, fixed_row, fixed_col]

    def shift_reference(self, name, offset_row=0, offset_col=0):
        self.references['['+name+']'][0] = self.references['['+name+']'][0] + offset_row
        self.references['['+name+']'][1] = self.references['['+name+']'][1] + offset_col

    @staticmethod
    def translate_references(formula, references, row_offset, col_offset):
        def build_colrow(ref):
            if ref[2]:
                row = ref[0]
            else:
                row = ref[0] + row_offset
            if ref[3]:
                col = ref[1]
            else:
                col = ref[1] + col_offset
            return Cell.encode_colrow(row, col)
        for name, reference in references.items():
            colrow = build_colrow(reference)
            formula = formula.replace(name, colrow)
        return "=" + formula

    def fill_formula(self, formula, rows, cols, format_name="", overwrite=False):
        # this is a trade-off.  we could process all references, which is wasteful, or make copies -- wasteful
        # if all references were used in every formula, then active_references would make things worse
        # here we are betting that most formulas will use only one or two of many references
        active_references = {k: v for k, v in self.references.items() if formula.find(k) > -1}

        for row_offset in range(0, rows):
            for col_offset in range(0, cols):
                translated_formula = self.translate_references(formula, active_references, row_offset, col_offset)
                new_cell = Cell.from_coordinates(
                    self.current_row + row_offset,
                    self.current_col + col_offset,
                    translated_formula,
                    format_name
                )
                put_at = -1
                if overwrite:
                    put_at = next((ix for ix, cell in enumerate(self.cells)
                                   if cell.row == new_cell.row and cell.col == new_cell.col), -1)
                if put_at == -1:
                    self.cells.append(new_cell)
                else:
                    self.cells[put_at] = new_cell

        self.current_col = self.current_col + cols
        self.next_row = self.current_row + rows

    @classmethod
    def from_version(cls, model, version, sheets):
        new = cls(model)

        # Annual FTE Data
        new.insert_row(['Programs', 'Annual FTE Rate'], "bold")
        new.bump_row()
        new.set_reference('program_names', fixed_col=True)
        new.insert_col(model.program_names)
        new.set_reference('fte', fixed_col=True)
        new.insert_col(model.program_fte_rates)

        # Milestones
        new.bump_row(2)
        new.insert_row(['Transaction Price', 'Date', 'Amount'], "bold")
        new.bump_row()
        new.set_reference('milestone_name', fixed_col=True)
        new.insert_col([milestone['name'] for milestone in version.revenue_milestones])
        new.set_reference('milestone_date', fixed_col=True)
        new.insert_col([new.label_from_quarter(milestone['dateEarned']) for milestone in version.revenue_milestones])
        new.set_reference('milestone_amount', fixed_col=True)
        new.insert_col([milestone['amount'] for milestone in version.revenue_milestones])

        # External Spend
        new.bump_row(2)
        new.quarter_heading("External Spend")
        new.bump_row()
        new.set_reference('external_spend')
        for ix, program_name in enumerate(model.program_names):
            new.insert_col([program_name])
            sum_base = new.colrow
            new.insert_row(version.external_spend[ix], "whole_dollar")
            new.insert_single_sum(sum_base, "whole_dollar")
            new.bump_row()
        new.insert_sum_row(len(model.program_names), 1 + len(model.quarter_index), "whole_dollar")

        # FTE Effort
        new.bump_row(2)
        new.quarter_heading("FTE Effort")
        new.bump_row()
        new.set_reference('fte_effort')
        for ix, program_name in enumerate(model.program_names):
            new.insert_col([program_name])
            sum_base = new.colrow
            new.insert_row(version.headcount_effort[ix], "decimal")
            new.insert_single_sum(sum_base, "decimal")
            new.bump_row()
        new.insert_sum_row(len(model.program_names), 1 + len(model.quarter_index), "decimal")

        # FTE Spend - FTE effort * Annual amount (at top)
        new.bump_row(2)
        new.quarter_heading("FTE Spend")
        new.set_reference('fte_spend')
        new.insert_col(model.program_names)
        new.fill_formula("([fte_effort]*[fte_rate])/4", len(model.program_names), len(model.quarter_index),
                         "whole_dollar")
        new.insert_sum_col(len(model.program_names), len(model.quarter_index), "whole_dollar")
        new.bump_row()
        new.insert_sum_row(len(model.program_names), 1 + len(model.quarter_index), "whole_dollar")

        # Total Spend in $
        new.bump_row(2)
        new.quarter_heading("Total Spend")
        new.insert_col(model.program_names)
        new.fill_formula("[external_spend]+[fte_spend]", len(model.program_names), len(model.quarter_index),
                         "whole_dollar")
        new.insert_sum_col(len(model.program_names), len(model.quarter_index), "whole_dollar")
        new.bump_row()
        new.set_reference('total_spend_dollars')
        new.insert_sum_row(
            len(model.program_names),
            1 + len(model.quarter_index),
            "whole_dollar",
            label="Total Development Costs ($)"
        )
        new.set_reference('grand_total_spend_dollars', True, True, offset_col=-1)

        # Total Spend in percent
        new.bump_row()
        new.insert_col(["Total Development Costs (%)"])
        new.set_reference('total_development_percent')
        new.fill_formula("[total_spend_dollars]/[grand_total_spend_dollars]", 1, len(model.quarter_index), "percent")

        # Running total dollars
        new.bump_row()
        new.insert_col(["Running Total Development Costs ($)"])
        new.set_reference('previous_period_total')
        new.set_reference('running_total_dollars')
        new.fill_formula("[total_spend_dollars]", 1, 1, "whole_dollar")
        new.fill_formula("[previous_period_total]+[total_spend_dollars]", 1, len(model.quarter_index) - 1,
                         "whole_dollar")

        # Running total percentage
        new.bump_row()
        new.insert_col(["Running Total Development Costs (%)"])
        new.set_reference('running_total_percent')
        new.fill_formula("[running_total_dollars]/[grand_total_spend_dollars]", 1, len(model.quarter_index), "percent")

        # Recognized Revenue
        # First, fill out as though this is the only sheet
        new.bump_row(2)
        new.quarter_heading("Revenue Recognized")
        # Note that we can do a "forward reference" but we've got to keep track of rows to do this.
        # don't forget the label in the offset
        new.set_reference("revenue_pool", offset_row=3, offset_col=1)
        new.set_reference("running_total_revenue", offset_row=1, offset_col=1)
        # running OTD revenue line.  Two formulas and a sum
        new.insert_col(["Total QTD Revenue"])
        new.set_reference("qtd_revenue")
        sum_base = new.colrow
        new.fill_formula("[total_development_percent]*[revenue_pool]", 1, 1, "whole_dollar")
        new.fill_formula("([running_total_percent]*[revenue_pool])-[running_total_revenue]",
                         1,
                         len(model.quarter_index)-1,
                         "whole_dollar"
                         )
        new.insert_single_sum(sum_base, "whole_dollar")
        # running total revenue
        new.bump_row()
        new.insert_col(["Running QTD Revenue"])
        new.fill_formula("[running_total_percent]*[revenue_pool]", 1, len(model.quarter_index), "whole_dollar")
        # revenue pool
        new.bump_row(2)
        new.insert_col(["Revenue Pool at Period End"])

        new.fill_formula("([running_total_percent]*[revenue_pool])-[previous_recognized]",
                         1, len(model.quarter_index), "whole_dollar")
        new.insert_sum_col(1, len(model.quarter_index), "whole_dollar")
        new.bump_row()

        return new


def export(output_location, model_json):
    model = ExportModel.from_json(model_json)
    # can't use a for comprehension here because we use the accumulating sheets array to build the sheets
    sheets = []
    for version in model.versions:
        sheet = ExportSheet.from_version(model, version, sheets)
        sheets.append(sheet)

    all_style_names = set()
    for sheet in sheets:
        all_style_names = all_style_names.union({cell.format for cell in sheet.cells})

    # ... set up styles
    formats = {}

    path = "/temp/blah.xlsx"
    workbook = xlsxwriter.Workbook(path)

    for sheet in sheets:
        ws = workbook.add_worksheet()
        for cell in sheet.cells:
            if cell.formula.startswith('='):
                ws.write_formula(cell.colrow, cell.formula, formats[cell.format])
            else:
                ws.write(cell.row, cell.col, cell.formula, formats[cell.format])

import math
import re
import json
import string
from io import BytesIO

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
    def divmod_excel(n):
        a, b = divmod(n, 26)
        if b == 0:
            return a - 1, b + 26
        return a, b

    @staticmethod
    def to_excel(num):
        chars = []
        while num > 0:
            num, d = Cell.divmod_excel(num)
            chars.append(string.ascii_uppercase[d - 1])
        return ''.join(reversed(chars))

    @staticmethod
    def encode_colrow(row, col):
        if row is None or col is None:
            return None
        return Cell.to_excel(1 + col) + str(1 + row)


class ExportVersion:
    def __init__(self, version_id, name, period, display_selections, revenue_milestones,
                 external_spend, headcount_effort, forecast_expenses):
        self.id = version_id
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
        def value_map_to_list(value_map_lists, default_value=None):
            by_program_by_quarter = []
            for value_map_list in value_map_lists:
                value_list = [default_value] * num_quarters
                for value_map in value_map_list:
                    if 'period' in value_map and value_map['period'] in quarter_index:
                        value_list[quarter_index[value_map['period']]] = value_map['amount']
                by_program_by_quarter.append(value_list)
            return by_program_by_quarter

        display_selections = {ds['year']: ds['type'] for ds in json_vals['displaySelections']}
        revenue_milestones = json_vals['revenueMilestones']

        return cls(
            json_vals['versionID'],
            json_vals['versionName'],
            json_vals['versionPeriod'],
            display_selections,
            revenue_milestones,
            value_map_to_list(json_vals['externalSpend'], default_value=0),
            value_map_to_list(json_vals['headcountEffort'], default_value=0),
            value_map_to_list(json_vals['forecastExpenses'], default_value=0)
        )


class ExportModel:
    def __init__(self, model_name, start_year, end_year, program_names, program_fte_rates,
                 quarter_index, num_quarters, versions, active_version_id):
        self.model_name = model_name
        self.start_year = start_year
        self.end_year = end_year
        self.program_names = program_names
        self.program_fte_rates = program_fte_rates
        self.quarter_index = quarter_index
        self.num_quarters = num_quarters
        self.versions = versions
        self.active_version_id = active_version_id

    @classmethod
    def from_json(cls, model_json: str):
        model = json.loads(model_json)
        return cls.from_model(model)

    @classmethod
    def from_model(cls, model):
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
                   quarter_index, num_quarters, versions, model['activeVersionID'])


class ExportSheet:
    def __init__(self, model, period):
        self.current_row = 0
        self.current_col = 0
        self.is_active = False
        self.next_row = None
        self.cells = []
        self.quarter_totals = [self.label_from_quarter(quarter) for quarter in sorted(model.quarter_index.keys())]
        self.quarter_totals.append("Total")
        self.references = {}
        self.period = period

    @property
    def name(self):
        return self.label_from_quarter(self.period) + " period end"

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

    def set_reference_position(self, name, fixed_row=False, fixed_col=False, row=0, col=0):
        self.references['['+name+']'] = \
            [row, col, fixed_row, fixed_col]

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
        new = cls(model, version.period)
        new.is_active = (model.active_version_id == version.id)

        # Annual FTE Data
        new.insert_row(['Programs', 'Annual FTE Rate'], "bold")
        new.bump_row()
        new.set_reference('program_names', fixed_col=True)
        new.insert_col(model.program_names)
        new.set_reference('fte_rate', fixed_col=True)
        new.insert_col(model.program_fte_rates, "whole_dollar")

        # Milestones
        new.bump_row(2)
        new.insert_row(['Transaction Price', 'Date', 'Amount'], "bold")
        new.bump_row()
        new.set_reference('milestone_name', fixed_col=True)
        new.insert_col([milestone['name'] for milestone in version.revenue_milestones])
        new.set_reference('milestone_date_start', fixed_col=True, fixed_row=True)
        new.set_reference('milestone_date_end', fixed_col=True, fixed_row=True,
                          offset_row=len(version.revenue_milestones))
        new.insert_col([new.label_from_quarter(milestone['dateEarned']) for milestone in version.revenue_milestones])
        new.set_reference('milestone_amount_start', fixed_col=True, fixed_row=True)
        new.set_reference('milestone_amount_end', fixed_col=True, fixed_row=True,
                          offset_row=len(version.revenue_milestones))
        new.insert_col([milestone['amount'] for milestone in version.revenue_milestones], "whole_dollar")

        # Running total revenue
        new.bump_row(2)
        new.set_reference('quarter_name', fixed_row=True, offset_col=1)
        new.quarter_heading("Revenue Pool")
        # remove the "Total" column, since we don't use it in this case:
        del new.cells[-1]
        new.bump_row()
        new.set_reference("previous_revenue_pool")
        new.insert_col(["At Period End"])
        new.set_reference("revenue_pool")
        formula = ("=[previous_revenue_pool]+SUMIF([milestone_date_start]:[milestone_date_end],"
                   "[quarter_name],[milestone_amount_start]:[milestone_amount_end])")
        new.fill_formula(formula, 1, model.num_quarters, "whole_dollar")
        # reset to first cell and delete tally from formula
        new.current_col = 1
        new.fill_formula(
            ("=SUMIF([milestone_date_start]:[milestone_date_end],[quarter_name],[milestone_amount_start]:"
             "[milestone_amount_end])"), 1, 1, "whole_dollar", overwrite=True)

        # External Spend
        new.bump_row(2)
        new.quarter_heading("External Spend")
        new.bump_row()
        new.set_reference('external_spend', offset_col=1)
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
        new.set_reference('fte_effort', offset_col=1)
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
        new.bump_row()
        new.insert_col(model.program_names)
        new.set_reference('fte_spend')
        new.fill_formula("([fte_effort]*[fte_rate])/4", len(model.program_names), len(model.quarter_index),
                         "whole_dollar")
        new.insert_sum_col(len(model.program_names), len(model.quarter_index), "whole_dollar")
        new.bump_row()
        new.insert_sum_row(len(model.program_names), 1 + len(model.quarter_index), "whole_dollar")

        # Total Spend in $
        new.bump_row(2)
        new.quarter_heading("Total Spend")
        new.bump_row()
        new.insert_col(model.program_names)
        new.fill_formula("[external_spend]+[fte_spend]", len(model.program_names), len(model.quarter_index),
                         "whole_dollar")
        new.insert_sum_col(len(model.program_names), len(model.quarter_index), "whole_dollar")
        new.bump_row()
        new.set_reference('total_spend_dollars', offset_col=1)
        new.set_reference('grand_total_spend_dollars', True, True, offset_col=1+model.num_quarters)
        new.insert_sum_row(
            len(model.program_names),
            1 + len(model.quarter_index),
            "whole_dollar",
            label="Total Development Costs ($)"
        )

        # Total Spend in percent
        new.bump_row()
        new.insert_col(["Total Development Costs (%)"])
        new.set_reference('total_development_percent')
        new.fill_formula("[total_spend_dollars]/[grand_total_spend_dollars]", 1, len(model.quarter_index), "percent")

        # Running total dollars
        new.bump_row()
        new.set_reference('previous_period_total')
        new.insert_col(["Running Total Development Costs ($)"])
        new.set_reference('running_total_dollars')
        new.fill_formula("[previous_period_total]+[total_spend_dollars]", 1, model.num_quarters, "whole_dollar")
        new.current_col = 1
        new.fill_formula("[total_spend_dollars]", 1, 1, "whole_dollar", overwrite=True)

        # Running total percentage
        new.bump_row()
        new.insert_col(["Running Total Development Costs (%)"])
        new.set_reference('running_total_percent')
        new.fill_formula("[running_total_dollars]/[grand_total_spend_dollars]", 1, len(model.quarter_index), "percent")

        # Recognized Revenue
        # First, fill out as though this is the only sheet
        new.bump_row(2)
        new.quarter_heading("Revenue Recognized")
        new.bump_row()
        # running QTD revenue line
        new.set_reference("prev_rec_revenue", offset_row=1)
        new.insert_col(["Total QTD Revenue"])
        new.set_reference("rec_revenue")  # used in following row
        sum_base = new.colrow
        new.fill_formula("([running_total_percent]*[revenue_pool])-[prev_rec_revenue]",
                         1,
                         model.num_quarters,
                         "whole_dollar"
                         )
        new.insert_single_sum(sum_base, "whole_dollar")
        # reset column and delete previous rec revenue from first cell
        new.current_col = 1
        new.fill_formula("([running_total_percent]*[revenue_pool])", 1, 1, "whole_dollar", overwrite=True)
        if len(sheets) > 0:
            # if there are previous sheets, then fill all quarters prior to this one with
            # data from the previous sheet.
            # NOTE: only one level deep is necessary.  Prior sheet references will happen recursively
            last_sheet = sheets[-1]
            # we make a reference that actually only makes sense in the previous quarter
            last_sheet_ref = last_sheet.references['[rec_revenue]']
            last_sheet_rev_row = last_sheet_ref[0]
            last_sheet_rev_col = last_sheet_ref[1]
            last_sheet_col_count = model.quarter_index[last_sheet.period]+1
            new.set_reference_position("lastsheet_rec", row=last_sheet_rev_row, col=last_sheet_rev_col)
            new.current_col = 1
            new.fill_formula("'" + last_sheet.name + "'![lastsheet_rec]", 1,
                             last_sheet_col_count, "whole_dollar", overwrite=True)

        # running total revenue
        new.bump_row()
        new.set_reference("prev_running_rec_revenue")
        new.insert_col(["Running Total Revenue"])
        new.fill_formula("[prev_running_rec_revenue]+[rec_revenue]", 1, model.num_quarters, "whole_dollar")
        # reset column and delete previous rec revenue from first cell
        new.current_col = 1
        new.fill_formula("[rec_revenue]", 1, 1, "whole_dollar", overwrite=True)

        return new


class Exporter:
    @staticmethod
    def export(model_data):
        model = ExportModel.from_model(model_data)
        # can't use a for comprehension here because we use the accumulating sheets array to build the sheets
        sheets = []
        for version in model.versions:
            sheet = ExportSheet.from_version(model, version, sheets)
            sheets.append(sheet)

        all_style_names = set()
        for sheet in sheets:
            all_style_names = all_style_names.union({cell.format for cell in sheet.cells})

        output = BytesIO()
        workbook = xlsxwriter.Workbook(output)
        workbook.calc_on_load = True

        # ... set up styles
        formats = {}
        for style_name in all_style_names:
            if style_name == "bold":
                f = workbook.add_format()
                f.set_bold()
                formats[style_name] = f
            elif style_name == "whole_dollar":
                f = workbook.add_format()
                f.set_num_format("_(* #,##0_);_(* \(#,##0\);_(* \"-\"??_);_(@_)")
                formats[style_name] = f
            elif style_name == "decimal":
                f = workbook.add_format()
                f.set_num_format("0.00")
                formats[style_name] = f
            elif style_name == "percent":
                f = workbook.add_format()
                f.set_num_format("0.0%")
                formats[style_name] = f
            elif style_name == "":
                f = workbook.add_format()
                formats[style_name] = f
            else:
                raise ValueError("Unknown style name: " + style_name)

        for sheet in sheets:
            ws = workbook.add_worksheet(sheet.name)
            ws.set_column(1, 100, 11)
            ws.set_column(0, 0, 35)
            if sheet.is_active:
                ws.activate()
            for cell in sheet.cells:
                if str(cell.formula).startswith('='):
                    ws.write_formula(cell.colrow, cell.formula, formats[cell.format])
                else:
                    ws.write(cell.row, cell.col, cell.formula, formats[cell.format])

        workbook.close()
        return output.getvalue()

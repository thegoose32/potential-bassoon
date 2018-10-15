import re
import json


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

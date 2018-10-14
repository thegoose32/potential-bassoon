import re
import json


class Cell:
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

    def __init__(self, row, col, formula, format_name = None):
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



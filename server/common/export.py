import re


class Cell:
    @classmethod
    def decode_colrow(clazz, colrow):
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

    @classmethod
    def encode_colrow(clazz, row, col):
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

    def __init__(self, *args, **kwargs):
        if len(args) == 3 and type(args[0]) is int and type(args[1]) is int:
            self.row = args[0]
            self.col = args[1]
            ix_formula = 2
        elif len(args) == 2 and type(args[0]) is str:
            colrow = Cell.decode_colrow(args[0])
            self.row = colrow[0]
            self.col = colrow[1]
            ix_formula = 1
        else:
            raise ValueError('bad arguments for cell constructor')
        self.formula = args[ix_formula]
        if "format" in kwargs:
            self.format = kwargs["format"]

    @property
    def colrow(self):
        return Cell.encode_colrow(self.row, self.col)


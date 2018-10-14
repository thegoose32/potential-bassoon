from common.export import Cell


class TestCell:
    def test_decode_colrow_a1(self):
        assert Cell.decode_colrow('A1') == (0, 0)

    def test_decode_colrow_b1(self):
        assert Cell.decode_colrow('B1') == (0, 1)

    def test_decode_colrow_aa65(self):
        assert Cell.decode_colrow('aa65') == (64, 26)

    def test_creation(self):
        c = Cell.from_coordinates(5, 7, 3, format_name="my_format")
        assert c.row == 5
        assert c.col == 7
        assert c.formula == 3
        assert c.colrow == "H6"
        assert c.format == "my_format"

    def test_creation_2(self):
        c = Cell.from_colrow("DD3", "C1+C2")
        assert c.row == 2
        assert c.col == 107
        assert c.formula == "C1+C2"
        assert c.colrow == "DD3"

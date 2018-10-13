from server.common.export import Cell


class TestCell(object):
    def test_decode_colrow(self):
        assert Cell.decode_colrow('A1') == (0, 0)
        assert Cell.decode_colrow('B1') == (0, 1)
        assert Cell.decode_colrow('aa65') == (64, 26)

    def test_creation(self):
        c = Cell(5, 7, 3, format="my_format")
        assert c.row == 5
        assert c.col == 7
        assert c.formula == 3
        assert c.colrow == "H6"
        assert c.format == "my_format"

    def test_creation_2(self):
        c = Cell("DD3", "C1+C2")
        assert c.row == 2
        assert c.col == 107
        assert c.formula == "C1+C2"
        assert c.colrow == "DD3"

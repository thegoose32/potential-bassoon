from common.export import Cell, ExportModel, ExportSheet


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


class ExportTestFixtures:
    model_1_json = """
    {
       "endYear":2020,
       "version":1,
       "programs":[
          {
             "id":1001,
             "name":"Program A",
             "fteRate":250000
          },
          {
             "id":1002,
             "name":"Program B",
             "fteRate":250000
          }
       ],
       "versions":[
          {
             "versionID":1,
             "versionName":"Q1 2018 close",
             "externalSpend":[
                [
                   {
                      "amount":100,
                      "period":2018
                   },
                   {
                      "amount":100,
                      "period":2018.25
                   },
                   {
                      "amount":100,
                      "period":2018.5
                   },
                   {
                      "amount":100,
                      "period":2018.75
                   },
                   {
                      "amount":100,
                      "period":2019
                   },
                   {
                      "amount":100,
                      "period":2019.25
                   },
                   {
                      "amount":100,
                      "period":2019.5
                   },
                   {
                      "amount":100,
                      "period":2019.75
                   },
                   {
                      "amount":100,
                      "period":2020
                   },
                   {
                      "amount":100,
                      "period":2020.25
                   },
                   {
                      "amount":100,
                      "period":2020.5
                   },
                   {
                      "amount":100,
                      "period":2020.75
                   }
                ],
                [
                   {
                      "amount":100,
                      "period":2018
                   },
                   {
                      "amount":100,
                      "period":2018.25
                   },
                   {
                      "amount":100,
                      "period":2018.5
                   },
                   {
                      "amount":100,
                      "period":2018.75
                   },
                   {
                      "amount":100,
                      "period":2019
                   },
                   {
                      "amount":100,
                      "period":2019.25
                   },
                   {
                      "amount":100,
                      "period":2019.5
                   },
                   {
                      "amount":100,
                      "period":2019.75
                   },
                   {
                      "amount":100,
                      "period":2020
                   },
                   {
                      "amount":100,
                      "period":2020.25
                   },
                   {
                      "amount":100,
                      "period":2020.5
                   },
                   {
                      "amount":100,
                      "period":2020.75
                   }
                ]
             ],
             "versionPeriod":2018,
             "priorVersionID":0,
             "headcountEffort":[
                [
                   {
                      "amount":2,
                      "period":2018
                   },
                   {
                      "amount":2,
                      "period":2018.25
                   },
                   {
                      "amount":2,
                      "period":2018.5
                   },
                   {
                      "amount":2,
                      "period":2018.75
                   },
                   {
                      "amount":2,
                      "period":2019
                   },
                   {
                      "amount":2,
                      "period":2019.25
                   },
                   {
                      "amount":2,
                      "period":2019.5
                   },
                   {
                      "amount":2,
                      "period":2019.75
                   },
                   {
                      "amount":2,
                      "period":2020
                   },
                   {
                      "amount":2,
                      "period":2020.25
                   },
                   {
                      "amount":2,
                      "period":2020.5
                   },
                   {
                      "amount":2,
                      "period":2020.75
                   }
                ],
                [
                   {
                      "amount":2,
                      "period":2018
                   },
                   {
                      "amount":2,
                      "period":2018.25
                   },
                   {
                      "amount":2,
                      "period":2018.5
                   },
                   {
                      "amount":2,
                      "period":2018.75
                   },
                   {
                      "amount":2,
                      "period":2019
                   },
                   {
                      "amount":2,
                      "period":2019.25
                   },
                   {
                      "amount":2,
                      "period":2019.5
                   },
                   {
                      "amount":2,
                      "period":2019.75
                   },
                   {
                      "amount":2,
                      "period":2020
                   },
                   {
                      "amount":2,
                      "period":2020.25
                   },
                   {
                      "amount":2,
                      "period":2020.5
                   },
                   {
                      "amount":2,
                      "period":2020.75
                   }
                ]
             ],
             "forecastExpenses":[
                [
                   {
                      "amount":125100,
                      "period":2018
                   },
                   {
                      "amount":125100,
                      "period":2018.25
                   },
                   {
                      "amount":125100,
                      "period":2018.5
                   },
                   {
                      "amount":125100,
                      "period":2018.75
                   },
                   {
                      "amount":125100,
                      "period":2019
                   },
                   {
                      "amount":125100,
                      "period":2019.25
                   },
                   {
                      "amount":125100,
                      "period":2019.5
                   },
                   {
                      "amount":125100,
                      "period":2019.75
                   },
                   {
                      "amount":125100,
                      "period":2020
                   },
                   {
                      "amount":125100,
                      "period":2020.25
                   },
                   {
                      "amount":125100,
                      "period":2020.5
                   },
                   {
                      "amount":125100,
                      "period":2020.75
                   }
                ],
                [
                   {
                      "amount":125100,
                      "period":2018
                   },
                   {
                      "amount":125100,
                      "period":2018.25
                   },
                   {
                      "amount":125100,
                      "period":2018.5
                   },
                   {
                      "amount":125100,
                      "period":2018.75
                   },
                   {
                      "amount":125100,
                      "period":2019
                   },
                   {
                      "amount":125100,
                      "period":2019.25
                   },
                   {
                      "amount":125100,
                      "period":2019.5
                   },
                   {
                      "amount":125100,
                      "period":2019.75
                   },
                   {
                      "amount":125100,
                      "period":2020
                   },
                   {
                      "amount":125100,
                      "period":2020.25
                   },
                   {
                      "amount":125100,
                      "period":2020.5
                   },
                   {
                      "amount":125100,
                      "period":2020.75
                   }
                ]
             ],
             "displaySelections":[
                {
                   "type":"Quarterly",
                   "year":2018
                },
                {
                   "type":"Annual",
                   "year":2019
                },
                {
                   "type":"Annual",
                   "year":2020
                }
             ],
             "revenueMilestones":[
                {
                   "id":1000,
                   "name":"Upfront Payment",
                   "amount":100000,
                   "dateEarned":2018
                }
             ]
          }
       ],
       "modelName":"Example Collaboration 606 Model",
       "startYear":2018,
       "activeVersionID":0
    }
    """


class TestModel:
    def test_model_1(self):
        model = ExportModel.from_json(ExportTestFixtures.model_1_json)
        assert model.model_name == "Example Collaboration 606 Model"
        assert model.start_year == 2018
        assert model.end_year == 2020
        assert len(model.program_names) == 2
        assert len(model.program_fte_rates) == 2
        assert model.program_names[0] == "Program A"
        assert model.program_fte_rates[1] == 250000
        assert model.num_quarters == 12
        assert model.quarter_index[2019] == 4
        assert len(model.versions) == 1
        assert model.versions[0].name == "Q1 2018 close"
        assert model.versions[0].period == 2018
        assert model.versions[0].display_selections[2018] == "Quarterly"
        assert model.versions[0].revenue_milestones[0]['name'] == "Upfront Payment"
        assert model.versions[0].external_spend[1][3] == 100
        assert model.versions[0].headcount_effort[0][0] == 2
        assert model.versions[0].forecast_expenses[1][11] == 125100


class TestSheet:
    @staticmethod
    def count_cells(sheet, row=None, col=None, format_name=None, formula=None):
        count = 0
        for cell in sheet.cells:
            if (row is None or cell.row == row) and \
                    (col is None or cell.col == col) and \
                    (format_name is None or cell.format == format_name) and \
                    (formula is None or cell.formula == formula):
                count = count + 1
        return count

    def test_label_from_quarter(self):
        assert ExportSheet.label_from_quarter(1990) == "Q1 1990"
        assert ExportSheet.label_from_quarter(1991.25) == "Q2 1991"
        assert ExportSheet.label_from_quarter(1992.5) == "Q3 1992"
        assert ExportSheet.label_from_quarter(1996.75) == "Q4 1996"

    def test_bump_row(self):
        sheet = ExportSheet(ExportModel.from_json(ExportTestFixtures.model_1_json), 0)
        assert sheet.current_col == 0
        sheet.current_col = 3
        sheet.current_row = 4
        sheet.bump_row(2)
        assert sheet.current_row == 6
        assert sheet.current_col == 0

    def test_bump_row_with_next_row(self):
        sheet = ExportSheet(ExportModel.from_json(ExportTestFixtures.model_1_json), 0)
        assert sheet.current_col == 0
        sheet.current_col = 3
        sheet.current_row = 4
        sheet.next_row = 5
        sheet.bump_row(2)
        assert sheet.current_row == 6
        assert sheet.current_col == 0

    def test_insert_row_basic(self):
        sheet = ExportSheet(ExportModel.from_json(ExportTestFixtures.model_1_json), 0)
        assert len(sheet.cells) == 0
        sheet.insert_row(["The Test"])
        assert TestSheet.count_cells(sheet, formula="The Test") == 1
        assert sheet.current_col == 1

    def test_insert_row_two_elements(self):
        sheet = ExportSheet(ExportModel.from_json(ExportTestFixtures.model_1_json), 0)
        assert len(sheet.cells) == 0
        sheet.insert_row(["The Test", "A Second Test"], "my_format")
        assert TestSheet.count_cells(sheet, col=0, format_name="my_format", formula="The Test") == 1
        assert TestSheet.count_cells(sheet, col=1, format_name="my_format", formula="A Second Test") == 1
        assert sheet.current_col == 2
        assert sheet.current_row == 0

    def test_insert_col_basic(self):
        sheet = ExportSheet(ExportModel.from_json(ExportTestFixtures.model_1_json), 0)
        assert len(sheet.cells) == 0
        sheet.insert_col(["The Test"])
        assert TestSheet.count_cells(sheet, formula="The Test") == 1
        assert sheet.current_col == 1

    def test_insert_col_two_elements(self):
        sheet = ExportSheet(ExportModel.from_json(ExportTestFixtures.model_1_json), 0)
        assert len(sheet.cells) == 0
        sheet.insert_col(["The Test", "A Second Test"], "my_format")
        assert TestSheet.count_cells(sheet, row=0, format_name="my_format", formula="The Test") == 1
        assert TestSheet.count_cells(sheet, row=1, format_name="my_format", formula="A Second Test") == 1
        assert sheet.current_col == 1
        assert sheet.current_row == 0
        sheet.bump_row()
        assert sheet.current_row == 2

    def test_quarter_heading(self):
        sheet = ExportSheet(ExportModel.from_json(ExportTestFixtures.model_1_json), 0)
        sheet.quarter_heading("My Heading")
        assert TestSheet.count_cells(sheet, row=0, format_name="bold", formula="My Heading") == 1
        assert TestSheet.count_cells(sheet, row=0, format_name="bold", formula="Total") == 1
        assert TestSheet.count_cells(sheet, row=0, format_name="bold", formula="Q1 2018") == 1
        assert TestSheet.count_cells(sheet, row=0, format_name="bold", formula="Q4 2020") == 1
        assert TestSheet.count_cells(sheet, row=0, format_name="bold", formula="Q4 2021") == 0
        assert TestSheet.count_cells(sheet, row=0, format_name="bold") == 14
        assert TestSheet.count_cells(sheet, row=1) == 0

    def test_insert_single_sum_row(self):
        sheet = ExportSheet(ExportModel.from_json(ExportTestFixtures.model_1_json), 0)
        sheet.insert_row([1, 2, 3])
        sheet.insert_single_sum("A1", "my_format")
        assert TestSheet.count_cells(sheet, formula="=SUM(A1:C1)") == 1

    def test_insert_single_sum_col(self):
        sheet = ExportSheet(ExportModel.from_json(ExportTestFixtures.model_1_json), 0)
        sheet.insert_row(["Heading"])
        sheet.bump_row()
        sheet.insert_col([1, 2, 3])
        sheet.bump_row()
        sheet.insert_single_sum("A2", "my_format")
        assert TestSheet.count_cells(sheet, formula="=SUM(A2:A4)") == 1

    def test_insert_sum_col(self):
        sheet = ExportSheet(ExportModel.from_json(ExportTestFixtures.model_1_json), 0)
        sheet.insert_row(["Col A", "Col B", "Col C", "Col D"])
        sheet.bump_row()
        sheet.insert_col([1, 2, 3])
        sheet.insert_col([4, 5, 6])
        sheet.insert_col([7, 8, 9])
        sheet.insert_col([10, 11, 12])
        sheet.insert_sum_col(3, 4, "my_format")
        sheet.bump_row()
        assert TestSheet.count_cells(sheet, col=4, formula="=SUM(A2:D2)") == 1
        assert TestSheet.count_cells(sheet, col=4, formula="=SUM(A3:D3)") == 1
        assert TestSheet.count_cells(sheet, col=4, formula="=SUM(A4:D4)") == 1
        assert TestSheet.count_cells(sheet, col=4) == 3

    def test_insert_sum_row(self):
        sheet = ExportSheet(ExportModel.from_json(ExportTestFixtures.model_1_json), 0)
        sheet.insert_row(["Label", "Col A", "Col B", "Col C", "Col D"])
        sheet.bump_row()
        sheet.insert_col(["Row A", "Row B", "Row C"])
        sheet.insert_col([1, 2, 3])
        sheet.insert_col([4, 5, 6])
        sheet.insert_col([7, 8, 9])
        sheet.insert_col([10, 11, 12])
        sheet.bump_row()
        assert sheet.current_col == 0
        sheet.insert_sum_row(3, 4, "my_format")
        assert TestSheet.count_cells(sheet, row=4, formula="=SUM(B2:B4)") == 1
        assert TestSheet.count_cells(sheet, row=4, formula="=SUM(C2:C4)") == 1
        assert TestSheet.count_cells(sheet, row=4, formula="=SUM(D2:D4)") == 1
        assert TestSheet.count_cells(sheet, row=4, formula="=SUM(E2:E4)") == 1
        assert TestSheet.count_cells(sheet, row=4) == 5

    def test_set_reference(self):
        sheet = ExportSheet(ExportModel.from_json(ExportTestFixtures.model_1_json), 0)
        sheet.current_row = 3
        sheet.current_col = 4
        sheet.set_reference("my_ref", fixed_row=True, fixed_col=False, offset_row=3, offset_col=4)
        assert sheet.references["[my_ref]"] == [6, 8, True, False]

    def test_shift_references(self):
        sheet = ExportSheet(ExportModel.from_json(ExportTestFixtures.model_1_json), 0)
        sheet.set_reference("my_ref", fixed_row=True, fixed_col=False, offset_row=3, offset_col=4)
        sheet.shift_reference("my_ref", 3, 4)
        assert sheet.references["[my_ref]"] == [6, 8, True, False]

    def test_translate_references(self):
        formula = "[a]+[b]"
        references = {
            "[a]": [0, 0, True, True],
            "[b]": [1, 0, False, False],
            "[c]": [6, 0, False, False],
        }
        translated = ExportSheet.translate_references(formula, references, 2, 3)
        assert translated == "=A1+D4"

    def test_fill_formula(self):
        sheet = ExportSheet(ExportModel.from_json(ExportTestFixtures.model_1_json), 0)
        sheet.set_reference("a", fixed_row=True, fixed_col=True)
        sheet.current_row = 10
        sheet.current_col = 5
        sheet.set_reference("b")
        sheet.current_row = 1
        sheet.current_col = 1
        sheet.fill_formula("[a]*[b]", 3, 5, "my_number")
        assert TestSheet.count_cells(sheet, row=1, col=1, formula="=A1*F11") == 1
        assert TestSheet.count_cells(sheet, row=2, col=2, formula="=A1*G12") == 1
        assert TestSheet.count_cells(sheet, row=3, col=5, formula="=A1*J13") == 1
        assert TestSheet.count_cells(sheet, format_name="my_number") == 15

    def test_fill_formula_overwrite(self):
        sheet = ExportSheet(ExportModel.from_json(ExportTestFixtures.model_1_json), 0)
        sheet.set_reference("a", fixed_row=True, fixed_col=True)
        sheet.current_row = 10
        sheet.current_col = 5
        sheet.set_reference("b")
        sheet.current_row = 1
        sheet.current_col = 1
        sheet.fill_formula("[a]*[b]", 3, 5, "my_number")
        sheet.current_row = 2
        sheet.current_col = 2
        sheet.fill_formula("[a]+[b]", 2, 2, "my_number", overwrite=True)
        assert TestSheet.count_cells(sheet, row=1, col=1, formula="=A1*F11") == 1
        assert TestSheet.count_cells(sheet, row=2, col=2, formula="=A1+F11") == 1
        assert TestSheet.count_cells(sheet, row=3, col=3, formula="=A1+G12") == 1
        assert TestSheet.count_cells(sheet, row=3, col=5, formula="=A1*J13") == 1
        assert TestSheet.count_cells(sheet, format_name="my_number") == 15

    def test_sheet_single_version(self):
        sheets = []
        model = ExportModel.from_json(ExportTestFixtures.model_1_json)
        version = model.versions[0]

        sheet = ExportSheet.from_version(model, version, sheets)
        assert TestSheet.count_cells(sheet, 0, 0, "bold", "Programs") == 1
        assert TestSheet.count_cells(sheet, 1, 0, formula=model.program_names[0]) == 1
        assert TestSheet.count_cells(sheet, 1, 1, formula=model.program_fte_rates[0]) == 1
        assert sheet.references['fte'][0] == 1
        assert sheet.references['fte'][1] == 1

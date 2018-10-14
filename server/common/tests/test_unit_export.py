from common.export import Cell, ExportModel


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


class TestModel:
    def test_model_1(self):
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
        model = ExportModel.from_json(model_1_json)
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

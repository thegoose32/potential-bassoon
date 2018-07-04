import * as model from './model.js'

test("displaySelections", () => {
  const displaySelections = [
    {
      year: 2020,
      type: "Annual"
    },
    {
      year: 2021,
      type: "Quarterly"
    },
    {
      year: 2022,
      type: "Annual"
    }
  ];

  const actual = model.displayArray(displaySelections);
  const expected = [
    {
      year: 2020,
      type: "Annual",
      amount: 0
    },
    {
      year: 2021,
      type: "Quarterly",
      quarter: 1,
      amount: 0
    },
    {
      year: 2021,
      type: "Quarterly",
      quarter: 2,
      amount: 0
    },
    {
      year: 2021,
      type: "Quarterly",
      quarter: 3,
      amount: 0
    },
    {
      year: 2021,
      type: "Quarterly",
      quarter: 4,
      amount: 0
    },
    {
      year: 2022,
      type: "Annual",
      amount: 0
    }
  ]
  expect(actual).toEqual(expected);
});

test("dataToDisplay function", () => {
  const displayType = [
    {
      year: 2020,
      type: "Annual",
      amount: 0
    },
    {
      year: 2021,
      type: "Quarterly",
      quarter: 1,
      amount: 0
    },
    {
      year: 2021,
      type: "Quarterly",
      quarter: 2,
      amount: 0
    },
    {
      year: 2021,
      type: "Quarterly",
      quarter: 3,
      amount: 0
    },
    {
      year: 2021,
      type: "Quarterly",
      quarter: 4,
      amount: 0
    },
    {
      year: 2022,
      type: "Annual",
      amount: 0
    }
  ]
  const dataArray = [
    {
      year: 2020,
      quarter: 1,
      amount: 200
    },
    {
      year: 2020,
      quarter: 2,
      amount: 200
    },
    {
      year: 2020,
      quarter: 3,
      amount: 200
    },
    {
      year: 2020,
      quarter: 4,
      amount: 200
    },
    {
      year: 2021,
      quarter: 1,
      amount: 400
    },
    {
      year: 2021,
      quarter: 2,
      amount: 400
    },
    {
      year: 2021,
      quarter: 3,
      amount: 400
    },
    {
      year: 2021,
      quarter: 4,
      amount: 400
    },
    {
      year: 2022,
      quarter: 1,
      amount: 100
    },
    {
      year: 2022,
      quarter: 2,
      amount: 100
    },
    {
      year: 2022,
      quarter: 3,
      amount: 100
    },
    {
      year: 2022,
      quarter: 4,
      amount: 100
    }
  ];
  const actual = model.dataToDisplay(displayType, dataArray);
  const expected = [
    {
      year: 2020,
      type: "Annual",
      amount: 800
    },
    {
      year: 2021,
      type: "Quarterly",
      quarter: 1,
      amount: 400
    },
    {
      year: 2021,
      type: "Quarterly",
      quarter: 2,
      amount: 400
    },
    {
      year: 2021,
      type: "Quarterly",
      quarter: 3,
      amount: 400
    },
    {
      year: 2021,
      type: "Quarterly",
      quarter: 4,
      amount: 400
    },
    {
      year: 2022,
      type: "Annual",
      amount: 400
    }
  ]
 
  expect(actual).toEqual(expected);
});

test("test periodLabels", () => {
  const startYear = 2020;
  const yearsOut = 3;
  const actual = model.periodLabels(startYear, yearsOut);
  const expected = ["Q1 2020", "Q2 2020", "Q3 2020", "Q4 2020","Q1 2021", "Q2 2021", "Q3 2021", "Q4 2021", "Q1 2022", "Q2 2022", "Q3 2022", "Q4 2022"];
  expect(actual).toEqual(expected);
});

test("test yearsArray", () => {
  const startYear = 2020;
  const yearsOut = 5;
  const actual = model.yearsArray(startYear, yearsOut);
  const expected = [2020, 2021, 2022, 2023, 2024];
});

test("test addDataArray", () => {
  const startYear = 2020;
  const yearsOut = 3;
  const actual = model.addDataArray(startYear, yearsOut)
  const expected = [ 
    {
      year: 2020,
      quarter: 1,
      amount: 0
    },
    {
      year: 2020,
      quarter: 2,
      amount: 0
    },
    {
      year: 2020,
      quarter: 3,
      amount: 0
    },
    {
      year: 2020,
      quarter: 4,
      amount: 0
    },
    {
      year: 2021,
      quarter: 1,
      amount: 0
    },
    {
      year: 2021,
      quarter: 2,
      amount: 0
    },
    {
      year: 2021,
      quarter: 3,
      amount: 0
    },
    {
      year: 2021,
      quarter: 4,
      amount: 0
    },
    {
      year: 2022,
      quarter: 1,
      amount: 0
    },
    {
      year: 2022,
      quarter: 2,
      amount: 0
    },
    {
      year: 2022,
      quarter: 3,
      amount: 0
    },
    {
      year: 2022,
      quarter: 4,
      amount: 0
    }
  ]
});

test("add year to editDataArrayLength", () => {
  const array = [ 
    {
      year: 2020,
      quarter: 1,
      amount: 200
    },
    {
      year: 2020,
      quarter: 2,
      amount: 200
    },
    {
      year: 2020,
      quarter: 3,
      amount: 200
    },
    {
      year: 2020,
      quarter: 4,
      amount: 200
    },
    {
      year: 2021,
      quarter: 1,
      amount: 400
    },
    {
      year: 2021,
      quarter: 2,
      amount: 400
    },
    {
      year: 2021,
      quarter: 3,
      amount: 400
    },
    {
      year: 2021,
      quarter: 4,
      amount: 400
    },
    {
      year: 2022,
      quarter: 1,
      amount: 100
    },
    {
      year: 2022,
      quarter: 2,
      amount: 100
    },
    {
      year: 2022,
      quarter: 3,
      amount: 100
    },
    {
      year: 2022,
      quarter: 4,
      amount: 100
    }
  ];
  const startYear = 2020;
  const yearsOut = 4;
  const actual = model.editDataArrayLength(array, startYear, yearsOut)
  const expected =  [
    {
      year: 2020,
      quarter: 1,
      amount: 200
    },
    {
      year: 2020,
      quarter: 2,
      amount: 200
    },
    {
      year: 2020,
      quarter: 3,
      amount: 200
    },
    {
      year: 2020,
      quarter: 4,
      amount: 200
    },
    {
      year: 2021,
      quarter: 1,
      amount: 400
    },
    {
      year: 2021,
      quarter: 2,
      amount: 400
    },
    {
      year: 2021,
      quarter: 3,
      amount: 400
    },
    {
      year: 2021,
      quarter: 4,
      amount: 400
    },
    {
      year: 2022,
      quarter: 1,
      amount: 100
    },
    {
      year: 2022,
      quarter: 2,
      amount: 100
    },
    {
      year: 2022,
      quarter: 3,
      amount: 100
    },
    {
      year: 2022,
      quarter: 4,
      amount: 100
    },
    {
      year: 2022,
      quarter: 1,
      amount: 0
    },
    {
      year: 2022,
      quarter: 2,
      amount: 0
    },
    {
      year: 2022,
      quarter: 3,
      amount: 0
    },
    {
      year: 2022,
      quarter: 4,
      amount: 0
    }
  ];
});

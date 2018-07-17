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

test("periodLabels - test", () => {
  const startYear = 2020;
  const yearsOut = 3;
  const actual = model.periodLabels(startYear, yearsOut);
  const expected = ["Q1 2020", "Q2 2020", "Q3 2020", "Q4 2020","Q1 2021", "Q2 2021", "Q3 2021", "Q4 2021", "Q1 2022", "Q2 2022", "Q3 2022", "Q4 2022"];
  expect(actual).toEqual(expected);
});

test("yearsArray - test", () => {
  const startYear = 2020;
  const yearsOut = 5;
  const actual = model.yearsArray(startYear, yearsOut);
  const expected = [2020, 2021, 2022, 2023, 2024];
  expect(actual).toEqual(expected);
});

test("addDataArray - test", () => {
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
  expect(actual).toEqual(expected);
});

test("editDataArrayLength - add year", () => {
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
      year: 0,
      quarter: 1,
      amount: 0
    },
    {
      year: 0,
      quarter: 2,
      amount: 0
    },
    {
      year: 0,
      quarter: 3,
      amount: 0
    },
    {
      year: 0,
      quarter: 4,
      amount: 0
    }
  ];
  expect(actual).toEqual(expected);
});

test("remove year to editDataArrayLength", () => {
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
  const yearsOut = 2;
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
  expect(actual).toEqual(expected);
});

test("no change to editDataArrayLength", () => {
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
  const yearsOut = 3;
  const actual = model.editDataArrayLength(array, startYear, yearsOut)
  const expected = [ 
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
  expect(actual).toEqual(expected);
});

test("arrayTotal test", () => {
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
  const actual = model.arrayTotal(array)
  const expected = 2800;
  expect(actual).toEqual(expected);
})

test("calculatePeriodTotal test", () => {
  const arrayOfArrays = [
    [ 
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
    ],
    [
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
    ]
  ]
  const actual = model.calculatePeriodTotal(arrayOfArrays)
  const expected = [
    {
      year: 2020,
      quarter: 1,
      amount: 400
    },
    {
      year: 2020,
      quarter: 2,
      amount: 400
    },
    {
      year: 2020,
      quarter: 3,
      amount: 400
    },
    {
      year: 2020,
      quarter: 4,
      amount: 400
    },
    {
      year: 2021,
      quarter: 1,
      amount: 800
    },
    {
      year: 2021,
      quarter: 2,
      amount: 800
    },
    {
      year: 2021,
      quarter: 3,
      amount: 800
    },
    {
      year: 2021,
      quarter: 4,
      amount: 800
    },
    {
      year: 2022,
      quarter: 1,
      amount: 200
    },
    {
      year: 2022,
      quarter: 2,
      amount: 200
    },
    {
      year: 2022,
      quarter: 3,
      amount: 200
    },
    {
      year: 2022,
      quarter: 4,
      amount: 200
    }
  ]
  expect(actual).toEqual(expected);
})


test("percentCompleteArray test", () => {
  const array = [
    {
      year: 2020,
      quarter: 1,
      amount: 400
    },
    {
      year: 2020,
      quarter: 2,
      amount: 400
    },
    {
      year: 2020,
      quarter: 3,
      amount: 400
    },
    {
      year: 2020,
      quarter: 4,
      amount: 400
    },
    {
      year: 2021,
      quarter: 1,
      amount: 800
    },
    {
      year: 2021,
      quarter: 2,
      amount: 800
    },
    {
      year: 2021,
      quarter: 3,
      amount: 800
    },
    {
      year: 2021,
      quarter: 4,
      amount: 800
    },
    {
      year: 2022,
      quarter: 1,
      amount: 200
    },
    {
      year: 2022,
      quarter: 2,
      amount: 200
    },
    {
      year: 2022,
      quarter: 3,
      amount: 200
    },
    {
      year: 2022,
      quarter: 4,
      amount: 200
    }
  ]
  const actual = model.percentCompleteArray(array);
  const expected = [
    {
      year: 2020,
      quarter: 1,
      amount: 0.071428571428571424
    },
    {
      year: 2020,
      quarter: 2,
      amount: 0.071428571428571424
    },
    {
      year: 2020,
      quarter: 3,
      amount: 0.071428571428571424
    },
    {
      year: 2020,
      quarter: 4,
      amount: 0.071428571428571424
    },
    {
      year: 2021,
      quarter: 1,
      amount: 0.14285714285714285
    },
    {
      year: 2021,
      quarter: 2,
      amount: 0.14285714285714285
    },
    {
      year: 2021,
      quarter: 3,
      amount: 0.14285714285714285
    },
    {
      year: 2021,
      quarter: 4,
      amount: 0.14285714285714285
    },
    {
      year: 2022,
      quarter: 1,
      amount: 0.0357142857142857143
    },
    {
      year: 2022,
      quarter: 2,
      amount: 0.0357142857142857143
    },
    {
      year: 2022,
      quarter: 3,
      amount: 0.0357142857142857143
    },
    {
      year: 2022,
      quarter: 4,
      amount: 0.0357142857142857143
    }
  ]
  expect(actual).toEqual(expected);
})

test("dollarCompleteCummArray test", () => {
  const array = [
    {
      year: 2020,
      quarter: 1,
      amount: 400
    },
    {
      year: 2020,
      quarter: 2,
      amount: 400
    },
    {
      year: 2020,
      quarter: 3,
      amount: 400
    },
    {
      year: 2020,
      quarter: 4,
      amount: 400
    },
    {
      year: 2021,
      quarter: 1,
      amount: 800
    },
    {
      year: 2021,
      quarter: 2,
      amount: 800
    },
    {
      year: 2021,
      quarter: 3,
      amount: 800
    },
    {
      year: 2021,
      quarter: 4,
      amount: 800
    },
    {
      year: 2022,
      quarter: 1,
      amount: 800
    },
    {
      year: 2022,
      quarter: 2,
      amount: 1600
    },
    {
      year: 2022,
      quarter: 3,
      amount: 0
    },
    {
      year: 2022,
      quarter: 4,
      amount: 800
    }
  ]
  const grandTotalSpend = 8000;
  const actual = model.dollarCompleteCummArray(array, grandTotalSpend);
  const expected = [
    {
      year: 2020,
      quarter: 1,
      amount: 400
    },
    {
      year: 2020,
      quarter: 2,
      amount: 800
    },
    {
      year: 2020,
      quarter: 3,
      amount: 1200
    },
    {
      year: 2020,
      quarter: 4,
      amount: 1600
    },
    {
      year: 2021,
      quarter: 1,
      amount: 2400
    },
    {
      year: 2021,
      quarter: 2,
      amount: 3200
    },
    {
      year: 2021,
      quarter: 3,
      amount: 4000
    },
    {
      year: 2021,
      quarter: 4,
      amount: 4800
    },
    {
      year: 2022,
      quarter: 1,
      amount: 5600
    },
    {
      year: 2022,
      quarter: 2,
      amount: 7200
    },
    {
      year: 2022,
      quarter: 3,
      amount: 7200
    },
    {
      year: 2022,
      quarter: 4,
      amount: 8000
    }
  ]
  expect(actual).toEqual(expected);
})

test("percentCompleteCummArray test", () => {
  const array = [
    {
      year: 2020,
      quarter: 1,
      amount: 400
    },
    {
      year: 2020,
      quarter: 2,
      amount: 800
    },
    {
      year: 2020,
      quarter: 3,
      amount: 1200
    },
    {
      year: 2020,
      quarter: 4,
      amount: 1600
    },
    {
      year: 2021,
      quarter: 1,
      amount: 2400
    },
    {
      year: 2021,
      quarter: 2,
      amount: 3200
    },
    {
      year: 2021,
      quarter: 3,
      amount: 4000
    },
    {
      year: 2021,
      quarter: 4,
      amount: 4800
    },
    {
      year: 2022,
      quarter: 1,
      amount: 5600
    },
    {
      year: 2022,
      quarter: 2,
      amount: 7200
    },
    {
      year: 2022,
      quarter: 3,
      amount: 7200
    },
    {
      year: 2022,
      quarter: 4,
      amount: 8000
    }
  ]
  const grandTotalSpend = 8000;
  const actual = model.percentCompleteCummArray(array, grandTotalSpend);
  const expected = [
    {
      year: 2020,
      quarter: 1,
      amount: 0.05
    },
    {
      year: 2020,
      quarter: 2,
      amount: 0.1
    },
    {
      year: 2020,
      quarter: 3,
      amount: 0.15
    },
    {
      year: 2020,
      quarter: 4,
      amount: 0.2
    },
    {
      year: 2021,
      quarter: 1,
      amount: 0.3
    },
    {
      year: 2021,
      quarter: 2,
      amount: 0.4
    },
    {
      year: 2021,
      quarter: 3,
      amount: 0.5
    },
    {
      year: 2021,
      quarter: 4,
      amount: 0.6
    },
    {
      year: 2022,
      quarter: 1,
      amount: 0.7
    },
    {
      year: 2022,
      quarter: 2,
      amount: 0.9
    },
    {
      year: 2022,
      quarter: 3,
      amount: 0.9
    },
    {
      year: 2022,
      quarter: 4,
      amount: 1
    }
  ]
  expect(actual).toEqual(expected);
})

test("calculateRevenue - milestone at start", () => {
  const startYear = 2020;
  const yearsOut = 3;
  const milestone = {
    id: 1000,
    name: "Upfront Payment",
    dateEarned: "Q1 2020",
    datePaid: "Q1 2018",
    amount: 100000
  }
  const percentComplete = [
    {
      year: 2020,
      quarter: 1,
      amount: 0.05
    },
    {
      year: 2020,
      quarter: 2,
      amount: 0.05
    },
    {
      year: 2020,
      quarter: 3,
      amount: 0.05
    },
    {
      year: 2020,
      quarter: 4,
      amount: 0.05
    },
    {
      year: 2021,
      quarter: 1,
      amount: 0.1
    },
    {
      year: 2021,
      quarter: 2,
      amount: 0.1
    },
    {
      year: 2021,
      quarter: 3,
      amount: 0.1
    },
    {
      year: 2021,
      quarter: 4,
      amount: 0.1
    },
    {
      year: 2022,
      quarter: 1,
      amount: 0.1
    },
    {
      year: 2022,
      quarter: 2,
      amount: 0.2
    },
    {
      year: 2022,
      quarter: 3,
      amount: 0.0
    },
    {
      year: 2022,
      quarter: 4,
      amount: 0.1
    }
  ]
  const percentCompleteCumm = [
    {
      year: 2020,
      quarter: 1,
      amount: 0.05
    },
    {
      year: 2020,
      quarter: 2,
      amount: 0.1
    },
    {
      year: 2020,
      quarter: 3,
      amount: 0.15
    },
    {
      year: 2020,
      quarter: 4,
      amount: 0.2
    },
    {
      year: 2021,
      quarter: 1,
      amount: 0.3
    },
    {
      year: 2021,
      quarter: 2,
      amount: 0.4
    },
    {
      year: 2021,
      quarter: 3,
      amount: 0.5
    },
    {
      year: 2021,
      quarter: 4,
      amount: 0.6
    },
    {
      year: 2022,
      quarter: 1,
      amount: 0.7
    },
    {
      year: 2022,
      quarter: 2,
      amount: 0.9
    },
    {
      year: 2022,
      quarter: 3,
      amount: 0.9
    },
    {
      year: 2022,
      quarter: 4,
      amount: 1
    }
  ]
  const actual = model.calculateRevenue(startYear, yearsOut, milestone, percentComplete, percentCompleteCumm);
  const expected = [
    {
      year: 2020,
      quarter: 1,
      amount: 5000
    },
    {
      year: 2020,
      quarter: 2,
      amount: 5000
    },
    {
      year: 2020,
      quarter: 3,
      amount: 5000
    },
    {
      year: 2020,
      quarter: 4,
      amount: 5000
    },
    {
      year: 2021,
      quarter: 1,
      amount: 10000
    },
    {
      year: 2021,
      quarter: 2,
      amount: 10000
    },
    {
      year: 2021,
      quarter: 3,
      amount: 10000
    },
    {
      year: 2021,
      quarter: 4,
      amount: 10000
    },
    {
      year: 2022,
      quarter: 1,
      amount: 10000
    },
    {
      year: 2022,
      quarter: 2,
      amount: 20000
    },
    {
      year: 2022,
      quarter: 3,
      amount: 0
    },
    {
      year: 2022,
      quarter: 4,
      amount: 10000
    }
  ]
  expect(actual).toEqual(expected);
})

test("calculateRevenue - milestone at mid point", () => {
  const startYear = 2020;
  const yearsOut = 3;
  const milestone = {
    id: 1000,
    name: "Upfront Payment",
    dateEarned: "Q1 2022",
    datePaid: "Q1 2018",
    amount: 100000
  }
  const percentComplete = [
    {
      year: 2020,
      quarter: 1,
      amount: 0.05
    },
    {
      year: 2020,
      quarter: 2,
      amount: 0.05
    },
    {
      year: 2020,
      quarter: 3,
      amount: 0.05
    },
    {
      year: 2020,
      quarter: 4,
      amount: 0.05
    },
    {
      year: 2021,
      quarter: 1,
      amount: 0.1
    },
    {
      year: 2021,
      quarter: 2,
      amount: 0.1
    },
    {
      year: 2021,
      quarter: 3,
      amount: 0.1
    },
    {
      year: 2021,
      quarter: 4,
      amount: 0.1
    },
    {
      year: 2022,
      quarter: 1,
      amount: 0.1
    },
    {
      year: 2022,
      quarter: 2,
      amount: 0.2
    },
    {
      year: 2022,
      quarter: 3,
      amount: 0.0
    },
    {
      year: 2022,
      quarter: 4,
      amount: 0.1
    }
  ]
  const percentCompleteCumm = [
    {
      year: 2020,
      quarter: 1,
      amount: 0.05
    },
    {
      year: 2020,
      quarter: 2,
      amount: 0.1
    },
    {
      year: 2020,
      quarter: 3,
      amount: 0.15
    },
    {
      year: 2020,
      quarter: 4,
      amount: 0.2
    },
    {
      year: 2021,
      quarter: 1,
      amount: 0.3
    },
    {
      year: 2021,
      quarter: 2,
      amount: 0.4
    },
    {
      year: 2021,
      quarter: 3,
      amount: 0.5
    },
    {
      year: 2021,
      quarter: 4,
      amount: 0.6
    },
    {
      year: 2022,
      quarter: 1,
      amount: 0.7
    },
    {
      year: 2022,
      quarter: 2,
      amount: 0.9
    },
    {
      year: 2022,
      quarter: 3,
      amount: 0.9
    },
    {
      year: 2022,
      quarter: 4,
      amount: 1
    }
  ]
  const actual = model.calculateRevenue(startYear, yearsOut, milestone, percentComplete, percentCompleteCumm);
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
      amount: 70000
    },
    {
      year: 2022,
      quarter: 2,
      amount: 20000
    },
    {
      year: 2022,
      quarter: 3,
      amount: 0
    },
    {
      year: 2022,
      quarter: 4,
      amount: 10000
    }
  ]
  expect(actual).toEqual(expected);
})

test("periodAmountCalc - QTD", () => {
  const array = [
    {
      year: 2020,
      quarter: 1,
      amount: 5000
    },
    {
      year: 2020,
      quarter: 2,
      amount: 5000
    },
    {
      year: 2020,
      quarter: 3,
      amount: 5000
    },
    {
      year: 2020,
      quarter: 4,
      amount: 5000
    },
    {
      year: 2021,
      quarter: 1,
      amount: 10000
    },
    {
      year: 2021,
      quarter: 2,
      amount: 10000
    },
    {
      year: 2021,
      quarter: 3,
      amount: 10000
    },
    {
      year: 2021,
      quarter: 4,
      amount: 10000
    },
    {
      year: 2022,
      quarter: 1,
      amount: 10000
    },
    {
      year: 2022,
      quarter: 2,
      amount: 20000
    },
    {
      year: 2022,
      quarter: 3,
      amount: 0
    },
    {
      year: 2022,
      quarter: 4,
      amount: 10000
    }
  ]
  const currentQtr = 3;
  const currentYear = 2022;
  const periodType = "QTD"
  const actual = model.periodAmountCalc(array, currentQtr, currentYear, periodType);
  const expected = 0;
  expect(actual).toEqual(expected);
})

test("periodAmountCalc - YTD", () => {
  const array = [
    {
      year: 2020,
      quarter: 1,
      amount: 5000
    },
    {
      year: 2020,
      quarter: 2,
      amount: 5000
    },
    {
      year: 2020,
      quarter: 3,
      amount: 5000
    },
    {
      year: 2020,
      quarter: 4,
      amount: 5000
    },
    {
      year: 2021,
      quarter: 1,
      amount: 10000
    },
    {
      year: 2021,
      quarter: 2,
      amount: 10000
    },
    {
      year: 2021,
      quarter: 3,
      amount: 10000
    },
    {
      year: 2021,
      quarter: 4,
      amount: 10000
    },
    {
      year: 2022,
      quarter: 1,
      amount: 10000
    },
    {
      year: 2022,
      quarter: 2,
      amount: 20000
    },
    {
      year: 2022,
      quarter: 3,
      amount: 0
    },
    {
      year: 2022,
      quarter: 4,
      amount: 10000
    }
  ]
  const currentQtr = 3;
  const currentYear = 2022;
  const periodType = "YTD"
  const actual = model.periodAmountCalc(array, currentQtr, currentYear, periodType);
  const expected = 30000;
  expect(actual).toEqual(expected);
})

test("periodAmountCalc - Full Year", () => {
  const array = [
    {
      year: 2020,
      quarter: 1,
      amount: 5000
    },
    {
      year: 2020,
      quarter: 2,
      amount: 5000
    },
    {
      year: 2020,
      quarter: 3,
      amount: 5000
    },
    {
      year: 2020,
      quarter: 4,
      amount: 5000
    },
    {
      year: 2021,
      quarter: 1,
      amount: 10000
    },
    {
      year: 2021,
      quarter: 2,
      amount: 10000
    },
    {
      year: 2021,
      quarter: 3,
      amount: 10000
    },
    {
      year: 2021,
      quarter: 4,
      amount: 10000
    },
    {
      year: 2022,
      quarter: 1,
      amount: 10000
    },
    {
      year: 2022,
      quarter: 2,
      amount: 20000
    },
    {
      year: 2022,
      quarter: 3,
      amount: 0
    },
    {
      year: 2022,
      quarter: 4,
      amount: 10000
    }
  ]
  const currentQtr = 3;
  const currentYear = 2022;
  const periodType = "Full Year"
  const actual = model.periodAmountCalc(array, currentQtr, currentYear, periodType);
  const expected = 40000;
  expect(actual).toEqual(expected);
})

test("calculateTotalSpendArray test",() => {
  const externalSpend = [ 
    [ 
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
    ],
    [
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
    ]
  ];
  const headcountSpend = [ 
    [ 
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
    ],
    [
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
    ]
  ]
  const actual = model.calculateTotalSpendArrays(externalSpend, headcountSpend);
  const expected = [
    [
      {
        year: 2020,
        quarter: 1,
        amount: 400
      },
      {
        year: 2020,
        quarter: 2,
        amount: 400
      },
      {
        year: 2020,
        quarter: 3,
        amount: 400
      },
      {
        year: 2020,
        quarter: 4,
        amount: 400
      },
      {
        year: 2021,
        quarter: 1,
        amount: 800
      },
      {
        year: 2021,
        quarter: 2,
        amount: 800
      },
      {
        year: 2021,
        quarter: 3,
        amount: 800
      },
      {
        year: 2021,
        quarter: 4,
        amount: 800
      },
      {
        year: 2022,
        quarter: 1,
        amount: 200
      },
      {
        year: 2022,
        quarter: 2,
        amount: 200
      },
      {
        year: 2022,
        quarter: 3,
        amount: 200
      },
      {
        year: 2022,
        quarter: 4,
        amount: 200
      }
    ],
    [
      {
        year: 2020,
        quarter: 1,
        amount: 400
      },
      {
        year: 2020,
        quarter: 2,
        amount: 400
      },
      {
        year: 2020,
        quarter: 3,
        amount: 400
      },
      {
        year: 2020,
        quarter: 4,
        amount: 400
      },
      {
        year: 2021,
        quarter: 1,
        amount: 800
      },
      {
        year: 2021,
        quarter: 2,
        amount: 800
      },
      {
        year: 2021,
        quarter: 3,
        amount: 800
      },
      {
        year: 2021,
        quarter: 4,
        amount: 800
      },
      {
        year: 2022,
        quarter: 1,
        amount: 200
      },
      {
        year: 2022,
        quarter: 2,
        amount: 200
      },
      {
        year: 2022,
        quarter: 3,
        amount: 200
      },
      {
        year: 2022,
        quarter: 4,
        amount: 200
      }
    ]
  ];
  expect(actual).toEqual(expected);
})

test("calculateModelRevenue - single milestone", () => {
  const simpleModel = fixtureSimpleModel();
  const startYear = simpleModel.startYear;
  const yearsOut = simpleModel.endYear - startYear + 1;
  const scenarios = simpleModel.scenarios;
  const milestone = scenarios[1].revenueMilestones[0];
  const programs = simpleModel.programs;
  const activeScenarioId = simpleModel.activeScenarioId;
  const actual = model.calculateModelRevenue(startYear, yearsOut, milestone, scenarios,programs, activeScenarioId); 
  const expected = [
    {
      year: 2018,
      quarter: 1,
      amount: 250
    },
    {
      year: 2018,
      quarter: 2,
      amount: 350
    },
    {
      year: 2018,
      quarter: 3,
      amount: 200
    },
    {
      year: 2018,
      quarter: 4,
      amount: 200
    }
  ]
  expect(actual).toEqual(expected);
})

test("calculateModelRevenue - single milestone period 3", () => {
  const simpleModel = {
    version: 0,
    modelName: "Example Collaboration 606 Model",
    startYear: 2018,
    endYear: 2018,
    activeScenarioId: 2,
    programs: [
      {
        name: "Program A", 
        id: 1001,
        fteRate: 250000
      }
    ],
    activityLog: [],
    scenarios: [
      {
        scenarioName: "Q1 2018 close",
        scenarioDate: "Q1 2018",
        scenarioID: 1,
        priorScenarioID: 0,
        displaySelections: [
          {
            year: 2018,
            type: "Annual"
          } 
        ],
        revenueMilestones: [
          {
            id: 1000,
            name: "Upfront Payment",
            dateEarned: "Q3 2018",
            datePaid: "Q3 2018",
            amount: 1000
          }
        ],
        externalSpend: [
          [
            {
              year: 2018,
              quarter: 1,
              amount: 100
            },
            {
              year: 2018,
              quarter: 2,
              amount: 100
            },
            {
              year: 2018,
              quarter: 3,
              amount: 100
            },
            {
              year: 2018,
              quarter: 4,
              amount: 100
            }
          ]
        ],
       headcountEffort: [
          [
            {
              year: 2018,
              quarter: 1,
              amount: 0
            },
            {
              year: 2018,
              quarter: 2,
              amount: 0
            },
            {
              year: 2018,
              quarter: 3,
              amount: 0
            },
            {
              year: 2018,
              quarter: 4,
              amount: 0
            }
          ]
        ]
      },
      {
        scenarioName: "Q2 2018 close",
        scenarioDate: "Q2 2018",
        scenarioID: 2,
        priorScenarioID: 1,
        displaySelections: [
          {
            year: 2018,
            type: "Annual"
          } 
        ],
        revenueMilestones: [
          {
            id: 1000,
            name: "Upfront Payment",
            dateEarned: "Q3 2018",
            datePaid: "Q3 2018",
            amount: 1000
          }
        ],
        externalSpend: [
          [
            {
              year: 2018,
              quarter: 1,
              amount: 100
            },
            {
              year: 2018,
              quarter: 2,
              amount: 50
            },
            {
              year: 2018,
              quarter: 3,
              amount: 50
            },
            {
              year: 2018,
              quarter: 4,
              amount: 50
            }
          ]
        ],
       headcountEffort: [
          [
            {
              year: 2018,
              quarter: 1,
              amount: 0
            },
            {
              year: 2018,
              quarter: 2,
              amount: 0
            },
            {
              year: 2018,
              quarter: 3,
              amount: 0
            },
            {
              year: 2018,
              quarter: 4,
              amount: 0
            }
          ]
        ]
      },
      {
        scenarioName: "Q3 2018 close",
        scenarioDate: "Q3 2018",
        scenarioID: 3,
        priorScenarioID: 2,
        displaySelections: [
          {
            year: 2018,
            type: "Annual"
          } 
        ],
        revenueMilestones: [
          {
            id: 1000,
            name: "Upfront Payment",
            dateEarned: "Q3 2018",
            datePaid: "Q3 2018",
            amount: 1000
          }
        ],
        externalSpend: [
          [
            {
              year: 2018,
              quarter: 1,
              amount: 100
            },
            {
              year: 2018,
              quarter: 2,
              amount: 50
            },
            {
              year: 2018,
              quarter: 3,
              amount: 25
            },
            {
              year: 2018,
              quarter: 4,
              amount: 25
            }
          ]
        ],
       headcountEffort: [
          [
            {
              year: 2018,
              quarter: 1,
              amount: 0
            },
            {
              year: 2018,
              quarter: 2,
              amount: 0
            },
            {
              year: 2018,
              quarter: 3,
              amount: 0
            },
            {
              year: 2018,
              quarter: 4,
              amount: 0
            }
          ]
        ]
      }
    ]  
  }

  const startYear = simpleModel.startYear;
  const yearsOut = simpleModel.endYear - startYear + 1;
  const scenarios = simpleModel.scenarios;
  const programs = simpleModel.programs;
  const activeScenarioId = simpleModel.activeScenarioId;
  const milestone = simpleModel.scenarios[activeScenarioId].revenueMilestones[0];
  const actual = model.calculateModelRevenue(startYear, yearsOut, milestone, scenarios,programs, activeScenarioId);
  const expected = [
    {
      year: 2018,
      quarter: 1,
      amount: 0
    },
    {
      year: 2018,
      quarter: 2,
      amount: 0
    },
    {
      year: 2018,
      quarter: 3,
      amount: 875
    },
    {
      year: 2018,
      quarter: 4,
      amount: 125
    }
  ]
  expect(actual).toEqual(expected);
})


test("calculatePriorVersionIndex - index = 0", () => {
  const simpleModel = fixtureSimpleModel();
  const scenarios = simpleModel.scenarios;
  const priorScenarioID = scenarios[0].priorScenarioID;
  const actual = model.calculatePriorVersionIndex(scenarios, priorScenarioID);
  const expected = "Initial Model";
  expect(actual).toEqual(expected);
})

test("calculatePriorVersionIndex - index = 1", () => {
  const simpleModel = fixtureSimpleModel();
  const scenarios = simpleModel.scenarios;
  const priorScenarioID = scenarios[1].priorScenarioID;
  const actual = model.calculatePriorVersionIndex(scenarios, priorScenarioID);
  const expected = 0;
  expect(actual).toEqual(expected);
})

test("percentCompleteCummArrayFromData - simpleModel", () => {
  const simpleModel = fixtureSimpleModel();
  const scenario = simpleModel.scenarios[0];
  const externalSpend = scenario.externalSpend;
  const headcountEffort = scenario.headcountEffort;
  const programs = simpleModel.programs;
  const actual = model.percentCompleteCummArrayFromData(headcountEffort, externalSpend, programs);
  const expected = [
    {
      year: 2018,
      quarter: 1,
      amount: 0.25
    },
    {
      year: 2018,
      quarter: 2,
      amount: 0.5
    },
    {
      year: 2018,
      quarter: 3,
      amount: 0.75
    },
    {
      year: 2018,
      quarter: 4,
      amount: 1
    },
  ];
  expect(actual).toEqual(expected);
})

test("calculateCurrentPeriodRev - milestone period 3", () => {
  const startYear = 2018;
  const yearsOut = 1;
  const milestone = {
      id: 1000,
      name: "Upfront Payment",
      dateEarned: "Q3 2018",
      datePaid: "Q3 2018",
      amount: 1000
    }
  const percentCompleteCumm = [
    {
      year: 2018,
      quarter: 1,
      amount: 0.25
    },
    {
      year: 2018,
      quarter: 2,
      amount: 0.5
    },
    {
      year: 2018,
      quarter: 3,
      amount: 0.75
    },
    {
      year: 2018,
      quarter: 4,
      amount: 1
    },
  ];
  const actual = model.calculateCurrentPeriodRev(startYear, yearsOut, milestone, percentCompleteCumm);
  const expected = [ 
    {
      year: 2018,
      quarter: 1,
      amount: 0
    },
    {
      year: 2018,
      quarter: 2,
      amount: 0
    },
    {
      year: 2018,
      quarter: 3,
      amount: 750
    },
    {
      year: 2018,
      quarter: 4,
      amount: 250
    },
  ];
  expect(actual).toEqual(expected);
})

function fixtureSimpleModel () {
  const simpleModelFixture = {
    version: 0,
    modelName: "Example Collaboration 606 Model",
    startYear: 2018,
    endYear: 2018,
    activeScenarioId: 1,
    programs: [
      {
        name: "Program A", 
        id: 1001,
        fteRate: 250000
      }
    ],
    activityLog: [],
    scenarios: [
      {
        scenarioName: "Q1 2018 close",
        scenarioDate: "Q1 2018",
        scenarioID: 1,
        priorScenarioID: 0,
        displaySelections: [
          {
            year: 2018,
            type: "Annual"
          } 
        ],
        revenueMilestones: [
          {
            id: 1000,
            name: "Upfront Payment",
            dateEarned: "Q1 2018",
            datePaid: "Q1 2018",
            amount: 1000
          }
        ],
        externalSpend: [
          [
            {
              year: 2018,
              quarter: 1,
              amount: 100
            },
            {
              year: 2018,
              quarter: 2,
              amount: 100
            },
            {
              year: 2018,
              quarter: 3,
              amount: 100
            },
            {
              year: 2018,
              quarter: 4,
              amount: 100
            }
          ]
        ],
       headcountEffort: [
          [
            {
              year: 2018,
              quarter: 1,
              amount: 0
            },
            {
              year: 2018,
              quarter: 2,
              amount: 0
            },
            {
              year: 2018,
              quarter: 3,
              amount: 0
            },
            {
              year: 2018,
              quarter: 4,
              amount: 0
            }
          ]
        ]
      },
      {
        scenarioName: "Q2 2018 close",
        scenarioDate: "Q2 2018",
        scenarioID: 2,
        priorScenarioID: 1,
        displaySelections: [
          {
            year: 2018,
            type: "Annual"
          } 
        ],
        revenueMilestones: [
          {
            id: 1000,
            name: "Upfront Payment",
            dateEarned: "Q1 2018",
            datePaid: "Q1 2018",
            amount: 1000
          }
        ],
        externalSpend: [
          [
            {
              year: 2018,
              quarter: 1,
              amount: 100
            },
            {
              year: 2018,
              quarter: 2,
              amount: 50
            },
            {
              year: 2018,
              quarter: 3,
              amount: 50
            },
            {
              year: 2018,
              quarter: 4,
              amount: 50
            }
          ]
        ],
       headcountEffort: [
          [
            {
              year: 2018,
              quarter: 1,
              amount: 0
            },
            {
              year: 2018,
              quarter: 2,
              amount: 0
            },
            {
              year: 2018,
              quarter: 3,
              amount: 0
            },
            {
              year: 2018,
              quarter: 4,
              amount: 0
            }
          ]
        ]
      }
    ]  
  }
  return simpleModelFixture;
}


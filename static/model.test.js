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
  expect(actual).toEqual(expected);
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
  expect(actual).toEqual(expected);
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

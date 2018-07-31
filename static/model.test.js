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
      period: 2020,
      type: "Annual",
      amount: 0
    },
    {
      period: 2021.0,
      type: "Quarterly",
      amount: 0
    },
    {
      period: 2021.25,
      type: "Quarterly",
      amount: 0
    },
    {
      period: 2021.5,
      type: "Quarterly",
      amount: 0
    },
    {
      period: 2021.75,
      type: "Quarterly",
      amount: 0
    },
    {
      period: 2022,
      type: "Annual",
      amount: 0
    }
  ]
  expect(actual).toEqual(expected);
});

test("dataToDisplay function", () => {
  const displayType = [
    {
      period: 2020,
      type: "Annual",
      amount: 0
    },
    {
      period: 2021.0,
      type: "Quarterly",
      amount: 0
    },
    {
      period: 2021.25,
      type: "Quarterly",
      amount: 0
    },
    {
      period: 2021.5,
      type: "Quarterly",
      amount: 0
    },
    {
      period: 2021.75,
      type: "Quarterly",
      amount: 0
    },
    {
      period: 2022,
      type: "Annual",
      amount: 0
    }
  ]
  const dataArray = [
    {
      period: 2020.0,
      amount: 200
    },
    {
      period: 2020.25,
      amount: 200
    },
    {
      period: 2020.5,
      amount: 200
    },
    {
      period: 2020.75,
      amount: 200
    },
    {
      period: 2021.0,
      amount: 400
    },
    {
      period: 2021.25,
      amount: 400
    },
    {
      period: 2021.5,
      amount: 400
    },
    {
      period: 2021.75,
      amount: 400
    },
    {
      period: 2022.0,
      amount: 100
    },
    {
      period: 2022.25,
      amount: 100
    },
    {
      period: 2022.5,
      amount: 100
    },
    {
      period: 2022.75,
      amount: 100
    }
  ];
  const actual = model.dataToDisplay(displayType, dataArray);
  const expected = [
    {
      period: 2020,
      type: "Annual",
      amount: 800
    },
    {
      period: 2021.0,
      type: "Quarterly",
      amount: 400
    },
    {
      period: 2021.25,
      type: "Quarterly",
      amount: 400
    },
    {
      period: 2021.5,
      type: "Quarterly",
      amount: 400
    },
    {
      period: 2021.75,
      type: "Quarterly",
      amount: 400
    },
    {
      period: 2022,
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
      period: 2020.0,
      amount: 0
    },
    {
      period: 2020.25,
      amount: 0
    },
    {
      period: 2020.5,
      amount: 0
    },
    {
      period: 2020.75,
      amount: 0
    },
    {
      period: 2021.0,
      amount: 0
    },
    {
      period: 2021.25,
      amount: 0
    },
    {
      period: 2021.5,
      amount: 0
    },
    {
      period: 2021.75,
      amount: 0
    },
    {
      period: 2022.0,
      amount: 0
    },
    {
      period: 2022.25,
      amount: 0
    },
    {
      period: 2022.5,
      amount: 0
    },
    {
      period: 2022.75,
      amount: 0
    }
  ]
  expect(actual).toEqual(expected);
});

test("editDataArrayLength - add year", () => {
  const array = [ 
    {
      period: 2020,
      amount: 200
    },
    {
      period: 2020.25,
      amount: 200
    },
    {
      period: 2020.5,
      amount: 200
    },
    {
      period: 2020.75,
      amount: 200
    },
    {
      period: 2021,
      amount: 400
    },
    {
      period: 2021.25,
      amount: 400
    },
    {
      period: 2021.5,
      amount: 400
    },
    {
      period: 2021.75,
      amount: 400
    },
    {
      period: 2022,
      amount: 100
    },
    {
      period: 2022.25,
      amount: 100
    },
    {
      period: 2022.5,
      amount: 100
    },
    {
      period: 2022.75,
      amount: 100
    }
  ];
  const startYear = 2020;
  const yearsOut = 4;
  const actual = model.editDataArrayLength(array, startYear, yearsOut)
  const expected =  [
    {
      period: 2020,
      amount: 200
    },
    {
      period: 2020.25,
      amount: 200
    },
    {
      period: 2020.5,
      amount: 200
    },
    {
      period: 2020.75,
      amount: 200
    },
    {
      period: 2021,
      amount: 400
    },
    {
      period: 2021.25,
      amount: 400
    },
    {
      period: 2021.5,
      amount: 400
    },
    {
      period: 2021.75,
      amount: 400
    },
    {
      period: 2022,
      amount: 100
    },
    {
      period: 2022.25,
      amount: 100
    },
    {
      period: 2022.5,
      amount: 100
    },
    {
      period: 2022.75,
      amount: 100
    },
    {
      period: 0,
      amount: 0
    },
    {
      period: 0,
      amount: 0
    },
    {
      period: 0,
      amount: 0
    },
    {
      period: 0,
      amount: 0
    }
  ];
  expect(actual).toEqual(expected);
});

test("remove year to editDataArrayLength", () => {
  const array = [ 
    {
      period: 2020,
      amount: 200
    },
    {
      period: 2020.25,
      amount: 200
    },
    {
      period: 2020.5,
      amount: 200
    },
    {
      period: 2020.75,
      amount: 200
    },
    {
      period: 2021,
      amount: 400
    },
    {
      period: 2021.25,
      amount: 400
    },
    {
      period: 2021.5,
      amount: 400
    },
    {
      period: 2021.75,
      amount: 400
    },
    {
      period: 2022,
      amount: 100
    },
    {
      period: 2022.25,
      amount: 100
    },
    {
      period: 2022.5,
      amount: 100
    },
    {
      period: 2022.75,
      amount: 100
    }
  ];
  const startYear = 2020;
  const yearsOut = 2;
  const actual = model.editDataArrayLength(array, startYear, yearsOut)
  const expected =  [
    {
      period: 2020,
      amount: 200
    },
    {
      period: 2020.25,
      amount: 200
    },
    {
      period: 2020.5,
      amount: 200
    },
    {
      period: 2020.75,
      amount: 200
    },
    {
      period: 2021,
      amount: 400
    },
    {
      period: 2021.25,
      amount: 400
    },
    {
      period: 2021.5,
      amount: 400
    },
    {
      period: 2021.75,
      amount: 400
    },
    {
      period: 2022,
      amount: 0
    },
    {
      period: 2022.25,
      amount: 0
    },
    {
      period: 2022.5,
      amount: 0
    },
    {
      period: 2022.75,
      amount: 0
    }
  ];
  expect(actual).toEqual(expected);
});

test("no change to editDataArrayLength", () => {
  const array = [ 
    {
      period: 2020,
      amount: 200
    },
    {
      period: 2020.25,
      amount: 200
    },
    {
      period: 2020.5,
      amount: 200
    },
    {
      period: 2020.75,
      amount: 200
    },
    {
      period: 2021,
      amount: 400
    },
    {
      period: 2021.25,
      amount: 400
    },
    {
      period: 2021.5,
      amount: 400
    },
    {
      period: 2021.75,
      amount: 400
    },
    {
      period: 2022,
      amount: 100
    },
    {
      period: 2022.25,
      amount: 100
    },
    {
      period: 2022.5,
      amount: 100
    },
    {
      period: 2022.75,
      amount: 100
    }
  ];
  const startYear = 2020;
  const yearsOut = 3;
  const actual = model.editDataArrayLength(array, startYear, yearsOut)
  const expected = [ 
    {
      period: 2020,
      amount: 200
    },
    {
      period: 2020.25,
      amount: 200
    },
    {
      period: 2020.5,
      amount: 200
    },
    {
      period: 2020.75,
      amount: 200
    },
    {
      period: 2021,
      amount: 400
    },
    {
      period: 2021.25,
      amount: 400
    },
    {
      period: 2021.5,
      amount: 400
    },
    {
      period: 2021.75,
      amount: 400
    },
    {
      period: 2022,
      amount: 100
    },
    {
      period: 2022.25,
      amount: 100
    },
    {
      period: 2022.5,
      amount: 100
    },
    {
      period: 2022.75,
      amount: 100
    }
  ];
  expect(actual).toEqual(expected);
});

test("arrayTotal test", () => {
  const array = [ 
    {
      period: 2020,
      amount: 200
    },
    {
      period: 2020.25,
      amount: 200
    },
    {
      period: 2020.5,
      amount: 200
    },
    {
      period: 2020.75,
      amount: 200
    },
    {
      period: 2021,
      amount: 400
    },
    {
      period: 2021.25,
      amount: 400
    },
    {
      period: 2021.5,
      amount: 400
    },
    {
      period: 2021.75,
      amount: 400
    },
    {
      period: 2022,
      amount: 100
    },
    {
      period: 2022.25,
      amount: 100
    },
    {
      period: 2022.5,
      amount: 100
    },
    {
      period: 2022.75,
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
        period: 2020,
        amount: 200
      },
      {
        period: 2020.25,
        amount: 200
      },
      {
        period: 2020.5,
        amount: 200
      },
      {
        period: 2020.75,
        amount: 200
      },
      {
        period: 2021,
        amount: 400
      },
      {
        period: 2021.25,
        amount: 400
      },
      {
        period: 2021.5,
        amount: 400
      },
      {
        period: 2021.75,
        amount: 400
      },
      {
        period: 2022,
        amount: 100
      },
      {
        period: 2022.25,
        amount: 100
      },
      {
        period: 2022.5,
        amount: 100
      },
      {
        period: 2022.75,
        amount: 100
      }
    ],
    [
      {
        period: 2020,
        amount: 200
      },
      {
        period: 2020.25,
        amount: 200
      },
      {
        period: 2020.5,
        amount: 200
      },
      {
        period: 2020.75,
        amount: 200
      },
      {
        period: 2021,
        amount: 400
      },
      {
        period: 2021.25,
        amount: 400
      },
      {
        period: 2021.5,
        amount: 400
      },
      {
        period: 2021.75,
        amount: 400
      },
      {
        period: 2022,
        amount: 100
      },
      {
        period: 2022.25,
        amount: 100
      },
      {
        period: 2022.5,
        amount: 100
      },
      {
        period: 2022.75,
        amount: 100
      }
    ]
  ]
  const actual = model.calculatePeriodTotal(arrayOfArrays)
  const expected = [
    {
      period: 2020,
      amount: 400
    },
    {
      period: 2020.25,
      amount: 400
    },
    {
      period: 2020.5,
      amount: 400
    },
    {
      period: 2020.75,
      amount: 400
    },
    {
      period: 2021,
      amount: 800
    },
    {
      period: 2021.25,
      amount: 800
    },
    {
      period: 2021.5,
      amount: 800
    },
    {
      period: 2021.75,
      amount: 800
    },
    {
      period: 2022,
      amount: 200
    },
    {
      period: 2022.25,
      amount: 200
    },
    {
      period: 2022.5,
      amount: 200
    },
    {
      period: 2022.75,
      amount: 200
    }
  ]
  expect(actual).toEqual(expected);
})

test("percentCompleteArray test", () => {
  const array = [
    {
      period: 2020,
      amount: 400
    },
    {
      period: 2020.25,
      amount: 400
    },
    {
      period: 2020.5,
      amount: 400
    },
    {
      period: 2020.75,
      amount: 400
    },
    {
      period: 2021,
      amount: 800
    },
    {
      period: 2021.25,
      amount: 800
    },
    {
      period: 2021.5,
      amount: 800
    },
    {
      period: 2021.75,
      amount: 800
    },
    {
      period: 2022,
      amount: 200
    },
    {
      period: 2022.25,
      amount: 200
    },
    {
      period: 2022.5,
      amount: 200
    },
    {
      period: 2022.75,
      amount: 200
    }
  ]
  const actual = model.percentCompleteArray(array);
  const expected = [
    {
      period: 2020,
      amount: 0.071428571428571424
    },
    {
      period: 2020.25,
      amount: 0.071428571428571424
    },
    {
      period: 2020.5,
      amount: 0.071428571428571424
    },
    {
      period: 2020.75,
      amount: 0.071428571428571424
    },
    {
      period: 2021,
      amount: 0.14285714285714285
    },
    {
      period: 2021.25,
      amount: 0.14285714285714285
    },
    {
      period: 2021.5,
      amount: 0.14285714285714285
    },
    {
      period: 2021.75,
      amount: 0.14285714285714285
    },
    {
      period: 2022,
      amount: 0.0357142857142857143
    },
    {
      period: 2022.25,
      amount: 0.0357142857142857143
    },
    {
      period: 2022.5,
      amount: 0.0357142857142857143
    },
    {
      period: 2022.75,
      amount: 0.0357142857142857143
    }
  ]
  expect(actual).toEqual(expected);
})

test("dollarCompleteCummArray test", () => {
  const array = [
    {
      period: 2020,
      amount: 400
    },
    {
      period: 2020.25,
      amount: 400
    },
    {
      period: 2020.5,
      amount: 400
    },
    {
      period: 2020.75,
      amount: 400
    },
    {
      period: 2021,
      amount: 800
    },
    {
      period: 2021.25,
      amount: 800
    },
    {
      period: 2021.5,
      amount: 800
    },
    {
      period: 2021.75,
      amount: 800
    },
    {
      period: 2022,
      amount: 800
    },
    {
      period: 2022.25,
      amount: 1600
    },
    {
      period: 2022.5,
      amount: 0
    },
    {
      period: 2022.75,
      amount: 800
    }
  ]
  const grandTotalSpend = 8000;
  const actual = model.dollarCompleteCummArray(array, grandTotalSpend);
  const expected = [
    {
      period: 2020,
      amount: 400
    },
    {
      period: 2020.25,
      amount: 800
    },
    {
      period: 2020.5,
      amount: 1200
    },
    {
      period: 2020.75,
      amount: 1600
    },
    {
      period: 2021,
      amount: 2400
    },
    {
      period: 2021.25,
      amount: 3200
    },
    {
      period: 2021.5,
      amount: 4000
    },
    {
      period: 2021.75,
      amount: 4800
    },
    {
      period: 2022,
      amount: 5600
    },
    {
      period: 2022.25,
      amount: 7200
    },
    {
      period: 2022.5,
      amount: 7200
    },
    {
      period: 2022.75,
      amount: 8000
    }
  ]
  expect(actual).toEqual(expected);
})

test("percentCompleteCummArray test", () => {
  const array = [
    {
      period: 2020,
      amount: 400
    },
    {
      period: 2020.25,
      amount: 800
    },
    {
      period: 2020.5,
      amount: 1200
    },
    {
      period: 2020.75,
      amount: 1600
    },
    {
      period: 2021,
      amount: 2400
    },
    {
      period: 2021.25,
      amount: 3200
    },
    {
      period: 2021.5,
      amount: 4000
    },
    {
      period: 2021.75,
      amount: 4800
    },
    {
      period: 2022,
      amount: 5600
    },
    {
      period: 2022.25,
      amount: 7200
    },
    {
      period: 2022.5,
      amount: 7200
    },
    {
      period: 2022.75,
      amount: 8000
    }
  ]
  const grandTotalSpend = 8000;
  const actual = model.percentCompleteCummArray(array, grandTotalSpend);
  const expected = [
    {
      period: 2020,
      amount: 0.05
    },
    {
      period: 2020.25,
      amount: 0.1
    },
    {
      period: 2020.5,
      amount: 0.15
    },
    {
      period: 2020.75,
      amount: 0.2
    },
    {
      period: 2021,
      amount: 0.3
    },
    {
      period: 2021.25,
      amount: 0.4
    },
    {
      period: 2021.5,
      amount: 0.5
    },
    {
      period: 2021.75,
      amount: 0.6
    },
    {
      period: 2022,
      amount: 0.7
    },
    {
      period: 2022.25,
      amount: 0.9
    },
    {
      period: 2022.5,
      amount: 0.9
    },
    {
      period: 2022.75,
      amount: 1
    }
  ]
  expect(actual).toEqual(expected);
})
test("periodAmountCalc - QTD", () => {
  const array = [
    {period: 2020,amount: 5000},
    {
      period: 2020.25,
      amount: 5000
    },
    {
      period: 2020.5,
      amount: 5000
    },
    {
      period: 2020.75,
      amount: 5000
    },
    {
      period: 2021,
      amount: 10000
    },
    {
      period: 2021.25,
      amount: 10000
    },
    {
      period: 2021.5,
      amount: 10000
    },
    {
      period: 2021.75,
      amount: 10000
    },
    {
      period: 2022,
      amount: 10000
    },
    {
      period: 2022.25,
      amount: 20000
    },
    {
      period: 2022.5,
      amount: 0
    },
    {
      period: 2022.75,
      amount: 10000
    }
  ]
  const currentPeriod = 2022.5;
  const periodType = "QTD"
  const actual = model.periodAmountCalc(array, currentPeriod, periodType);
  const expected = 0;
  expect(actual).toEqual(expected);
})

test("periodAmountCalc - YTD", () => {
  const array = [
    {
      period: 2020,
      amount: 5000
    },
    {
      period: 2020.25,
      amount: 5000
    },
    {
      period: 2020.5,
      amount: 5000
    },
    {
      period: 2020.75,
      amount: 5000
    },
    {
      period: 2021,
      amount: 10000
    },
    {
      period: 2021.25,
      amount: 10000
    },
    {
      period: 2021.5,
      amount: 10000
    },
    {
      period: 2021.75,
      amount: 10000
    },
    {
      period: 2022,
      amount: 10000
    },
    {
      period: 2022.25,
      amount: 20000
    },
    {
      period: 2022.5,
      amount: 0
    },
    {
      period: 2022.75,
      amount: 10000
    }
  ]
  const currentPeriod = 2022.5;
  const periodType = "YTD"
  const actual = model.periodAmountCalc(array, currentPeriod, periodType);
  const expected = 30000;
  expect(actual).toEqual(expected);
})

test("periodAmountCalc - Full Year", () => {
  const array = [
    {
      period: 2020,
      amount: 5000
    },
    {
      period: 2020.25,
      amount: 5000
    },
    {
      period: 2020.5,
      amount: 5000
    },
    {
      period: 2020.75,
      amount: 5000
    },
    {
      period: 2021,
      amount: 10000
    },
    {
      period: 2021.25,
      amount: 10000
    },
    {
      period: 2021.5,
      amount: 10000
    },
    {
      period: 2021.75,
      amount: 10000
    },
    {
      period: 2022,
      amount: 10000
    },
    {
      period: 2022.25,
      amount: 20000
    },
    {
      period: 2022.5,
      amount: 0
    },
    {
      period: 2022.75,
      amount: 10000
    }
  ]
  const currentPeriod = 2022.5;
  const periodType = "Full Year"
  const actual = model.periodAmountCalc(array, currentPeriod, periodType);
  const expected = 40000;
  expect(actual).toEqual(expected);
})

test("calculateTotalSpendArray test",() => {
  const externalSpend = [ 
    [ 
      {
        period: 2020,
        amount: 200
      },
      {
        period: 2020.25,
        amount: 200
      },
      {
        period: 2020.5,
        amount: 200
      },
      {
        period: 2020.75,
        amount: 200
      },
      {
        period: 2021,
        amount: 400
      },
      {
        period: 2021.25,
        amount: 400
      },
      {
        period: 2021.5,
        amount: 400
      },
      {
        period: 2021.75,
        amount: 400
      },
      {
        period: 2022,
        amount: 100
      },
      {
        period: 2022.25,
        amount: 100
      },
      {
        period: 2022.5,
        amount: 100
      },
      {
        period: 2022.75,
        amount: 100
      }
    ],
    [ 
      {
        period: 2020,
        amount: 200
      },
      {
        period: 2020.25,
        amount: 200
      },
      {
        period: 2020.5,
        amount: 200
      },
      {
        period: 2020.75,
        amount: 200
      },
      {
        period: 2021,
        amount: 400
      },
      {
        period: 2021.25,
        amount: 400
      },
      {
        period: 2021.5,
        amount: 400
      },
      {
        period: 2021.75,
        amount: 400
      },
      {
        period: 2022,
        amount: 100
      },
      {
        period: 2022.25,
        amount: 100
      },
      {
        period: 2022.5,
        amount: 100
      },
      {
        period: 2022.75,
        amount: 100
      }
    ]
  ];
  const headcountSpend = [ 
    [ 
      {
        period: 2020,
        amount: 200
      },
      {
        period: 2020.25,
        amount: 200
      },
      {
        period: 2020.5,
        amount: 200
      },
      {
        period: 2020.75,
        amount: 200
      },
      {
        period: 2021,
        amount: 400
      },
      {
        period: 2021.25,
        amount: 400
      },
      {
        period: 2021.5,
        amount: 400
      },
      {
        period: 2021.75,
        amount: 400
      },
      {
        period: 2022,
        amount: 100
      },
      {
        period: 2022.25,
        amount: 100
      },
      {
        period: 2022.5,
        amount: 100
      },
      {
        period: 2022.75,
        amount: 100
      }
    ],
    [ 
      {
        period: 2020,
        amount: 200
      },
      {
        period: 2020.25,
        amount: 200
      },
      {
        period: 2020.5,
        amount: 200
      },
      {
        period: 2020.75,
        amount: 200
      },
      {
        period: 2021,
        amount: 400
      },
      {
        period: 2021.25,
        amount: 400
      },
      {
        period: 2021.5,
        amount: 400
      },
      {
        period: 2021.75,
        amount: 400
      },
      {
        period: 2022,
        amount: 100
      },
      {
        period: 2022.25,
        amount: 100
      },
      {
        period: 2022.5,
        amount: 100
      },
      {
        period: 2022.75,
        amount: 100
      }
    ]
  ];
  const actual = model.calculateTotalSpendArrays(externalSpend, headcountSpend);
  const expected = [
    [ 
      {
        period: 2020,
        amount: 400
      },
      {
        period: 2020.25,
        amount: 400
      },
      {
        period: 2020.5,
        amount: 400
      },
      {
        period: 2020.75,
        amount: 400
      },
      {
        period: 2021,
        amount: 800
      },
      {
        period: 2021.25,
        amount: 800
      },
      {
        period: 2021.5,
        amount: 800
      },
      {
        period: 2021.75,
        amount: 800
      },
      {
        period: 2022,
        amount: 200
      },
      {
        period: 2022.25,
        amount: 200
      },
      {
        period: 2022.5,
        amount: 200
      },
      {
        period: 2022.75,
        amount: 200
      }
    ],
    [ 
      {
        period: 2020,
        amount: 400
      },
      {
        period: 2020.25,
        amount: 400
      },
      {
        period: 2020.5,
        amount: 400
      },
      {
        period: 2020.75,
        amount: 400
      },
      {
        period: 2021,
        amount: 800
      },
      {
        period: 2021.25,
        amount: 800
      },
      {
        period: 2021.5,
        amount: 800
      },
      {
        period: 2021.75,
        amount: 800
      },
      {
        period: 2022,
        amount: 200
      },
      {
        period: 2022.25,
        amount: 200
      },
      {
        period: 2022.5,
        amount: 200
      },
      {
        period: 2022.75,
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
  const versions = simpleModel.versions;
  const milestone = versions[1].revenueMilestones[0];
  const programs = simpleModel.programs;
  const activeVersionID = simpleModel.activeVersionID;
  const actual = model.calculateModelRevenue(startYear, yearsOut, milestone, versions,programs, activeVersionID); 
  const expected = [
    {
      period: 2018,
      amount: 250
    },
    {
      period: 2018.25,
      amount: 350
    },
    {
      period: 2018.5,
      amount: 200
    },
    {
      period: 2018.75,
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
    activeVersionID: 2,
    programs: [
      {
        name: "Program A", 
        id: 1001,
        fteRate: 250000
      }
    ],
    activityLog: [],
    versions: [
      {
        versionName: "Q1 2018 close",
        versionPeriod: "Q1 2018",
        versionID: 1,
        priorVersionID: 0,
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
            dateEarned: 2018.5,
            amount: 1000
          }
        ],
        externalSpend: [
          [
            {
              period: 2018.0,
              amount: 100
            },
            {
              period: 2018.25,
              amount: 100
            },
            {
              period: 2018.5,
              amount: 100
            },
            {
              period: 2018.75,
              amount: 100
            }
          ]
        ],
       headcountEffort: [
          [
            {
              period: 2018.0,
              amount: 0
            },
            {
              period: 2018.25,
              amount: 0
            },
            {
              period: 2018.5,
              amount: 875
            },
            {
              period: 2018.75,
              amount: 125
            }
          ]
        ]
      },
      {
        versionName: "Q2 2018 close",
        versionPeriod: "Q2 2018",
        versionID: 2,
        priorVersionID: 1,
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
            dateEarned: 2018.5,
            amount: 1000
          }
        ],
        externalSpend: [
          [
            {
              period: 2018.0,
              amount: 100
            },
            {
              period: 2018.25,
              amount: 50
            },
            {
              period: 2018.5,
              amount: 50
            },
            {
              period: 2018.75,
              amount: 50
            }
          ]
        ],
       headcountEffort: [
          [
            {
              period: 2018.0,
              amount: 0
            },
            {
              period: 2018.25,
              amount: 0
            },
            {
              period: 2018.5,
              amount: 875
            },
            {
              period: 2018.75,
              amount: 125
            }
          ]
        ]
      },
      {
        versionName: "Q3 2018 close",
        versionPeriod: "Q3 2018",
        versionID: 3,
        priorVersionID: 2,
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
            dateEarned: 2018.5,
            amount: 1000
          }
        ],
        externalSpend: [
          [
            {
              period: 2018.0,
              amount: 100
            },
            {
              period: 2018.25,
              amount: 50
            },
            {
              period: 2018.5,
              amount: 25
            },
            {
              period: 2018.75,
              amount: 25
            }
          ]
        ],
       headcountEffort: [
          [
            {
              period: 2018.0,
              amount: 0
            },
            {
              period: 2018.25,
              amount: 0
            },
            {
              period: 2018.5,
              amount: 875
            },
            {
              period: 2018.75,
              amount: 125
            }
          ]
        ]
      }
    ]  
  }

  const startYear = simpleModel.startYear;
  const yearsOut = simpleModel.endYear - startYear + 1;
  const versions = simpleModel.versions;
  const programs = simpleModel.programs;
  const activeVersionID = simpleModel.activeVersionID;
  const milestone = simpleModel.versions[activeVersionID].revenueMilestones[0];
  const actual = model.calculateModelRevenue(startYear, yearsOut, milestone, versions,programs, activeVersionID);
  const expected = [
    {
      period: 2018.0,
      amount: 0
    },
    {
      period: 2018.25,
      amount: 0
    },
    {
      period: 2018.5,
      amount: 875
    },
    {
      period: 2018.75,
      amount: 125
    }
  ]
  expect(actual).toEqual(expected);
})

test("calculatePriorVersionIndex - index = 0", () => {
  const simpleModel = fixtureSimpleModel();
  const versions = simpleModel.versions;
  const priorVersionID = versions[0].priorVersionID;
  const actual = model.calculatePriorVersionIndex(versions, priorVersionID);
  const expected = "Initial Model";
  expect(actual).toEqual(expected);
})

test("calculatePriorVersionIndex - index = 1", () => {
  const simpleModel = fixtureSimpleModel();
  const versions = simpleModel.versions;
  const priorVersionID = versions[1].priorVersionID;
  const actual = model.calculatePriorVersionIndex(versions, priorVersionID);
  const expected = 0;
  expect(actual).toEqual(expected);
})

test("percentCompleteCummArrayFromData - simpleModel", () => {
  const simpleModel = fixtureSimpleModel();
  const version = simpleModel.versions[0];
  const externalSpend = version.externalSpend;
  const headcountEffort = version.headcountEffort;
  const programs = simpleModel.programs;
  const actual = model.percentCompleteCummArrayFromData(headcountEffort, externalSpend, programs);
  const expected = [
    {
      period: 2018.0,
      amount: 0.25
    },
    {
      period: 2018.25,
      amount: 0.5
    },
    {
      period: 2018.5,
      amount: 0.75
    },
    {
      period: 2018.75,
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
      dateEarned: 2018.5,
      amount: 1000
    }
  const percentCompleteCumm = [
    {
      period: 2018.0,
      amount: 0.25
    },
    {
      period: 2018.25,
      amount: 0.5
    },
    {
      period: 2018.5,
      amount: 0.75
    },
    {
      period: 2018.75,
      amount: 1
    },
  ];
  const actual = model.calculateCurrentPeriodRev(startYear, yearsOut, milestone, percentCompleteCumm);
  const expected = [ 
    {
      period: 2018,
      amount: 0
    },
    {
      period: 2018.25,
      amount: 0
    },
    {
      period: 2018.5,
      amount: 750
    },
    {
      period: 2018.75,
      amount: 250
    },
  ];
  expect(actual).toEqual(expected);
})

test("editDataArrayYears", () => {
  const array = [ 
    {
      period: 2018.0,
      amount: 0
    },
    {
      period: 2018.25,
      amount: 0
    },
    {
      period: 2018.5,
      amount: 750
    },
    {
      period: 2018.75,
      amount: 250
    },
  ];
  const startYear = 2019;
  const actual = model.editDataArrayYears(array, startYear);
  const expected = [
    {
      period: 2019.0,
      amount: 0
    },
    {
      period: 2019.25,
      amount: 0
    },
    {
      period: 2019.5,
      amount: 750
    },
    {
      period: 2019.75,
      amount: 250
    },
  ];
  expect(actual).toEqual(expected);
})

test("periodStringToNumber", () => {
  const periodString = "Q3 2018"
  const actual = model.periodStringToNumber(periodString);
  const expected = 2018.5
  expect(actual).toEqual(expected);
})

test("periodNumberToString", () => {
  const periodNumber = 2018.5;
  const actual = model.periodNumberToString(periodNumber);
  const expected = "Q3 2018"
  expect(actual).toEqual(expected);
})

test("priorPeriodTrueup", () => {
  const simpleModel = {
    version: 1,
    modelName: "Example Collaboration 606 Model",
    startYear: 2018,
    endYear: 2018,
    activeVersionID: 1,
    programs: [
      {
        name: "Program A", 
        id: 1001,
        fteRate: 0
      }
    ],
    activityLog: [],
    versions: [
      {
        versionName: "Q1 2018 close",
        versionPeriod: 2018,
        versionID: 1,
        priorVersionID: 0,
        displaySelections: [
          {
            year: 2018,
            type: "Quarterly"
          } 
        ],
        revenueMilestones: [
          {
            id: 1000,
            name: "Upfront Payment",
            dateEarned: 2018,
            amount: 1000
          }
        ],
        externalSpend: [
          [
            {
              period: 2018.0,
              amount: 100
            },
            {
              period: 2018.25,
              amount: 100
            },
            {
              period: 2018.5,
              amount: 100
            },
            {
              period: 2018.75,
              amount: 100
            }
          ]
        ],
       headcountEffort: [
          [
            {
              period: 2018.0,
              amount: 0
            },
            {
              period: 2018.25,
              amount: 0
            },
            {
              period: 2018.5,
              amount: 0
            },
            {
              period: 2018.75,
              amount: 0
            }
          ]
        ]
      },
      {
        versionName: "Q2 2018 close",
        versionPeriod: 2018.25,
        versionID: 2,
        priorVersionID: 1,
        displaySelections: [
          {
            year: 2018,
            type: "Quarterly"
          } 
        ],
        revenueMilestones: [
          {
            id: 1000,
            name: "Upfront Payment",
            dateEarned: 2018,
            amount: 1000
          }
        ],
        externalSpend: [
          [
            {
              period: 2018.0,
              amount: 100
            },
            {
              period: 2018.25,
              amount: 50
            },
            {
              period: 2018.5,
              amount: 50
            },
            {
              period: 2018.75,
              amount: 50
            }
          ]
        ],
       headcountEffort: [
          [
            {
              period: 2018.0,
              amount: 0
            },
            {
              period: 2018.25,
              amount: 0
            },
            {
              period: 2018.5,
              amount: 0
            },
            {period: 2018.75, amount: 0}
          ]
        ]
      }
    ]  
  }
  const programs = simpleModel.programs
  const milestone = simpleModel.versions[1].revenueMilestones[0];
  const currentPeriod = 2018.25;
  const startYear = simpleModel.startYear;
  const yearsOut = simpleModel.endYear - startYear + 1;
  const versions = simpleModel.versions;
  const activeVersionID = simpleModel.activeVersionID;
  const actual = model.priorPeriodTrueup(programs, milestone, currentPeriod, startYear, yearsOut, versions, activeVersionID);
  const expected = [
    {period: 2018, amount: 0},
    {period: 2018.25, amount: 150},
    {period: 2018.5, amount: 0},
    {period: 2018.75, amount: 0}
  ];
  expect(actual).toEqual(expected);
})

test("currentPeriodRevenue", () => {
  const simpleModel = fixtureSimpleModel();
  const startYear = simpleModel.startYear;
  const yearsOut = simpleModel.endYear - startYear + 1;
  const versions = simpleModel.versions;
  const milestone = versions[1].revenueMilestones[0];
  const programs = simpleModel.programs;
  const activeVersionID = 1;
  const versionPeriod = 2018.25 
  const actual = model.currentPeriodRevenue(startYear, yearsOut, milestone, versions, programs, activeVersionID, versionPeriod)
  const expected = [
    {period: 2018, amount: 250},
    {period: 2018.25, amount: 200},
    {period: 2018.5, amount: 200},
    {period: 2018.75, amount: 200}
  ]
  expect(actual).toEqual(expected);
})

function fixtureSimpleModel () {
  const simpleModelFixture = {
    version: 0,
    modelName: "Example Collaboration 606 Model",
    startYear: 2018,
    endYear: 2018,
    activeVersionID: 2,
    programs: [
      {
        name: "Program A", 
        id: 1001,
        fteRate: 250000
      }
    ],
    activityLog: [],
    versions: [
      {
        versionName: "Q1 2018 close",
        versionPeriod: 2018,
        versionID: 1,
        priorVersionID: 0,
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
            dateEarned: 2018,
            amount: 1000
          }
        ],
        externalSpend: [
          [
            {period: 2018, amount: 100},
            {period: 2018.25, amount: 100},
            {period: 2018.5, amount: 100},
            {period: 2018.75, amount: 100}
          ]
        ],
       headcountEffort: [
          [
            {period: 2018, amount: 0},
            {period: 2018.25, amount: 0},
            {period: 2018.5, amount: 0},
            {period: 2018.75, amount: 0}
          ]
        ]
      },
      {
        versionName: "Q2 2018 close",
        versionPeriod: 2018.25,
        versionID: 2,
        priorVersionID: 1,
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
            dateEarned: 2018, 
            amount: 1000
          }
        ],
        externalSpend: [
          [
            {period: 2018, amount: 100},
            {period: 2018.25, amount: 50},
            {period: 2018.5, amount: 50},
            {period: 2018.75, amount: 50}
          ]
        ],
       headcountEffort: [
          [
            {period: 2018, amount: 0},
            {period: 2018.25, amount: 0},
            {period: 2018.5, amount: 0},
            {period: 2018.75, amount: 0}
          ]
        ]
      }
    ]  
  }
  return simpleModelFixture;
}


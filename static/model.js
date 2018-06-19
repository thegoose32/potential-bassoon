export const displayOptions = ['Annual', 'Quarterly'];
export const newAmounts = [
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
  },
];

export const defaultState = {
  version: 0,
  modelName: "hello world",
  startYear: 2018,
  yearsOut: 3,
  activeScenarioId: 0,
  scenarios: [
    {
      scenarioName: "Q2 2018 close",
      scenarioDate: "6/30/2018",
      displaySelections: [
        {
          year: 2018,
          type: "Annual"
        }, 
        {
          year: 2019,
          type: "Annual"
        },
        {
          year: 2020,
          type: "Annual"
        }
      ],
      programs: [
        {
          name: "Program A", 
          id: 1001,
          fteRate: 250000
        },
        {
          name: "Program B",
          id: 1002,
          fteRate: 250000
        }
      ],
      revenueMilestones: [
        {
          id: 1000,
          name: "Upfront Payment",
          dateEarned: "Q1 2018",
          datePaid: "Q1 2018",
          amount: 100000
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
          },
          {
            year: 2019,
            quarter: 1,
            amount: 100
          },
          {
            year: 2019,
            quarter: 2,
            amount: 100
          },
          {
            year: 2019,
            quarter: 3,
            amount: 100
          },
          {
            year: 2019,
            quarter: 4,
            amount: 100
          },
          {
            year: 2020,
            quarter: 1,
            amount: 100
          },
          {
            year: 2020,
            quarter: 2,
            amount: 100
          },
          {
            year: 2020,
            quarter: 3,
            amount: 100
          },
          {
            year: 2020,
            quarter: 4,
            amount: 100
          }
        ],
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
          },
          {
            year: 2019,
            quarter: 1,
            amount: 100
          },
          {
            year: 2019,
            quarter: 2,
            amount: 100
          },
          {
            year: 2019,
            quarter: 3,
            amount: 100
          },
          {
            year: 2019,
            quarter: 4,
            amount: 100
          },
          {
            year: 2020,
            quarter: 1,
            amount: 100
          },
          {
            year: 2020,
            quarter: 2,
            amount: 100
          },
          {
            year: 2020,
            quarter: 3,
            amount: 100
          },
          {
            year: 2020,
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
            amount: 2
          },
          {
            year: 2018,
            quarter: 2,
            amount: 2
          },
          {
            year: 2018,
            quarter: 3,
            amount: 2
          },
          {
            year: 2018,
            quarter: 4,
            amount: 2
          },
          {
            year: 2019,
            quarter: 1,
            amount: 2
          },
          {
            year: 2019,
            quarter: 2,
            amount: 2
          },
          {
            year: 2019,
            quarter: 3,
            amount: 2
          },
          {
            year: 2019,
            quarter: 4,
            amount: 2
          },
          {
            year: 2020,
            quarter: 1,
            amount: 2
          },
          {
            year: 2020,
            quarter: 2,
            amount: 2
          },
          {
            year: 2020,
            quarter: 3,
            amount: 2
          },
          {
            year: 2020,
            quarter: 4,
            amount: 2
          }
        ],
        [
          {
            year: 2018,
            quarter: 1,
            amount: 2
          },
          {
            year: 2018,
            quarter: 2,
            amount: 2
          },
          {
            year: 2018,
            quarter: 3,
            amount: 2
          },
          {
            year: 2018,
            quarter: 4,
            amount: 2
          },
          {
            year: 2019,
            quarter: 1,
            amount: 2
          },
          {
            year: 2019,
            quarter: 2,
            amount: 2
          },
          {
            year: 2019,
            quarter: 3,
            amount: 2
          },
          {
            year: 2019,
            quarter: 4,
            amount: 2
          },
          {
            year: 2020,
            quarter: 1,
            amount: 2
          },
          {
            year: 2020,
            quarter: 2,
            amount: 2
          },
          {
            year: 2020,
            quarter: 3,
            amount: 2
          },
          {
            year: 2020,
            quarter: 4,
            amount: 2
          }
        ]
      ],
      analyticComparisonIndex: 0
    }
  ]
}

//Utility Components

export function displayArray(displaySelections) {
  let displayArray = [];

  displaySelections.forEach((yearSelection) => {
    if (yearSelection.type === "Quarterly") {
      for (let x = 1; x < 5; x++) {
        let periodTotal = Object()
        periodTotal.year = yearSelection.year;
        periodTotal.quarter = x;
        periodTotal.type = yearSelection.type;
        periodTotal.amount = 0;
        displayArray.push(periodTotal);
      }
    } else if (yearSelection.type === "Annual") {
      let periodTotal = Object()
      periodTotal.year = yearSelection.year;
      periodTotal.type = yearSelection.type;
      periodTotal.amount = 0;
      displayArray.push(periodTotal);
    }
  })
  return displayArray;
}

export function dataToDisplay(displayType, dataArray) {
  let dataRows = displayType.map((displayPeriod) => {
    dataArray.forEach((amount, amountIndex) => {
      let amountYear = amount.year;
      let amountQtr = amount.quarter;
      if (displayPeriod.year === amountYear && displayPeriod.type === "Quarterly" && displayPeriod.quarter === amountQtr) {
        displayPeriod.amount += amount.amount;
      } else if (displayPeriod.year === amountYear && displayPeriod.type === "Annual") {
        displayPeriod.amount += amount.amount;
      }
    })
    return displayPeriod;
  })

  return dataRows;
}

export function periodLabels(startYear, yearsOut) {
  let periodLabels = [];
  for (let y = startYear; y < startYear + yearsOut; y ++) {
    for (let x = 1; x < 5; x++) {
      periodLabels.push("Q" + x + " " + y)
    }
  }
  return periodLabels
}

export function displayType(props) {
  let quarterDisplay = []
  displaySelections.forEach((selection, selectionIndex) => {
    let id = 0;
    let selectionType = "Annual";
    for (let x = 1; x < 5; x++) {
      id = "" + startYear + selectionIndex;
      selectionType = selection;
      quarterDisplay.push({
        id: Number(id),
        selectionType: selectionType
      });
    }
  });
  return quarterDisplay;
}

export function yearsArray(startYear, yearsOut) {                            
  let years = [];
  for (let x = 0; x < yearsOut; x++) {
    years.push(startYear + x)
  };
  return years
}

export function addDataArray(startYear, yearsOut) {
  let newDataArray = [];
  for (let x = startYear; x < startYear + yearsOut; x++) {
    for (let y = 1; y < 5; y++) {
      let newCell = Object();
      newCell.year = x;
      newCell.quarter = y;
      newCell.amount = 0;
      newDataArray.push(newCell);
    }
  }
  
  return newDataArray;
}

export function editDataArrayLength(array, startYear, yearsOut) {
  if (array.length < yearsOut * 4) {
    let newPeriods = yearsOut - (array.length / 4);
    let newArray = keepCloning(array);
    for (let x = 0; x < newPeriods; x++) {
      newAmounts.forEach((amount) => {
        newArray.push(keepCloning(amount));
      })
    }
    return newArray;
  } else {
    return array;
  }
}

export function editDataArrayYears(array, startYear, yearsOut) {
  let newYear = startYear;
  let newArray = array.map((cell, cellIndex) => {
    if (cell.quarter !== 4) {
      cell.year = startYear
    } else {
      cell.year = startYear;
      startYear += 1;
    }
    return cell;
  });

  return newArray;
}

export function arrayTotal(array) {
  let initialTotal = 0;
  let total = array.reduce((a, b) => a + b.amount, initialTotal);
  return total;
}

export function calculatePeriodTotal(arrayOfArrays) {
  if (arrayOfArrays.length === 1) {
    return keepCloning(arrayOfArrays[0]);
  } else if (arrayOfArrays.length > 1) {
    let totalArray = [];
    arrayOfArrays.forEach((array, arrayIndex) => {
      if (arrayIndex === 0) {
        return totalArray = keepCloning(array);
      } else {
        array.forEach((cell, cellIndex) => {
          return totalArray[cellIndex].amount += cell.amount
        })
      }
    })
    return totalArray;
  }
}

export function keepCloning(objectpassed) {
  if (objectpassed === null || typeof objectpassed !== 'object') {
    return objectpassed;
  }

var temporaryStorage = objectpassed.constructor();
  for (var key in objectpassed) {
    temporaryStorage[key] = keepCloning(objectpassed[key]);
  }
  return temporaryStorage;
}

export function rounding(input, decimals) {
  let roundNumber = Math.round(input * decimals) / decimals;
  return roundNumber;
}

export function calculateRevenue(startYear, yearsOut, milestone, percentComplete, percentCompleteCum) {
  let milestoneEarnedQtr = Number(milestone.dateEarned.slice(1, 2));
  let milestoneEarnedYear = Number(milestone.dateEarned.slice(3));
  let blankDataArray = addDataArray(startYear, yearsOut);
  blankDataArray.map((period, periodIndex) => {
    if (period.year === milestoneEarnedYear && period.quarter === milestoneEarnedQtr) {
      period.amount = rounding(percentCompleteCum[periodIndex].amount * milestone.amount, 10000);
      return period;
      } else if (period.year === milestoneEarnedYear && period.quarter > milestoneEarnedQtr) {
      period.amount = rounding(percentComplete[periodIndex].amount * milestone.amount, 10000);
      return period;

    } else if (period.year > milestoneEarnedYear) {
      period.amount = rounding(percentComplete[periodIndex].amount * milestone.amount, 10000);
      return period;
    } else {
      period.amount = 0;
      return period;
    }
  });
  return blankDataArray;
}

export function calculateHeadcountSpend(headcountEffort, programs) {
  let headcountSpend = headcountEffort.map((progEffort, progIndex) => {
    let copiedProgEffort = keepCloning(progEffort);
    copiedProgEffort.map((copiedHcEffort) => { 
      copiedHcEffort.amount = rounding(copiedHcEffort.amount * programs[progIndex].fteRate, 100);
      return copiedHcEffort;
    })
    return copiedProgEffort
  })
  return headcountSpend;
}


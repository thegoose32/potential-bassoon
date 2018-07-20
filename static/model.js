var math = require('math.js');

// Periods are as follows: Q1 = 2018.0; Q2 = 2019.25; Q3 = 2018.5; Q4 = 2018.75 //

export const displayOptions = ['Annual', 'Quarterly'];
export const periodType = ['QTD', 'YTD', 'Full Year'];

export const defaultState = {
  version: 0,
  modelName: "Example Collaboration 606 Model",
  startYear: 2018,
  endYear: 2020,
  activeVersionId: 0,
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
  activityLog: [],
  scenarios: [
    {
      scenarioName: "Q1 2018 close",
      scenarioDate: 2018.0,
      scenarioID: 1,
      priorScenarioID: 0,
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
      revenueMilestones: [
        {
          id: 1000,
          name: "Upfront Payment",
          dateEarned: 2018.0,
          amount: 100000
        }
      ],
      // TODO: Add the Program ID to the array associated with the appropriate program
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
          },
          {
            period: 2019.0,
            amount: 100
          },
          {
            period: 2019.25,
            amount: 100
          },
          {
            period: 2019.5,
            amount: 100
          },
          {
            period: 2019.75,
            amount: 100
          },
          {
            period: 2020.0,
            amount: 100
          },
          {
            period: 2020.25,
            amount: 100
          },
          {
            period: 2020.5,
            amount: 100
          },
          {
            period: 2020.75,
            amount: 100
          }
        ],
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
          },
          {
            period: 2019.0,
            amount: 100
          },
          {
            period: 2019.25,
            amount: 100
          },
          {
            period: 2019.5,
            amount: 100
          },
          {
            period: 2019.75,
            amount: 100
          },
          {
            period: 2020.0,
            amount: 100
          },
          {
            period: 2020.25,
            amount: 100
          },
          {
            period: 2020.5,
            amount: 100
          },
          {
            period: 2020.75,
            amount: 100
          }
        ]
      ],
     headcountEffort: [
       [
          {
            period: 2018.0,
            amount: 2
          },
          {
            period: 2018.25,
            amount: 2
          },
          {
            period: 2018.5,
            amount: 2
          },
          {
            period: 2018.75,
            amount: 2
          },
          {
            period: 2019.0,
            amount: 2
          },
          {
            period: 2019.25,
            amount: 2
          },
          {
            period: 2019.5,
            amount: 2
          },
          {
            period: 2019.75,
            amount: 2
          },
          {
            period: 2020.0,
            amount: 2
          },
          {
            period: 2020.25,
            amount: 2
          },
          {
            period: 2020.5,
            amount: 2
          },
          {
            period: 2020.75,
            amount: 2
          }
        ],
        [
          {
            period: 2018.0,
            amount: 2
          },
          {
            period: 2018.25,
            amount: 2
          },
          {
            period: 2018.5,
            amount: 2
          },
          {
            period: 2018.75,
            amount: 2
          },
          {
            period: 2019.0,
            amount: 2
          },
          {
            period: 2019.25,
            amount: 2
          },
          {
            period: 2019.5,
            amount: 2
          },
          {
            period: 2019.75,
            amount: 2
          },
          {
            period: 2020.0,
            amount: 2
          },
          {
            period: 2020.25,
            amount: 2
          },
          {
            period: 2020.5,
            amount: 2
          },
          {
            period: 2020.75,
            amount: 2
          }
        ]
      ],
    }
  ]
}

// Utility Components

export function displayArray(displaySelections) {
  let displayArray = [];

  displaySelections.forEach((yearSelection) => {
    if (yearSelection.type === "Quarterly") {
      for (let qtr = 0; qtr <= .75; qtr += .25) {
        let periodTotal = Object()
        periodTotal.period = yearSelection.year + qtr;
        periodTotal.type = yearSelection.type;
        periodTotal.amount = 0;
        displayArray.push(periodTotal);
      }
    } else if (yearSelection.type === "Annual") {
      let periodTotal = Object()
      periodTotal.period = yearSelection.year;
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
      if (displayPeriod.period === amount.period && displayPeriod.type === "Quarterly") {
        displayPeriod.amount += amount.amount;
      } else if (displayPeriod.period <= amount.period && amount.period < (displayPeriod.period + 1) && displayPeriod.type === "Annual") {
        displayPeriod.amount += amount.amount;
      }
    })
    return displayPeriod;
  })
  return dataRows;
}

export function periodLabels(startYear, yearsOut) {
  let periodLabels = [];
  for (let period = startYear; period < startYear + yearsOut; period += 0.25) {
    if (period % 1 === 0) {
      periodLabels.push("Q1 " + Math.floor(period))
    } else if (period % 1=== 0.25) {
      periodLabels.push("Q2 " + Math.floor(period))
    } else if (period % 1=== 0.5) {
      periodLabels.push("Q3 " + Math.floor(period))
    } else if (period % 1=== 0.75) {
      periodLabels.push("Q4 " + Math.floor(period))
    }
  }
  return periodLabels
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
  for (let period = startYear; period < startYear + yearsOut; period += 0.25) {
    newDataArray.push({period, amount: 0});
  }
  return newDataArray;
}

export function editDataArrayLength(array, startYear, yearsOut) {
  if (array.length < yearsOut * 4) {
    let newPeriods = yearsOut - (array.length / 4);
    let newArray = keepCloning(array);
    for (let x = 0; x < newPeriods; x += .25) {
      newArray.push({period: 0, amount: 0})
    }
    return newArray;
  } else if (array.length > yearsOut * 4) {
    let newArray = keepCloning(array);
    for (let y = startYear + yearsOut; y < startYear + (array.length / 4); y += 0.25) {
      newArray.forEach((period) => {
        if (period.period >= y && y + 1 > period.period) {
          period.amount = 0;
        }
      })
    };
    return newArray;
  } else {
    return array;
  }
}

export function editDataArrayYears(array, startYear) {
  let newArray = array.map((cell, cellIndex) => {
    if (cellIndex === 0) {
      cell.period = startYear
    } else {
      cell.period = startYear + (cellIndex * 0.25);
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
        totalArray = keepCloning(array);
      } else {
        array.forEach((cell, cellIndex) => {
          totalArray[cellIndex].amount += cell.amount
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
  let blankDataArray = addDataArray(startYear, yearsOut);
  blankDataArray.forEach((period, periodIndex) => {
    if (period.period === milestone.dateEarned) {
      period.amount = percentCompleteCum[periodIndex].amount * milestone.amount;
    } else if (period.period > milestone.dateEarned) {
      period.amount = percentComplete[periodIndex].amount * milestone.amount;
    } else {
      period.amount = 0;
    }
  });
  return blankDataArray;
}

export function calculateHeadcountSpend(headcountEffort, programs) {
  let headcountSpend = headcountEffort.map((progEffort, progIndex) => {
    let copiedProgEffort = keepCloning(progEffort);
    copiedProgEffort.forEach((copiedHcEffort) => { 
      copiedHcEffort.amount = rounding(copiedHcEffort.amount * programs[progIndex].fteRate, 100);
    })
    return copiedProgEffort
  })
  return headcountSpend;
}

export function percentCompleteArray(array) {
  let grandTotal = arrayTotal(array);
  let percentComplete = array.map((period, periodIndex) => {
    let periodCopy = keepCloning(period);
    periodCopy.amount = period.amount / grandTotal;
    math.format(periodCopy.amount, {precision: 4});
    return periodCopy;
  });
  return percentComplete;
}

export function dollarCompleteCummArray(totalSpend) {
  let dollarCompleteCummArray = totalSpend.map((period, periodIndex) => {
    let totalSpendThruPeriod = keepCloning(totalSpend).slice(0, periodIndex + 1);
    let cummulativeTotal = arrayTotal(totalSpendThruPeriod);
    let periodCopy = keepCloning(period);
    periodCopy.amount = cummulativeTotal;
    return periodCopy;
  });
  return dollarCompleteCummArray;
}

export function percentCompleteCummArray(dollarCompleteCummArray, grandTotalSpend) { 
  let percentCompleteCummArray = dollarCompleteCummArray.map((period, periodIndex) => {
    let periodCopy = keepCloning(period);
    periodCopy.amount = rounding(period.amount / grandTotalSpend, 1000000);
    return periodCopy;
  });
  return percentCompleteCummArray;
}

export function percentCompleteCummArrayFromData(headcountEffort, externalSpend, programs) {
  let headcountSpend = calculateHeadcountSpend(headcountEffort, programs); 
  let totalProgramSpend = calculateTotalSpendArrays(externalSpend, headcountSpend);
  let totalSpend = calculatePeriodTotal(totalProgramSpend);
  let grandTotalSpend = arrayTotal(totalSpend);
  let dollarCompleteCumm = dollarCompleteCummArray(totalSpend)
  let percentCompleteCumm = percentCompleteCummArray(dollarCompleteCumm, grandTotalSpend);
  return percentCompleteCumm;
}

export function periodAmountCalc(array, currentPeriod, periodType) {
  let periodAmount = 0;
  array.forEach((period) => {
    if (periodType === "QTD" && period.period === currentPeriod) {
      periodAmount += period.amount;
    } else if (periodType === "YTD" && Math.floor(currentPeriod) <= period.period && period.period <= currentPeriod) { 
      periodAmount += period.amount;
    } else if (periodType === "Full Year" && Math.floor(currentPeriod) <= period.period && period.period < Math.ceil(currentPeriod)) {
      periodAmount += period.amount;
    }
  });
  return periodAmount;
}

// TODO: change to bring in headcountEffort and programs rather than headcountSpend
export function calculateTotalSpendArrays(externalSpend, headcountSpend) {
  let totalProgramSpend = externalSpend.map((progSpend, progIndex) => {
    let totalSpend = progSpend.map((extSpend, extSpendIndex) => {
      let copiedExtSpend = keepCloning(extSpend);
      copiedExtSpend.amount = rounding(extSpend.amount + headcountSpend[progIndex][extSpendIndex].amount, 1000);
      return copiedExtSpend;
    })
    return totalSpend;
  });
  return totalProgramSpend;
}

export function calculateCummPercentDiff(programs, startYear, yearsOut, scenarios, currentVersionIndex, priorVersionIndex) {
  if (priorVersionIndex === "Initial Model") {  
    let currentPercentCompleteCumm = percentCompleteCummArrayFromData(scenarios[currentVersionIndex].headcountEffort, scenarios[currentVersionIndex].externalSpend, programs)
    let cummTotalDiff = currentPercentCompleteCumm.map((period, periodIndex) => {
      let newPeriod = keepCloning(period);
      newPeriod.amount = currentPercentCompleteCumm[periodIndex].amount - 0;
      return newPeriod;
    })
    return cummTotalDiff;
  } else {
    let currentPercentCompleteCumm = percentCompleteCummArrayFromData(scenarios[currentVersionIndex].headcountEffort, scenarios[currentVersionIndex].externalSpend, programs)
    let priorPercentCompleteCumm = percentCompleteCummArrayFromData(scenarios[priorVersionIndex].headcountEffort, scenarios[priorVersionIndex].externalSpend, programs)
    let cummTotalDiff = currentPercentCompleteCumm.map((period, periodIndex) => {
      let newPeriod = keepCloning(period);
      newPeriod.amount = currentPercentCompleteCumm[periodIndex].amount - priorPercentCompleteCumm[periodIndex].amount;
      return newPeriod;
    })
    return cummTotalDiff;
  }
}

export function calculatePriorPeriodRevTrueup(cummPercentDiffArray, milestone, currentPeriod, startYear, yearsOut) {
  let priorPeriod = currentPeriod - 0.25;
  let priorRevArray = addDataArray(startYear, yearsOut);
  let priorPeriodCummPercent = 0;
  cummPercentDiffArray.forEach((period) => {
    if (period.period === priorPeriod) {
      priorPeriodCummPercent = period.amount;
    }
  });
  priorRevArray.forEach((period) => {
    if (period.period === currentPeriod) {
      period.amount = priorPeriodCummPercent * milestone.amount;
      return period;
    }
  })
  return priorRevArray;
}
    
export function calculateCurrentPeriodRev(startYear, yearsOut, milestone, percentCompleteCumm) {
  let blankDataArray = addDataArray(startYear, yearsOut);
  blankDataArray.map((period, periodIndex) => {
    if (period.period === milestone.dateEarned) {
      return period.amount = percentCompleteCumm[periodIndex].amount * milestone.amount;
    } else if (period.period > milestone.dateEarned) {
      let priorPeriodAmount = 0;
      if (periodIndex - 1 === -1) {
        priorPeriodAmount = 0;
      } else {
        priorPeriodAmount = percentCompleteCumm[periodIndex - 1].amount;
      }
      period.amount = (percentCompleteCumm[periodIndex].amount - priorPeriodAmount) * milestone.amount;
      return period;
    } else {
      period.amount = 0;
      return period;
    }
  });
  return blankDataArray;
}

export function calculateModelRevenue(startYear, yearsOut, milestone, scenarios, programs, activeVersionId) {
  let currentVersion = scenarios[activeVersionId];
  let percentCompleteCumm = percentCompleteCummArrayFromData(currentVersion.headcountEffort, currentVersion.externalSpend, programs)
  let initialModelRevenueArray = calculateCurrentPeriodRev(startYear, yearsOut, milestone, percentCompleteCumm)
  let adjModelRevenueArray = initialModelRevenueArray.map((period, periodIndex) => {
    scenarios.forEach((scenario, scenarioIndex) => {
      let priorVersionIndex = calculatePriorVersionIndex(scenarios, scenario.priorScenarioID);
      if (scenario.period=== period.period && priorVersionIndex !== "Initial Model") {
        let curVerCummPercentCompl = periodCummPercentComp(scenario.headcountEffort, scenario.externalSpend, programs, scenario.period);
        let priorVersion = scenarios[priorVersionIndex];
        let priorVerCummPercentCompl = periodCummPercentComp(priorVersion.headcountEffort, priorVersion.externalSpend, programs, priorVersion.period)
        let milestoneAmount = milestonePeriodRevenue(milestone, scenario.period, curVerCummPercentCompl, priorVerCummPercentCompl)
        return milestoneAmount
      } else if (scenario.period === period.period && priorVersionIndex === "Initial Model") {
        let curVerCummPercentCompl = periodCummPercentComp(scenario.headcountEffort, scenario.externalSpend, programs, scenario.period);
        let milestoneAmount = milestonePeriodRevenue(milestone, scenario.period, curVerCummPercentCompl)
        return milestoneAmount
      }
      return period;
    })
    return period;
  })
  return adjModelRevenueArray;
}

export function setYearsOut(startYear, yearsOut) {
  return (prevState, props) => {

    let extSpend = prevState.externalSpend;
    let hcSpend = prevState.headcountEffort;
    
    let scenarios = prevState.scenarios;
    let newScenarios = scenarios.map((scenario, scenarioIndex) => {
      let newScenario = keepCloning(scenario);
      let displaySelections = []; 
      for (let x = 0; x < yearsOut; x++) {
        let currentYear = startYear + x;
        displaySelections.push(
          {
            year: currentYear,
            type: "Annual"
          }
        );
      }
      newScenario.displaySelections = displaySelections;

      let newExtSpend = newScenario.externalSpend.map((array) => {
        let arrayLength = editDataArrayLength(array, startYear, yearsOut);
        return editDataArrayYears(arrayLength, startYear, yearsOut);
      })

      let newHCEffort = newScenario.headcountEffort.map((array) => {
        let arrayLength = editDataArrayLength(array, startYear, yearsOut);
        return editDataArrayYears(arrayLength, startYear, yearsOut);
      })
      newScenario.externalSpend = newExtSpend;
      newScenario.headcountEffort = newHCEffort;
      return newScenario;
    })

    return {
      yearsOut: yearsOut,
      scenarios: newScenarios
    }
  }
}

export function calculatePriorVersionIndex(scenarios, priorScenarioID) {
  let priorVersionIndex = 0;
  scenarios.forEach((scenario, scenarioIndex) => {
    if (priorScenarioID === 0) {
      return priorVersionIndex = "Initial Model";
    } else if (priorScenarioID === scenario.scenarioID) {
      return priorVersionIndex = scenarioIndex;
    }
  })
  return priorVersionIndex;
}

export function periodCummPercentComp(headcountEffort, externalSpend, programs, currentPeriod) {
  let cummPercentComplArray = percentCompleteCummArrayFromData(headcountEffort, externalSpend, programs);
  let cummPercentCompl = cummPercentComplArray.filter(curVerPeriod => curVerPeriod.period === currentPeriod);
  let cummPercentComplete = cummPercentCompl[0].amount;
  return cummPercentComplete;
}

export function milestoneDateCheck(milestone, period) {
  let milestoneEarnedQtr = Number(milestone.dateEarned.slice(1, 2));
  let milestoneEarnedYear = Number(milestone.dateEarned.slice(3));
  let milestoneAmount = 0;
  if (milestoneEarnedQtr <= period.quarter && milestoneEarnedYear === period.year || milestoneEarnedYear < period.year) {
    milestoneAmount = milestone.amount;
  };
  return milestoneAmount;
}

export function milestonePeriodRevenue(milestone, scenarioPeriod, period, curVerCummPercentCompl, priorVerCummPercentCompl) {
  let milestoneAmount = 0;
  if (scenarioPeriod === milestone.dateEarned) {
    milestoneAmount = curVerCummPercentCompl * milestone.amount;
  } else if (scenarioPeriod >= milestone.dateEarned) {
    milestoneAmount = (curVerCummPercentCompl - priorVerCummPercentCompl) * milestone.amount;
  }
  return milestoneAmount;
}

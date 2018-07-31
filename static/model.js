var math = require('math.js');

// Periods are as follows: Q1 = 2018.0; Q2 = 2019.25; Q3 = 2018.5; Q4 = 2018.75 //

export const displayOptions = ['Annual', 'Quarterly'];
export const periodType = ['QTD', 'YTD', 'Full Year'];

export const defaultState = {
  version: 0,
  modelName: "Example Collaboration 606 Model",
  startYear: 2018,
  endYear: 2020,
  activeVersionID: 0,
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
  versions: [
    {
      versionName: "Q1 2018 close",
      versionPeriod: 2018.0,
      versionID: 1,
      priorVersionID: 0,
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
          {period: 2018.0, amount: 100},
          {period: 2018.25, amount: 100},
          {period: 2018.5, amount: 100},
          {period: 2018.75, amount: 100},
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

export function periodNumberToString(periodNumber) {
  let periodYear = Math.floor(periodNumber);
  let periodString = "";
  if (periodNumber % 1 === 0) {
    periodString = "Q1 " + periodYear;
  } else if (periodNumber % 1 === 0.25) {
    periodString = "Q2 " + periodYear;
  } else if (periodNumber % 1 === 0.5) {
    periodString = "Q3 " + periodYear;
  } else if (periodNumber % 1 === 0.75) {
    periodString = "Q4 " + periodYear;
  }
  return periodString
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

export function priorPeriodTrueup(programs, milestone, currentPeriod, startYear, yearsOut, versions, activeVersionID) {
  let currentVersion = versions[activeVersionID];
  let priorVersionIndex = calculatePriorVersionIndex(versions, currentVersion.priorVersionID);
  let blankArray = addDataArray(startYear, yearsOut);
  if (priorVersionIndex !== "Initial Model") {
    let priorPeriod = currentPeriod - 0.25;
    let priorVersion = versions[priorVersionIndex];
    let priorPrdCurrVerCummPct = periodCummPercentComp(currentVersion.headcountEffort, currentVersion.externalSpend, programs, priorPeriod);
    let priorPrdPriorVerCummPct = periodCummPercentComp(priorVersion.headcountEffort, priorVersion.externalSpend, programs, priorPeriod);
    let priorRevArray = blankArray.map((period) => {
      if (period.period === currentPeriod && milestone.dateEarned <= period.period) {
        period.amount = (priorPrdCurrVerCummPct - priorPrdPriorVerCummPct) * milestone.amount;
      } else {
        period.amount = 0
      }
      return period;
    })
    return priorRevArray;
  } else if (priorVersionIndex === "Initial Model") {
    return blankArray
  }
}

export function calculateCurrentPeriodRev(startYear, yearsOut, milestone, percentCompleteCumm) {
  let curPerRevArray = addDataArray(startYear, yearsOut);
  curPerRevArray.map((period, periodIndex) => {
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
  return curPerRevArray;
}

export function calculateModelRevenue(startYear, yearsOut, milestone, versions, programs, activeVersionID) {
  let currentVersion = versions[activeVersionID];
  let percentCompleteCumm = percentCompleteCummArrayFromData(currentVersion.headcountEffort, currentVersion.externalSpend, programs)
  let initialModelRevenueArray = calculateCurrentPeriodRev(startYear, yearsOut, milestone, percentCompleteCumm)
  let adjModelRevenueArray = initialModelRevenueArray.map((period) => {
    versions.forEach((version) => {
      let priorVersionIndex = calculatePriorVersionIndex(versions, version.priorVersionID);
      if (version.versionPeriod === period.period && priorVersionIndex === "Initial Model" && currentVersion.versionPeriod >= version.versionPeriod) {
        let curVerCummPercentCompl = periodCummPercentComp(version.headcountEffort, version.externalSpend, programs, version.versionPeriod);
        let milestoneAmount = milestonePeriodRevenue(milestone, version.versionPeriod, curVerCummPercentCompl, null, period.period)
        return period.amount = milestoneAmount
      } else if (version.versionPeriod === period.period && priorVersionIndex !== "Initial Model" && currentVersion.versionPeriod >= version.versionPeriod) {
        let curVerCummPercentCompl = periodCummPercentComp(version.headcountEffort, version.externalSpend, programs, version.versionPeriod);
        let priorVersion = versions[priorVersionIndex];
        let priorVerCummPercentCompl = periodCummPercentComp(priorVersion.headcountEffort, priorVersion.externalSpend, programs, priorVersion.versionPeriod)
        let milestoneAmount = milestonePeriodRevenue(milestone, version.versionPeriod, curVerCummPercentCompl, priorVerCummPercentCompl, period.period)
        return period.amount = milestoneAmount
      } else if (priorVersionIndex === "Initial Model") {
        return period.amount
      }
    })
    return period;
  })
  return adjModelRevenueArray;
}

export function currentPeriodRevenue(startYear, yearsOut, milestone, versions, programs, activeVersionID, versionPeriod) {
  let totalMilestoneRevArray = calculateModelRevenue(startYear, yearsOut, milestone, versions, programs, activeVersionID);
  let priorPeriodTrueupArray = priorPeriodTrueup(programs, milestone, versionPeriod, startYear, yearsOut, versions, activeVersionID)
  let blankDataArray = addDataArray(startYear, yearsOut);
  let currentPeriodRevenue = blankDataArray.map((period, periodIndex) => {
    period.amount = totalMilestoneRevArray[periodIndex].amount - priorPeriodTrueupArray[periodIndex].amount;
    return period;
  })
  return currentPeriodRevenue;
}

export function setYearsOut(startYear, yearsOut) {
  return (prevState, props) => {

    let extSpend = prevState.externalSpend;
    let hcSpend = prevState.headcountEffort;
    
    let versions = prevState.versions;
    let newVersions = versions.map((version, versionIndex) => {
      let newVersion = keepCloning(version);
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
      newVersion.displaySelections = displaySelections;

      let newExtSpend = newVersion.externalSpend.map((array) => {
        let arrayLength = editDataArrayLength(array, startYear, yearsOut);
        return editDataArrayYears(arrayLength, startYear, yearsOut);
      })

      let newHCEffort = newVersion.headcountEffort.map((array) => {
        let arrayLength = editDataArrayLength(array, startYear, yearsOut);
        return editDataArrayYears(arrayLength, startYear, yearsOut);
      })
      newVersion.externalSpend = newExtSpend;
      newVersion.headcountEffort = newHCEffort;
      return newVersion;
    })

    return {
      yearsOut: yearsOut,
      versions: newVersions
    }
  }
}

export function calculatePriorVersionIndex(versions, priorVersionID) {
  let priorVersionIndex = 0;
  versions.forEach((version, versionIndex) => {
    if (priorVersionID === 0) {
      return priorVersionIndex = "Initial Model";
    } else if (priorVersionID === version.versionID) {
      return priorVersionIndex = versionIndex;
    }
  })
  return priorVersionIndex;
}

export function periodCummPercentComp(headcountEffort, externalSpend, programs, currentPeriod) {
  let cummPercentComplArray = percentCompleteCummArrayFromData(headcountEffort, externalSpend, programs);
  let cummPercentCompl = cummPercentComplArray.filter(curVerPeriod => curVerPeriod.period === currentPeriod);
  if (cummPercentCompl.length === 0) {
    return 0;
  } else {
    let cummPercentComplete = cummPercentCompl[0].amount;
    return cummPercentComplete;
  }
}

export function milestonePeriodRevenue(milestone, versionPeriod, curVerCummPercentCompl, priorVerCummPercentCompl, period) {
  let milestoneAmount = milestonePeriodCheck(milestone, period)
  let milestoneEarned = 0;
  if (versionPeriod === milestone.dateEarned) {
    milestoneEarned = curVerCummPercentCompl * milestone.amount;
  } else if (versionPeriod > milestone.dateEarned) {
    milestoneEarned = (curVerCummPercentCompl - priorVerCummPercentCompl) * milestone.amount;
  }
  return milestoneEarned;
}

export function milestonePeriodCheck(milestone, period) {
  let milestoneAmount = 0;
  if (period >= milestone.dateEarned) {
    milestoneAmount = milestone.amount;
  }
  return milestoneAmount;
}

export function periodStringToNumber(periodString) {
  let periodQtr = Number(periodString.slice(1, 2)) 
  let periodYear = Number(periodString.slice(3));
  let quarter = 0;
  if (periodQtr === 1) {
    quarter = 0;
  } else if (periodQtr === 2) {
    quarter = 0.25;
  } else if (periodQtr === 3) {
    quarter = 0.5;
  } else if (periodQtr === 4) {
    quarter = 0.75
  };
  let periodNumber = periodYear + quarter;
  return periodNumber;
}

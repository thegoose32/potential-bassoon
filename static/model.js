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
  versions: [
    {
      versionName: "Q1 2018 close",
      versionPeriod: 2018.0,
      versionID: 1,
      priorVersionID: 0,
      displaySelections: [
        {year: 2018, type: "Quarterly"}, 
        {year: 2019, type: "Annual"},
        {year: 2020, type: "Annual"}
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
          {period: 2019.0, amount: 100},
          {period: 2019.25, amount: 100},
          {period: 2019.5, amount: 100},
          {period: 2019.75, amount: 100},
          {period: 2020.0, amount: 100},
          {period: 2020.25, amount: 100},
          {period: 2020.5, amount: 100},
          {period: 2020.75, amount: 100}
        ],
        [
          {period: 2018.0, amount: 100},
          {period: 2018.25, amount: 100},
          {period: 2018.5, amount: 100},
          {period: 2018.75, amount: 100},
          {period: 2019.0, amount: 100},
          {period: 2019.25, amount: 100},
          {period: 2019.5, amount: 100},
          {period: 2019.75, amount: 100},
          {period: 2020.0, amount: 100},
          {period: 2020.25, amount: 100},
          {period: 2020.5, amount: 100},
          {period: 2020.75, amount: 100}
        ]
      ],
      headcountEffort: [
        [
          {period: 2018.0, amount: 2},
          {period: 2018.25, amount: 2},
          {period: 2018.5, amount: 2},
          {period: 2018.75, amount: 2},
          {period: 2019.0, amount: 2},
          {period: 2019.25, amount: 2},
          {period: 2019.5, amount: 2},
          {period: 2019.75, amount: 2},
          {period: 2020.0, amount: 2},
          {period: 2020.25, amount: 2},
          {period: 2020.5, amount: 2},
          {period: 2020.75, amount: 2}
        ],
        [
          {period: 2018.0, amount: 2},
          {period: 2018.25, amount: 2},
          {period: 2018.5, amount: 2},
          {period: 2018.75, amount: 2},
          {period: 2019.0, amount: 2},
          {period: 2019.25, amount: 2},
          {period: 2019.5, amount: 2},
          {period: 2019.75, amount: 2},
          {period: 2020.0, amount: 2},
          {period: 2020.25, amount: 2},
          {period: 2020.5, amount: 2},
          {period: 2020.75, amount: 2}
        ],
      ],
      forecastExpenses: [
        [
          {period: 2018.0, amount: 125100},
          {period: 2018.25, amount: 125100},
          {period: 2018.5, amount: 125100},
          {period: 2018.75, amount: 125100},
          {period: 2019.0, amount: 125100},
          {period: 2019.25, amount: 125100},
          {period: 2019.5, amount: 125100},
          {period: 2019.75, amount: 125100},
          {period: 2020.0, amount: 125100},
          {period: 2020.25, amount: 125100},
          {period: 2020.5, amount: 125100},
          {period: 2020.75, amount: 125100}
        ],
        [
          {period: 2018.0, amount: 125100},
          {period: 2018.25, amount: 125100},
          {period: 2018.5, amount: 125100},
          {period: 2018.75, amount: 125100},
          {period: 2019.0, amount: 125100},
          {period: 2019.25, amount: 125100},
          {period: 2019.5, amount: 125100},
          {period: 2019.75, amount: 125100},
          {period: 2020.0, amount: 125100},
          {period: 2020.25, amount: 125100},
          {period: 2020.5, amount: 125100},
          {period: 2020.75, amount: 125100}
        ],
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
  let newDisplayType = keepCloning(displayType);
  let dataRows = newDisplayType.map((displayPeriod) => {
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
    let qtrFTERate = programs[progIndex].fteRate / 4;
    copiedProgEffort.forEach((copiedHcEffort) => { 
      copiedHcEffort.amount = rounding(copiedHcEffort.amount * qtrFTERate, 100);
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
    } else if (periodType === "Full Year" && Math.floor(currentPeriod) <= period.period && period.period < Math.floor(currentPeriod + 1)) {
      periodAmount += period.amount;
    } else if (periodType === "Since Inception" && period.period <= currentPeriod) {
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
      if (period.period === currentPeriod && milestone.dateEarned < period.period) {
        period.amount = (priorPrdCurrVerCummPct - priorPrdPriorVerCummPct) * milestone.amount;
      } else if (period.period === currentPeriod && milestone.dateEarned === period.period) {
        period.amount = priorPrdCurrVerCummPct * milestone.amount;
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

export function setYearsOut(startYear, yearsOut) {
  return (prevState, props) => {

    let extSpend = prevState.externalSpend;
    let hcSpend = prevState.headcountEffort;
    let fcstExp = prevState.forecastExpenses;
    
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
      
      let newFcstExp = newVersion.forecastExpenses.map((array) => {
        let arrayLength = editDataArrayLength(array, startYear, yearsOut);
        return editDataArrayYears(arrayLength, startYear, yearsOut);
      })

      newVersion.externalSpend = newExtSpend;
      newVersion.headcountEffort = newHCEffort;
      newVersion.forecastExpenses = newFcstExp;
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

export function incurredSpendVariance(versions, activeVersionID, compVersionIndex, curPeriod, selectedCompPeriod, programs, programIndex, periodType) {
  let currentVersion = versions[activeVersionID];
  let curVerHCSpend = calculateHeadcountSpend(currentVersion.headcountEffort, programs);
  let curVerTotalSpend = calculateTotalSpendArrays(currentVersion.externalSpend, curVerHCSpend);
  let curVerPeriodTotalSpend = periodAmountCalc(curVerTotalSpend[programIndex], curPeriod, periodType); 
  let compVersion = versions[compVersionIndex];
  let compVerHCSpend = calculateHeadcountSpend(compVersion.headcountEffort, programs);
  let compVerTotalSpend = calculateTotalSpendArrays(compVersion.externalSpend, compVerHCSpend);
  let compVerPeriodTotalSpend = periodAmountCalc(compVerTotalSpend[programIndex], selectedCompPeriod, periodType);
  let incurredSpendVariance = curVerPeriodTotalSpend - compVerPeriodTotalSpend;
  return incurredSpendVariance;
}

export function totalProgSpend(versions, curVer, programs, programIndex) { 
  let currentVersion = versions[curVer];
  let curVerHCSpend = calculateHeadcountSpend(currentVersion.headcountEffort, programs);
  let curVerTotalProg = arrayTotal(currentVersion.externalSpend[programIndex]) + arrayTotal(curVerHCSpend[programIndex]);
  return curVerTotalProg;
}

export function programWeightedAvg(versions, curVer, programs, programIndex) {
  let currentVersion = versions[curVer];
  let curVerHCSpend = calculateHeadcountSpend(currentVersion.headcountEffort, programs);
  let curVerTotalSpendArray = calculateTotalSpendArrays(currentVersion.externalSpend, curVerHCSpend);
  let curVerTotalSpend = arrayTotal(calculatePeriodTotal(curVerTotalSpendArray));
  let programTotalSpend = arrayTotal(curVerTotalSpendArray[programIndex]);
  let weightedAvg = programTotalSpend / curVerTotalSpend;
  return weightedAvg;
}

export function totalSpendVariance(versions, activeVersionID, compVersionIndex, programs, programIndex) {
  let currentVersion = versions[activeVersionID];
  let curVerTotalSpend = totalProgSpend(versions, activeVersionID, programs, programIndex); 
  let compVerTotalSpend = totalProgSpend(versions, compVersionIndex, programs, programIndex); 
  let totalSpendVariance = curVerTotalSpend - compVerTotalSpend;
  return totalSpendVariance;
}

export function totalVarPercComplete(versions, activeVersionID, compVersionIndex, programs, programIndex, selectedPeriod, selectedPeriodType) {
  let currentVersion = versions[activeVersionID];
  let curVerHCSpend = calculateHeadcountSpend(currentVersion.headcountEffort, programs);
  let curVerTotalSpend = calculateTotalSpendArrays(currentVersion.externalSpend, curVerHCSpend);
  let curVerPrdTotalSpend = periodAmountCalc(curVerTotalSpend[programIndex], selectedPeriod, selectedPeriodType);
  let curVerProgTotalSpend = totalProgSpend(versions, activeVersionID, programs, programIndex);
  let compVerProgTotalSpend = totalProgSpend(versions, compVersionIndex, programs, programIndex);
  let totalVarPercComplete = (curVerPrdTotalSpend / curVerProgTotalSpend) - (curVerPrdTotalSpend / compVerProgTotalSpend);
  return totalVarPercComplete;
}

export function progWtdAvgVariance(versions, activeVersionID, compVersionIndex, programs, programIndex) {
  let curVerProgWtdAvg = programWeightedAvg(versions, activeVersionID, programs, programIndex); 
  let compVerProgWtdAvg = programWeightedAvg(versions, compVersionIndex, programs, programIndex);
  return curVerProgWtdAvg - compVerProgWtdAvg;
}

export function totalMilestones(milestones, selectedPeriod) {
  let totalMilestones = 0;
  milestones.forEach((milestone) => {
    if (milestone.dateEarned <= selectedPeriod) {
      totalMilestones += milestone.amount
    }
  })
  return totalMilestones;
}

export function incurredTotalSpend(versions, curVer, programs, programIndex, selectedPeriod, selectedPeriodType) { 
  let currentVersion = versions[curVer];
  let curVerHCSpend = calculateHeadcountSpend(currentVersion.headcountEffort, programs);
  let incurredHCSpend = periodAmountCalc(curVerHCSpend[programIndex], selectedPeriod, selectedPeriodType)
  let incurredExtSpend = periodAmountCalc(currentVersion.externalSpend[programIndex], selectedPeriod, selectedPeriodType); 
  let incurredTotalSpend = incurredHCSpend + incurredExtSpend;
  return incurredTotalSpend;
}

export function revenueVersionIndexArray(startYear, yearsOut, versions, activeVersionID) {
  let blankDataArray = addDataArray(startYear, yearsOut);
  let revVersionIndexArray = blankDataArray.map((period, periodIndex) => {
    let currentVersions = versions.filter(version => versions.indexOf(version) <= activeVersionID); 
    // to prevent later versions of model from impacting current version // 
    currentVersions.forEach((version, versionIndex) => {
      let priorVersionID = calculatePriorVersionIndex(versions, version.priorVersionID); 
      if (priorVersionID === "Initial Model") {
        period.revVerIndex = versionIndex
      } else if (priorVersionID !== "Initial Model" && period.period >= version.versionPeriod) {
        period.revVerIndex = versionIndex
      }
    })
    return period;
  })
  return revVersionIndexArray;
}

export function calculateCurrentPeriodRev(milestone, blankRevArray, versions, programs) {
  let revArray = blankRevArray.map((period, periodIndex) => {
    let newPeriod = keepCloning(period);
    let periodVersion = versions[newPeriod.revVerIndex];
    let percentCompleteCumm = percentCompleteCummArrayFromData(periodVersion.headcountEffort, periodVersion.externalSpend, programs)
    let milestoneAmount = milestonePeriodCheck(milestone, period);
    if (periodIndex === 0) {
      newPeriod.amount += milestoneAmount * percentCompleteCumm[periodIndex].amount;
    } else if (milestone.dateEarned <= period.period) {
      newPeriod.amount += milestoneAmount * (percentCompleteCumm[periodIndex].amount - percentCompleteCumm[periodIndex - 1].amount)
    }
    return newPeriod;
  });
  return revArray;
}

export function calculatePriorPrdTrueup(milestone, revArray, versions, programs, activeVersionID) {
  let curVersion = versions[activeVersionID];
  let versionPeriod = curVersion.versionPeriod;
  let cummTrueUp = 0;
  let priorPrdTrueUpArray = revArray.map((period, periodIndex) => {
    let newPeriod = keepCloning(period);
    if (milestone.dateEarned === period.period || (versionPeriod >= period.period && versionPeriod >= milestone.dateEarned)) {
      let prevIndex = 0;
      let percentCompl = 0; 
      if (periodIndex - 1 !== -1) {
        let periodVersion = versions[period.revVerIndex];
        let percentCompleteCumm = percentCompleteCummArrayFromData(periodVersion.headcountEffort, periodVersion.externalSpend, programs)
        percentCompl = percentCompleteCumm[periodIndex - 1].amount;
      };
      let milestoneAmount = milestonePeriodCheck(milestone, period);
      let revToDateArray = revArray.filter(revArrayPeriod => revArrayPeriod.period <= period.period - 0.25);
      let revToDate = arrayTotal(revToDateArray);
      newPeriod.amount = (milestoneAmount * percentCompl) - revToDate - cummTrueUp;
      cummTrueUp += newPeriod.amount;
      return newPeriod;
    } else {
      newPeriod.amount = 0;
      return newPeriod; 
    }
  })
  return priorPrdTrueUpArray;
}

export function calculateTotalRevenue(startYear, yearsOut, versions, activeVersionID, revenueMilestones, programs) {
  let blankRevArray = addDataArray(startYear, yearsOut);
  let revVerIndexArray = revenueVersionIndexArray(startYear, yearsOut, versions, activeVersionID);
  revenueMilestones.forEach((milestone) => {
    let currentPeriodRevArray = calculateCurrentPeriodRev(milestone, revVerIndexArray, versions, programs);
    currentPeriodRevArray.forEach((period, periodIndex) => {
      blankRevArray[periodIndex].amount += period.amount;
    })
    let priorPrdTrueUpArray = calculatePriorPrdTrueup(milestone, currentPeriodRevArray, versions, programs, activeVersionID);
    priorPrdTrueUpArray.forEach((period, periodIndex) => {
      blankRevArray[periodIndex].amount += period.amount;
    })
  });
  return blankRevArray;
}

export function milestonePeriodCheck(milestone, period) {
  let milestoneAmount = 0;
  if (milestone.dateEarned <= period.period) {
    milestoneAmount += milestone.amount;
  };
  return milestoneAmount;
}

export function calculateTotalRevenueByMilestone(startYear, yearsOut, versions, activeVersionID, milestone, programs) {
  let blankRevArray = addDataArray(startYear, yearsOut);
  let revVerIndexArray = revenueVersionIndexArray(startYear, yearsOut, versions, activeVersionID);
  let currentPeriodRevArray = calculateCurrentPeriodRev(milestone, revVerIndexArray, versions, programs);
  currentPeriodRevArray.forEach((period, periodIndex) => {
    blankRevArray[periodIndex].amount += period.amount;
  })
  let priorPrdTrueUpArray = calculatePriorPrdTrueup(milestone, currentPeriodRevArray, versions, programs, activeVersionID);
  priorPrdTrueUpArray.forEach((period, periodIndex) => {
    blankRevArray[periodIndex].amount += period.amount;
  })
  return blankRevArray;
}

export function calculateFcstRevenue(revenueMilestones, blankRevArray, fcstExpArray, versionPeriod, activeVersionID, revenueThruPeriod) {
  let cummFcstExpArray = keepCloning(fcstExpArray);
  cummFcstExpArray.forEach((period) => {
    let verPeriodIndex = fcstExpArray.map(function(e) { return e.period; }).indexOf(versionPeriod);
    if (period.period < versionPeriod) {
      cummFcstExpArray[verPeriodIndex].amount += period.amount;
    }
    return period;
  });
  let updFcstExpArray = cummFcstExpArray.filter(period => period.period >= versionPeriod);
  let percentComplete = percentCompleteArray(updFcstExpArray)

  let milestoneRevEarned = blankRevArray.map((period) => {
    revenueMilestones.forEach((milestone) => {
      if (milestone.dateEarned <= versionPeriod) {
        period.amount += milestone.amount;
      }
    })
    return period;
  })

  let revArray = blankRevArray.map((period, periodIndex) => {
    let milestoneEarnedPeriod = milestoneRevEarned.filter(milestonePeriod => milestonePeriod.period === period.period);
    let cummFcstExpPeriod = percentComplete.filter(cummFcstPeriod => cummFcstPeriod.period === period.period);
    if (period.period === versionPeriod) {
      period.amount = (milestoneEarnedPeriod[0].amount * cummFcstExpPeriod[0].amount) - revenueThruPeriod;
    } else {
      period.amount = (milestoneEarnedPeriod[0].amount * cummFcstExpPeriod[0].amount);
    }
    return period;
  });
  return revArray;
}




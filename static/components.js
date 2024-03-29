import React from 'react';
import ReactDOM from 'react-dom';
import NumberFormat from 'react-number-format';
import {CSVLink} from 'react-csv';
import NumericInput from 'react-numeric-input';
NumericInput.style = null;

var math = require('math.js');

import {displayOptions, newAmounts, defaultState, displayArray, dataToDisplay, periodLabels,
  yearsArray, addDataArray, editDataArrayLength, editDataArrayYears,
  arrayTotal, calculatePeriodTotal, keepCloning, rounding, incurredSpendVariance, 
  calculateHeadcountSpend, percentCompleteArray, dollarCompleteCummArray,
  percentCompleteCummArray, periodType, periodAmountCalc, calculateTotalSpendArrays,
  priorPeriodTrueup, totalMilestones, progWtdAvgVariance, 
  setYearsOut, calculatePriorVersionIndex, periodStringToNumber, 
  percentCompleteCummArrayFromData, periodNumberToString, milestonePeriodCheck, 
  totalVarPercComplete, totalSpendVariance, programWeightedAvg,
  totalProgSpend, incurredTotalSpend, revenueVersionIndexArray, calculateCurrentPeriodRev, calculatePriorPrdTrueup, calculateTotalRevenue, calculateTotalRevenueByMilestone, calculateFcstRevenue

} from './model'

import styles from './index.scss'

export class PharmaRevRec extends React.Component {
  constructor(props) {
    super(props);
    if (window.LRPModel === null) {
      this.state = defaultState;
    } else {
      this.state = window.LRPModel.data;
    }

    // Header and Sidebar
    this.handleSaveClick = this.handleSaveClick.bind(this);
    
    // Versions
    this.setVersionState = this.setVersionState.bind(this);
    this.addVersion = this.addVersion.bind(this);
    this.deleteVersion = this.deleteVersion.bind(this);
    this.editVersionName = this.editVersionName.bind(this);
    this.setActiveVersionID = this.setActiveVersionID.bind(this);
    this.setPriorVersion = this.setPriorVersion.bind(this);
    this.setVersionPeriod = this.setVersionPeriod.bind(this);

    //Model Setup
    this.setModelName = this.setModelName.bind(this);
    this.setStartYear = this.setStartYear.bind(this);
    this.setEndYear = this.setEndYear.bind(this);
    this.setYearsOut = this.setYearsOut.bind(this);
    this.clearPeriods = this.clearPeriods.bind(this);

    //Years Display
    this.setDisplayType = this.setDisplayType.bind(this);

    //Programs
    this.addProgram = this.addProgram.bind(this);
    this.editProgramName = this.editProgramName.bind(this);
    this.editProgramFTERate = this.editProgramFTERate.bind(this);
    this.deleteProgram = this.deleteProgram.bind(this);

    //Revenue Milestones
    this.addMilestone = this.addMilestone.bind(this);
    this.deleteMilestone = this.deleteMilestone.bind(this);
    this.editMilestoneName = this.editMilestoneName.bind(this);
    this.editMilestoneEarned = this.editMilestoneEarned.bind(this);
    this.editMilestoneAmount = this.editMilestoneAmount.bind(this);

    //External Spend
    this.editExtSpendAmount = this.editExtSpendAmount.bind(this);

    //Headcount Effort
    this.editHeadcountEffort = this.editHeadcountEffort.bind(this);
    
    //Period Analytics
    this.setComparisonModel = this.setComparisonModel.bind(this);

    //Forecast Revenue
    this.editFcstExp = this.editFcstExp.bind(this);
    this.setFcstExpMultiplier = this.setFcstExpMultiplier.bind(this);
  }

  setVersionState(versionChanges) {
    this.setState((prevState, props) => {
      const activeVersionID = prevState.activeVersionID;
      const currentScenario = prevState.versions[activeVersionID];
      let updatedCurrentScenario;
      let updatedAssumptions;
      if (typeof versionChanges === "function") {
        updatedAssumptions = versionChanges(currentScenario, props);
        updatedCurrentScenario = Object.assign({}, currentScenario, updatedAssumptions);
      } else {
        updatedCurrentScenario = Object.assign({}, currentScenario, versionChanges);
      }
      const newState = prevState
      newState.versions[activeVersionID] = updatedCurrentScenario;
      return newState;
    })
  }

  addVersion() {
    this.setState((prevState, props) => {
      let versions = prevState.versions;
      let copiedScenarioIndex = prevState.activeVersionID;
      let copiedScenario = JSON.parse(JSON.stringify(versions[copiedScenarioIndex])); 
      let lastID = versions[versions.length - 1].versionID;
      let lastPeriod = versions[versions.length - 1].versionPeriod;
      copiedScenario.versionID = lastID + 1;
      copiedScenario.versionPeriod = lastPeriod + 0.25;
      copiedScenario.priorVersionID = lastID;
      let newPeriodString = periodNumberToString(copiedScenario.versionPeriod);
      copiedScenario.versionName = newPeriodString + " close";
      versions.push(copiedScenario);
      return {
        versions: versions
      }
    })
  }
  
  deleteVersion(versionIndex) {
    this.setState(function(prevState, props) {
      let versions = prevState.versions;
      versions.splice(versionIndex, 1);
      return {
        versions: versions
      }
    })
  }

  editVersionName(newName, versionIndex) {
    this.setState(function(prevState, props) {
      let versions = prevState.versions;
      let currentScenario = versions[versionIndex];
      currentScenario.versionName = newName;
      return {
        versions: versions
      }
    })
  }
  
  setVersionPeriod(newScenarioPeriod, versionIndex) {
    this.setState(function(prevState, props) {
      let versions = prevState.versions;
      let currentScenario = versions[versionIndex];
      let newPeriod = periodStringToNumber(newScenarioPeriod);
      currentScenario.versionPeriod = newPeriod; 
      let newVersions = versions.map((version, verIndex) => {
        if (verIndex === 0) {
          return version
        } else if (verIndex !== versionIndex) {
          version.versionPeriod = newPeriod + (0.25 * verIndex);
          return version;
        }
      })
      return {
        versions: newVersions
      }
    })
  }

  setActiveVersionID(newScenario) {
    this.setState(function(prevState, props) {
      let versions = prevState.versions;
      let newScenarioIndex = versions.findIndex(x => x.versionName === newScenario);
      return {
        activeVersionID: newScenarioIndex 
      }
    })
  }

  setPriorVersion(priorScenario, versionIndex) {
    this.setState(function(prevState, props) {
      let versions = prevState.versions;
      let newPriorScenarioID = 0;
      versions.forEach((version, versionIndex) => {
        if (priorScenario === version.versionName) {
          return newPriorScenarioID = version.versionID
        }
        return newPriorScenarioID;
      })
      let currentScenario = versions[versionIndex];
      currentScenario.priorVersionID = newPriorScenarioID;
      return {
        versions: versions
      }
    });
  }

  setModelName(name) {
    this.setState({modelName: name});
  }

  setStartYear(startYear) {
    this.setState({startYear: startYear})
  }

  setEndYear(endYear) {
    this.setState({endYear: endYear})
  }

  setYearsOut(startYear, yearsOut) {
    let newYearsOut = Number(yearsOut); 
    this.setState(setYearsOut(startYear, yearsOut))
  }

  clearPeriods(startYear, endYear) {
    this.setState(function(prevState, props) {
      let endYearPeriod = endYear + 1;
      let versions = prevState.versions
      let newVersions = versions.map((version) => {
        let newExtSpend = version.externalSpend.map((progExtSpend) => {
          let newProgExtSpend = progExtSpend.filter(period => period.period >= startYear && endYearPeriod > period.period);
          return newProgExtSpend;
        });
        let newHCEffort = version.headcountEffort.map((progHCEffort) => {
          let newProgHCEffort = progHCEffort.filter(period => period.period >= startYear && endYearPeriod > period.period);
          return newProgHCEffort;
        });
        let newFcstExp = version.forecastExpenses.map((progFcstExp) => {
          let newProgFcstExp = progFcstExp.filter(period => period.period >= startYear && endYearPeriod > period.period);
          return newProgFcstExp;
        });
        version.externalSpend = newExtSpend;
        version.headcountEffort = newHCEffort;
        version.forecastExpenses = newFcstExp;
        return version;
      })
      return {
        versions: newVersions
      }
    })
  }

  setDisplayType(display, displayIndex) {
    this.setVersionState((prevState, props) => {
      let newDisplaySelections = prevState.displaySelections;
      newDisplaySelections[displayIndex].type = display; 
      return {
        displaySelections: newDisplaySelections 
      }
    })
  }

  addProgram() {
    let startYear = this.state.startYear;
    let yearsOut = this.state.endYear - startYear + 1;
 
    this.setState((prevState, props) => {
      let programArray = prevState.programs;
      let oldId = programArray[programArray.length - 1].id;
      let newId = oldId + 1;
      let newProgram = {
        name: "New Program",
        id: newId,
        fteRate: 250000
      }
      programArray.push(newProgram);
      
      let versions = prevState.versions;
      let newScenarios = versions.map((version, versionIndex) => {
        let newScenario = keepCloning(version);
        
        //add external spend array//
        let newExtSpend = newScenario.externalSpend;
        let newExtSpendArray = addDataArray(startYear, yearsOut);
        newExtSpend.push(newExtSpendArray);

        //add headcount effort array//
        let newHcEffort = newScenario.headcountEffort;
        let newHcEffortArray = addDataArray(startYear, yearsOut);
        newHcEffort.push(newHcEffortArray);

        // add forecast expenses array //
        let newFcstExp = newScenario.forecastExpenses;
        let newFcstExpArray = addDataArray(startYear, yearsOut);
        newFcstExp.push(newFcstExpArray);
        
        return newScenario;
      });
        
      return {
        programs: programArray,
        versions: newScenarios
      } 
    })
  }

  deleteProgram(programIndex) {
    this.setState((prevState, props) => {
      let programArray = prevState.programs;
      programArray.splice(programIndex, 1);
      let versions = prevState.versions;
      let newScenarios = versions.map((version, versionIndex) => {
        let newScenario = keepCloning(version);
        let externalSpendArray = newScenario.externalSpend;
        externalSpendArray.splice(programIndex, 1);

        let headcountEffortArray = newScenario.headcountEffort;
        headcountEffortArray.splice(programIndex, 1);

        let fcstExpArray = newScenario.forecastExpenses;
        fcstExpArray.splice(programIndex, 1);

        return newScenario;
      })
        
      return {
        programs: programArray,
        versions: newScenarios
      }
    });
  }
  
  editProgramName(programIndex, programName) {
    this.setState((prevState, props) => {
      let programArray = prevState.programs.slice();
      programArray[programIndex].name = programName;
      return {
        programs: programArray
      }
    });
  }

  editProgramFTERate(programIndex, newAmount) {
    this.setState((prevState, props) => {
      let programArray = this.state.programs.slice();
      programArray[programIndex].fteRate = newAmount;
      return {
        programs: programArray
      }
    })
  }

  addMilestone() {
    this.setVersionState((prevState, props) => {
      let revMilestones = prevState.revenueMilestones;
      let lastId = revMilestones[revMilestones.length - 1].id;
      let newId = lastId + 1;
      let period = prevState.versionPeriod; 
      let newMilestone = {
        id: newId,
        name: "New Milestone",
        dateEarned: period,
        amount: 10000
      };
      revMilestones.push(newMilestone);
      return {
        revenueMilestones: revMilestones
      }
    })
  }

  deleteMilestone(milestoneIndex) {
    this.setVersionState((prevState, props) => {
      let revMilestones = prevState.revenueMilestones;
      revMilestones.splice(milestoneIndex, 1);
      return {
        revenueMilestones: revMilestones
      }
    })
  }

  editMilestoneName(milestoneIndex, newName) {
    this.setVersionState((prevState, props) => {
      let revMilestones = prevState.revenueMilestones.slice();
      revMilestones[milestoneIndex].name = newName;
      return {
        revenueMilestones: revMilestones
      }
    })
  }

  editMilestoneEarned(milestoneIndex, newDate) {
    this.setVersionState((prevState, props) => {
      let revMilestones = prevState.revenueMilestones.slice();
      let newDateNumber =  periodStringToNumber(newDate);
      revMilestones[milestoneIndex].dateEarned = newDateNumber;
      return {
        revenueMilestones: revMilestones
      }
    })
  }

  editMilestoneAmount(milestoneIndex, newAmount) {
    this.setVersionState((prevState, props) => {
      let revMilestones = prevState.revenueMilestones.slice();
      revMilestones[milestoneIndex].amount = Number(newAmount);
      return {
        revenueMilestones: revMilestones
      }
    })
  }

  editExtSpendAmount(displayType, period, newAmount, programIndex) {
    let quarterAmount = 0;
    if (displayType === "Annual") {
      quarterAmount = rounding(newAmount / 4, 100000);
    } 
    this.setVersionState((prevState, props) => {
      let extSpend = keepCloning(prevState.externalSpend);
      let programExtSpend = extSpend[programIndex];
      let newExtSpend = programExtSpend.map((amount) => {
        if (displayType === "Annual" && Math.floor(amount.period) === period) {
          amount.amount = quarterAmount
        } else if (displayType === "Quarterly" && amount.period === period) {
          amount.amount = newAmount;
        }
        return amount;
      })
      return {
        externalSpend: extSpend
      }
    })
  }

  editHeadcountEffort(displayType, period, newAmount, programIndex) {
    this.setVersionState((prevState, props) => {
      let hcEffort = keepCloning(prevState.headcountEffort);
      let programHcEffort = hcEffort[programIndex];
      let newHcEffort = programHcEffort.map((amount) => {
        if (displayType === "Annual" && Math.floor(amount.period) === period) {
          amount.amount = newAmount;
        } else if (displayType === "Quarterly" && amount.period === period) {
          amount.amount = newAmount;
        }
        return amount;
      })
      return {
        headcountEffort: hcEffort
      }
    })
  }

  editFcstExp(displayType, period, newAmount, programIndex) {
    let quarterAmount = 0;
    if (displayType === "Annual") {
      quarterAmount = rounding(newAmount / 4, 100000);
    } 
    this.setVersionState((prevState, props) => {
      let fcstExp = keepCloning(prevState.forecastExpenses);
      let programFcstExp = fcstExp[programIndex];
      let newFcstExp = programFcstExp.map((amount) => {
        if (displayType === "Annual" && Math.floor(amount.period) === period) {
          amount.amount = quarterAmount;
        } else if (displayType === "Quarterly" && amount.period === period) {
          amount.amount = newAmount;
        }
        return amount;
      })
      return {
        forecastExpenses: fcstExp 
      }
    })
  }

  setFcstExpMultiplier(multiplier, programs) {
    this.setVersionState((prevState, props) => {
      let fcstExp = keepCloning(prevState.forecastExpenses);
      let newFcstExp = fcstExp.map((array, progIndex) => { 
        let progExtSpend = prevState.externalSpend;
        let progHCSpend = calculateHeadcountSpend(prevState.headcountEffort, programs);
        let progTotalSpendArray = calculateTotalSpendArrays(progExtSpend, progHCSpend);
        let newArray = array.map((fcstPeriod) => {
          progTotalSpendArray[progIndex].forEach((expPeriod) => {
            if (fcstPeriod.period === expPeriod.period) {
              let multiplierNum = Number(multiplier) /100;
              fcstPeriod.amount = expPeriod.amount * multiplierNum;
            }
          })
          return fcstPeriod;
        })
      return array;
    })
    return {
      forecastExpenses: newFcstExp
    }
  })
}

  setComparisonModel(newModelIndex) {
    let newComparisonModel = newModelIndex;
    this.setVersionState({comparisonModelIndex: newComparisonModel});
  }

  handleSaveClick() {
    const saveErrorMessage = "We were unable to save your changes.  We apologize " +
          "about the inconvenience."
    return fetch('/api/save_lrp_model', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
            data: this.state,
        }),
    })
    .then((response) => {
      if (response.ok) {
        this.setState((prevState) => ({version: prevState.version + 1}))
      } else if (response.status === 409) {
        window.alert("It appears that this model was saved from another computer " +
            "since you last loaded your copy.  Unfortunately, this means we were " +
            "unable to save your changes.");
        return Promise.reject();
      } else {
        window.alert(saveErrorMessage);
        return Promise.reject();
      }
    }, () => {
        window.alert(saveErrorMessage);
        return Promise.reject();
    });
  }

  render() {
    const {
      headcountEffort,
      externalSpend,
      displaySelections,
      revenueMilestones,
      versionPeriod,
      priorVersionID,
      versionID
    } = this.state.versions[this.state.activeVersionID];
 
    const {
      modelName,
      startYear,
      programs,
      versions,
      endYear,
      activeVersionID
    } = this.state;
   
    let yearsOut = endYear - startYear + 1;
    let headcountSpend = calculateHeadcountSpend(headcountEffort, programs); 
    let totalProgramSpend = calculateTotalSpendArrays(externalSpend, headcountSpend);
    let totalSpend = calculatePeriodTotal(totalProgramSpend);
    let grandTotalSpend = arrayTotal(totalSpend);

    let percentComplete = percentCompleteArray(totalSpend);
    let percentTotal = rounding(arrayTotal(percentComplete), 1000000);
    let dollarCompleteCum = dollarCompleteCummArray(totalSpend)
    let percentCompleteCum = percentCompleteCummArray(dollarCompleteCum, grandTotalSpend);

    let versionNames = versions.map((version) => {
      return version.versionName
    })

    let priorVersionIndex = calculatePriorVersionIndex(versions, priorVersionID);

    let csvLabel = [
      {label: 'Item', key: 'label'},
    ];

    periodLabels(startYear, yearsOut).forEach((label, labelIndex) => {
      let labelKey = 'period' + labelIndex;
      csvLabel.push({label: label, key: labelKey});
    });

    let periodRev = calculateTotalRevenue(startYear, yearsOut, versions, activeVersionID, revenueMilestones, programs); 
    let csvData = [{}]; 
    periodRev.forEach((period, periodIndex) => {
      let labelKey = 'period' + periodIndex;
      csvData[0][labelKey] = period.amount
    });
    csvData[0].label = 'Revenue';

    return (
      <div id="grid">
        <HeaderBar
          modelName={this.state.modelName}
          versionName={versions[activeVersionID].versionName}
          handleSaveClick={this.handleSaveClick}
        />
        <SideNavigation
          versions={this.state.versions}
          activeVersionID={this.state.activeVersionID}
          setActiveVersionID={this.setActiveVersionID}
          csvLabel={csvLabel}
          csvData={csvData}
          handleSaveClick={this.handleSaveClick}
        />
        <div id="content">
          <ModelSetup
            modelName={modelName}
            startYear={startYear}
            setModelName={this.setModelName}
            setStartYear={this.setStartYear}
            setYearsOut={this.setYearsOut}
            yearsOut={yearsOut}
            endYear={endYear}
            setEndYear={this.setEndYear}
            clearPeriods={this.clearPeriods}
          />
          <VersionManager
            versions={this.state.versions}
            addVersion={this.addVersion}
            deleteVersion={this.deleteVersion}
            editVersionName={this.editVersionName}
            setActiveVersionID={this.setActiveVersionID}
            activeVersionID={this.state.activeVersionID}
            setVersionPeriod={this.setVersionPeriod}
            startYear={startYear}
            yearsOut={yearsOut}
            setPriorVersion={this.setPriorVersion}
          />
          <YearDisplay
            startYear={startYear}
            yearsOut={yearsOut}
            setDisplayType={this.setDisplayType}
            displaySelections={displaySelections}
          />
          <Programs
            programs={programs}
            addProgram={this.addProgram}
            editProgramName={this.editProgramName}
            editProgramFTERate={this.editProgramFTERate}
            deleteProgram={this.deleteProgram}
          />
          <RevenueMilestones
            addMilestone={this.addMilestone}
            deleteMilestone={this.deleteMilestone}
            editMilestoneName={this.editMilestoneName}
            editMilestoneEarned={this.editMilestoneEarned}
            editMilestonePaid={this.editMilestonePaid}
            editMilestoneAmount={this.editMilestoneAmount}
            startYear={startYear}
            revenueMilestones={revenueMilestones}
            yearsOut={yearsOut}
          />
          <ExternalSpend
            startYear={startYear}
            yearsOut={yearsOut}
            displaySelections={displaySelections}
            programs={programs}
            editExtSpendAmount={this.editExtSpendAmount}
            versions={this.state.versions}
            activeVersionID={this.state.activeVersionID}
          />
          <HeadcountEffort
            startYear={startYear}
            yearsOut={yearsOut}
            displaySelections={displaySelections}
            programs={programs}
            editHeadcountEffort={this.editHeadcountEffort}
            versions={this.state.versions}
            activeVersionID={this.state.activeVersionID}
          />
           <HeadcountSpend
            startYear={startYear}
            yearsOut={yearsOut}
            displaySelections={displaySelections}
            headcountEffort={headcountEffort}
            programs={programs}
            editHeadcountEffort={this.editHeadcountEffort}
          />
          <TotalProgramSpend
            startYear={startYear}
            yearsOut={yearsOut}
            displaySelections={displaySelections}
            externalSpend={externalSpend}
            headcountEffort={headcountEffort}
            programs={programs}
            editHeadcountEffort={this.editHeadcountEffort}
            totalProgramSpend={totalProgramSpend}
            grandTotalSpend={grandTotalSpend}
            dollarCompleteCum={dollarCompleteCum}
            percentCompleteCum={percentCompleteCum}
            percentComplete={percentComplete}
            percentTotal={percentTotal}
            totalSpend={totalSpend}
          />
          <RevenueRecognizedModel
            startYear={startYear}
            yearsOut={yearsOut}
            displaySelections={displaySelections}
            revenueMilestones={revenueMilestones}
            versionPeriod={versionPeriod}
            versions={versions}
            programs={programs}
            versionID={versionID}
            activeVersionID={this.state.activeVersionID}
          /> 
          <DeferredRevenueRoll
            startYear={startYear}
            yearsOut={yearsOut}
            displaySelections={displaySelections}
            revenueMilestones={revenueMilestones}
            programs={programs}
            versions={versions}
            activeVersionID={activeVersionID}
          />
          <MaterialityCalc
            startYear={startYear}
            yearsOut={yearsOut}
            programs={programs}
            versions={versions}
            activeVersionID={activeVersionID}
            revenueMilestones={revenueMilestones}
          />
          <PeriodBridge
            startYear={startYear}
            yearsOut={yearsOut}
            programs={programs}
            versions={versions}
            activeVersionID={activeVersionID}
            versionNames={versionNames}
          />
          <ExpenseAnalytics
            startYear={startYear}
            yearsOut={yearsOut}
            programs={programs}
            totalProgramSpend={totalProgramSpend}
            versions={versions}
            versionNames={versionNames}
            activeVersionID={activeVersionID}
            versionPeriod={versionPeriod}
          /> 
          <RevenueProjections
            startYear={startYear}
            yearsOut={yearsOut}
            versions={versions}
            activeVersionID={activeVersionID}
            programs={programs}
            displaySelections={displaySelections}
            editFcstExp={this.editFcstExp}
            setFcstExpMultiplier={this.setFcstExpMultiplier}
          />
        </div>
      </div>
    )
  }
}

function HeaderBar({modelName, versionName, handleSaveClick}) {
  return(
    <div id="header">
      <h2>pharmaRevRec</h2>
      <h1 className="title">{modelName} - {versionName}</h1>
      <span>
        <SaveButton onClick={(e) => handleSaveClick()} />
        <a href="/logout/">Logout</a>
      </span>
    </div>
  )
}

function SaveButton({onClick}) {
  return (
    <a onClick={onClick}>Save</a>
  )
}

function SideNavigation(props) {
  const {
    versions,
    activeVersionID,
    setActiveVersionID,
    csvData,
    csvLabel,
    handleSaveClick
  } = props;

  let versionNames = versions.map((version) => {
    return(version.versionName);
  })

  let activeScenarioName = versions[activeVersionID].versionName;

  const saveAndDownload = () => {
    handleSaveClick().then(() => {
      document.getElementById('hidden-export-link').click();
    });
  };

  return(
    <div id="sidebar">
      <a href="#Model_Setup">Setup</a>
      <a href="#Versions">Versions</a>
      <a href="#External-Spend">Costs</a>
      <a href="#Revenue-Recognized">Revenues</a>
      <a href="#Period-Bridge">Reports</a>
      <hr></hr>
      <table>
        <tr>
          <td className="a">Active Version</td>
        </tr>
        <tr>
          <td>
            <select
              value={versions[activeVersionID].versionName}
              onChange={(e) => setActiveVersionID(e.target.value)}
            >
              <Dropdown options={versionNames}/>
            </select>
          </td>
        </tr>
      </table>
      <hr></hr>
      <a id="hidden-export-link" style={{display: "none"}} href="/api/get_lrp_model_excel" download="model.xlsx"></a>
      <a href="#" onClick={saveAndDownload}>Save &amp; Export</a>
    </div>
  )
}

class ModelSetup extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      startYear: this.props.startYear,
      endYear: this.props.endYear
    }
    
    this.setLocalStartYear = this.setLocalStartYear.bind(this);
    this.setLocalEndYear = this.setLocalEndYear.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  setLocalStartYear(startYear) {
    let startYearNum = Number(startYear);
    this.setState({startYear: startYearNum});
  }

  setLocalEndYear(endYear) {
    let endYearNum = Number(endYear);
    this.setState({endYear: endYearNum});
  }

  onSubmitClick(event) {
    this.props.setStartYear(this.state.startYear);
    this.props.setEndYear(this.state.endYear);
    this.props.setYearsOut(this.state.startYear, this.state.endYear - this.state.startYear + 1)
    this.props.clearPeriods(this.state.startYear, this.state.endYear);
  }

  render() {
    let modelName = this.props.modelName;
    let startYear = this.props.startYear;
    let setModelName = this.props.setModelName;
    let endYear = this.props.endYear;
    let yearsOut = endYear - startYear + 1;

    let periodSelections = periodLabels(startYear, yearsOut);

    return (
      <section id="Model_Setup">
        <h2>Setup</h2>
        <table>
          <tbody>
            <tr>
              <th>Performance Obligation</th>
              <td className="long">
                <input
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>Start Year</th>
              <td className="long">
                <NumberFormat
                  className="numerical"
                  onValueChange={(values, e) => this.setLocalStartYear(e.target.value)}
                  value={this.state.startYear}
                  thousandSeparator={false}
                  isNumericString={true}
                  allowNegative={false}
                />
              </td>
            </tr>
            <tr>
              <th>End Year</th>
              <td className="long">
                <NumberFormat
                  className="numerical"
                  onValueChange={(values, e) => this.setLocalEndYear(e.target.value)}
                  value={this.state.endYear}
                  thousandSeparator={false}
                  isNumericString={true}
                  allowNegative={false}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={(e) => this.onSubmitClick(e)}
          value="Submit"
        >Submit
        </button>
      </section>
    )
  }
}

function VersionManager(props) { 
  const {
    versions,
    addVersion,
    deleteVersion,
    editVersionName,
    activeVersionID,
    setVersionPeriod,
    startYear,
    yearsOut,
    setPriorVersion,
  } = props;
    
  let periodSelections = periodLabels(startYear, yearsOut);

  let versionRows = versions.map((version, index) => {
    let versionName = version.versionName;
    let versionPeriod = periodNumberToString(version.versionPeriod);
    if (index === 0 || index === activeVersionID) {
      return (
        <React.Fragment>
          <tr>
            <td>
              <input
                value={versionName}
                onChange={(e) => editVersionName(e.target.value, index)}
              />
            </td>
            <td> 
              <select
                value={versionPeriod}
                onChange={(e) => setVersionPeriod(e.target.value, index)}
              >
                <Dropdown options={periodSelections}/>
              </select>
            </td>
            <td></td>
          </tr>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <tr>
            <td>
              <input
                value={versionName}
                onChange={(e) => editVersionName(e.target.value, index)}
              />
            </td>
            <td>{versionPeriod}</td>
            <DeleteItem index={index} removeItem={deleteVersion} />
          </tr>
        </React.Fragment>
      )
    }
  });
  
  return (
    <section id="Versions">
      <h2 title="The version manager is used to track each quarter close model. Amounts are locked for any period before the version period.">Version Manager</h2>
      <table className="actions-column">
        <thead>
          <tr>
            <th>Name</th>
            <th>Version Period</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {versionRows}
        </tbody>
      </table>
      <AddItem addItem={addVersion} label={'Version'}/>
    </section>
  )
}

function YearDisplay(props) {
  const {
    startYear,
    yearsOut,
    setDisplayType,
    displaySelections
  } = props;

  let years = yearsArray(startYear, yearsOut);
  let yearsRow = years.map((year, yearIndex) => {
    return (
      <React.Fragment key={year}>
        <tr>
          <td>{year}</td>
          <td>
            <select
              value={displaySelections[yearIndex].type}
              onChange={(e) => setDisplayType(e.target.value, yearIndex)}
            >
              <Dropdown options={displayOptions}/>
            </select>
          </td>
        </tr>
      </React.Fragment>
    );
  });

  return (
    <section id="Years_Display">
      <h2 title="Change the display type to show data by year or by quarter.">Years Display</h2>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Display</th>
          </tr>
        </thead>
        <tbody>
          {yearsRow}
        </tbody>
      </table>
    </section>
  )
}

function Programs(props) {
  const {
    programs,
    addProgram,
    editProgramName,
    editProgramFTERate,
    deleteProgram
  } = props;

  let programRows = programs.map((program, programIndex) => {
    return (
      <React.Fragment>
        <tr>
          <td>
            <input
              onChange={(e) => editProgramName(programIndex, e.target.value)}
              value={program.name}
            />
          </td>
          <td>
            <NumberFormat
              className="numerical"
              onValueChange={(values, e) => editProgramFTERate(programIndex, values.value)}
              value={program.fteRate}
              thousandSeparator={true}
              isNumericString={true}
            />
          </td>
          <DeleteItem
            removeItem={deleteProgram}
            index={programIndex}
          />
        </tr>
      </React.Fragment>
    )
  })

  return (
    <section id="Programs">
      <h2>Programs under Performance Obligation</h2>
      <table className="actions-column">
        <thead>
          <tr>
            <th>Name</th>
            <th>Annual FTE Rate</th>
            <th></th>
          </tr>
          <tr>
          </tr>
        </thead>
        <tbody>
          {programRows}
        </tbody>
      </table>
      <AddItem addItem={addProgram} label="Program"/>
    </section>
  )
}

function RevenueMilestones(props) {
  const {
    addMilestone,
    deleteMilestone,
    editMilestoneName,
    editMilestoneEarned,
    editMilestonePaid,
    editMilestoneAmount,
    startYear,
    revenueMilestones,
    yearsOut
  } = props;

  let periodSelections = periodLabels(startYear, yearsOut)

  let revenueRows = revenueMilestones.map((milestone, milestoneIndex) => {
    let dateEarnedLabel = periodNumberToString(milestone.dateEarned);
    return (
      <React.Fragment>
        <tr>
          <td>
            <input
              value={milestone.name}
              onChange={(e) => editMilestoneName(milestoneIndex, e.target.value)}
            />
          </td>
          <td>
            <select
              value={dateEarnedLabel}
              onChange={(e) => editMilestoneEarned(milestoneIndex, e.target.value)}
            >
              <Dropdown options={periodSelections}/>
            </select>
          </td>
          <td>
            <NumberFormat
              className="numerical"
              value={milestone.amount}
              onValueChange={(values, e) => editMilestoneAmount(milestoneIndex, values.value)}
              thousandSeparator={true}
              isNumericString={true}
            />
          </td>
          <DeleteItem index={milestoneIndex} removeItem={deleteMilestone} />
        </tr>
      </React.Fragment>
    )
  })

  let totalMilestones = 0;
  revenueMilestones.forEach((milestone) => {totalMilestones += milestone.amount})

  return (
    <section id="Revenue-Milestones">
      <h2>Transaction Price</h2>
      <table className="actions-column">
        <thead>
          <tr>
            <th>Name</th>
            <th>Period Earned</th>
            <th className="numerical">Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {revenueRows}
          <tr className="total">
            <td>Total Transaction Price</td>
            <td></td>
            <td className="numerical">
              <NumberFormat
                displayType="text"
                value={totalMilestones}
                thousandSeparator={true}
              />
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <AddItem addItem={addMilestone} label="Milestone"/>
    </section>
  )
}

function ExternalSpend (props) {
  const {
    startYear,
    yearsOut,
    displaySelections,
    programs,
    editExtSpendAmount,
    versions,
    activeVersionID
  } = props;

  let externalSpend = versions[activeVersionID].externalSpend;
  let versionPeriod = versions[activeVersionID].versionPeriod;
  let externalSpendRow = externalSpend.map((programSpend, programIndex) => {
    let totalProgSpend = arrayTotal(programSpend); 
    return (
      <React.Fragment>
        <tr>
          <td>{programs[programIndex].name}</td>
          <DataRows
            startYear={startYear}
            displaySelections={displaySelections}
            dataArray={programSpend}
            yearsOut={yearsOut}
            editAmount={editExtSpendAmount}
            programIndex={programIndex}
            input="Yes"
            versionPeriod={versionPeriod}
            activeVersionID={activeVersionID}
          />
          <td className="numerical">
            <NumberFormat
              displayType="text"
              value={totalProgSpend}
              thousandSeparator={true}
            />
          </td>
        </tr>
      </React.Fragment>
    )
  });

  let totalExternalSpend = calculatePeriodTotal(externalSpend);
  let grandTotal = arrayTotal(totalExternalSpend);

  return (
    <section id="External-Spend">
      <h2 title="Enter the actual and forecasted external spend to complete the performance obligation">External Spend Inputs</h2>
      <table>
        <thead>
          <tr>
            <th>Program</th>
            <TablePeriodHeaders
              startYear={startYear}
              displaySelections={displaySelections}
            />
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {externalSpendRow}
          <tr className="total">
            <td>Total</td>
            <TotalRows
              displaySelections={displaySelections}
              dataArray={totalExternalSpend}
            />
            <td className="numerical">
              <NumberFormat
                displayType="text"
                value={grandTotal}
                thousandSeparator={true}
              /> 
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}

function HeadcountEffort (props) {
  const {
    startYear,
    yearsOut,
    displaySelections,
    programs,
    editHeadcountEffort,
    versions,
    activeVersionID
  } = props;

  let headcountEffort = versions[activeVersionID].headcountEffort;
  let versionPeriod = versions[activeVersionID].versionPeriod;
  let headcountEffortRow = headcountEffort.map((hcEffort, hcEffortIndex) => {
    let totalHeadcountEffort = arrayTotal(hcEffort); 
    return (
      <React.Fragment>
        <tr>
          <td>{programs[hcEffortIndex].name}</td>
          <HeadcountEffortRow
            startYear={startYear}
            displaySelections={displaySelections}
            dataArray={hcEffort}
            yearsOut={yearsOut}
            programIndex={hcEffortIndex}
            versionPeriod={versionPeriod}
            activeVersionID={activeVersionID}
            editHeadcountEffort={editHeadcountEffort}
          />
          <td className="numerical">
            <NumberFormat
              displayType="text"
              value={rounding(totalHeadcountEffort,100000)}
              thousandSeparator={true}
            /> 
          </td>
        </tr>
      </React.Fragment>
    )
  });

  let totalHeadcountEffort = calculatePeriodTotal(headcountEffort);
  let grandTotal = rounding(arrayTotal(totalHeadcountEffort),100000);

  return (
    <section id="Headcount-Effort">
      <h2 title="Enter the actual and forecasted FTE effort to complete the performance obligation">Headcount Effort Inputs</h2>
      <table>
        <thead>
          <tr>
            <th>Program</th>
            <TablePeriodHeaders
              startYear={startYear}
              displaySelections={displaySelections}
            />
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {headcountEffortRow}
          <tr className="total">
            <td>Total</td>
            <CummulativeTotalRows
              displaySelections={displaySelections}
              dataArray={totalHeadcountEffort}
            />
            <td className="numerical">
              <NumberFormat
                displayType="text"
                value={grandTotal}
                thousandSeparator={true}
              /> 
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}

function HeadcountEffortRow(props) {
  const {
    startYear,
    displaySelections,
    dataArray,
    yearsOut,
    programIndex,
    versionPeriod,
    editHeadcountEffort,
    activeVersionID
  } = props;
 
  let years = yearsArray(startYear, yearsOut)
  let displayType = displayArray(displaySelections);
  let calculatedData =  displayType.map((displayPeriod) => {
    dataArray.forEach((amount, amountIndex) => {
      if (displayPeriod.period === amount.period && displayPeriod.type === "Quarterly") {
        displayPeriod.amount += amount.amount;
      } else if (displayPeriod.period <= amount.period && amount.period < (displayPeriod.period + 1) && displayPeriod.type === "Annual") {
        displayPeriod.amount += (amount.amount / 4);
      }
    })
    return displayPeriod;
  })
  let dataCells = calculatedData.map((cell, cellIndex) => {
    if (cell.period >= versionPeriod || activeVersionID === 0) {
      return(
        <React.Fragment>
          <td>
            <NumericInput
              value={cell.amount}
              className="numerical"
              onChange={(e) => editHeadcountEffort(cell.type, cell.period, Number(e), programIndex)}
              precision={5}
              min={0}
              inputmode="numeric"
            snap/>
          </td>
        </React.Fragment>
      )
    } else {
      return(
        <React.Fragment>
          <td className="numerical">
            <NumberFormat
              displayType="text"
              value={cell.amount}
              thousandSeparator={true}
              isNumericString={true}
            /> 
          </td>
        </React.Fragment>
      )
    }
  })
  return dataCells;
}



function HeadcountSpend (props) {
  const {
    startYear,
    yearsOut,
    displaySelections,
    headcountEffort,
    programs,
    editHeadcountEffort
  } = props;

  let headcountEffortSpend = calculateHeadcountSpend(headcountEffort, programs);
  let headcountEffortRow = headcountEffortSpend.map((hcEffort, hcEffortIndex) => {
    let totalHeadcountEffort = arrayTotal(hcEffort); 
    return (
      <React.Fragment>
        <tr>
          <td>{programs[hcEffortIndex].name}</td>
          <td className="numerical">
            <NumberFormat
              displayType="text"
              value={programs[hcEffortIndex].fteRate}
              thousandSeparator={true}
            />
          </td>
          <DataRows
            startYear={startYear}
            displaySelections={displaySelections}
            dataArray={hcEffort}
            yearsOut={yearsOut}
            input="No"
          />
          <td className="numerical">
            <NumberFormat
              displayType="text"
              value={totalHeadcountEffort}
              thousandSeparator={true}
            /> 
          </td>
        </tr>
      </React.Fragment>
    )
  });

  let totalHeadcountSpend = calculatePeriodTotal(headcountEffortSpend);
  let grandTotal = arrayTotal(totalHeadcountSpend);

  return (
    <section id="Headcount-Spend">
      <h2 title="Displays the FTE cost to complete the performance obligation. Calculated based on FTE rate times the FTE effort." >Headcount Spend</h2>
      <table>
        <thead>
          <tr>
            <th>Program</th>
            <th className="numerical"> Annual FTE Rate</th>
            <TablePeriodHeaders
              startYear={startYear}
              displaySelections={displaySelections}
            />
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {headcountEffortRow}
          <tr className="total">
            <td>Total</td>
            <td></td>
            <TotalRows
              displaySelections={displaySelections}
              dataArray={totalHeadcountSpend}
            />
            <td className="numerical">
              <NumberFormat
                displayType="text"
                value={grandTotal}
                thousandSeparator={true}
              /> 
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}

function TotalProgramSpend (props) {
  const {
    startYear,
    yearsOut,
    displaySelections,
    externalSpend,
    headcountEffort,
    programs,
    editHeadcountEffort,
    totalProgramSpend,
    grandTotalSpend,
    dollarCompleteCum,
    percentCompleteCum,
    percentComplete,
    percentTotal,
    totalSpend
  } = props;

  let totalProgRow = totalProgramSpend.map((totalProg, progIndex) => {
    let totalProgramSpend = arrayTotal(totalProg); 
    return (
      <React.Fragment>
        <tr>
          <td>{programs[progIndex].name}</td>
          <DataRows
            startYear={startYear}
            displaySelections={displaySelections}
            dataArray={totalProg}
            yearsOut={yearsOut}
            input="No"
          />
          <td className="numerical">
            <NumberFormat
              displayType="text"
              value={totalProgramSpend}
              thousandSeparator={true}
            /> 
          </td>
        </tr>
      </React.Fragment>
    )
  });

  return (
    <section id="Total-Program-Spend">
      <h2>Total Program Spend</h2>
      <table>
        <thead>
          <tr>
            <th>Program</th>
            <TablePeriodHeaders
              startYear={startYear}
              displaySelections={displaySelections}
            />
            <th className="numerical">Total Program Spend</th>
          </tr>
        </thead>
        <tbody>
          {totalProgRow}
          <tr className="total">
            <td>Total development costs ($)</td>
            <TotalRows
              displaySelections={displaySelections}
              dataArray={totalSpend}
            />
            <td className="numerical">
              <NumberFormat
                displayType="text"
                value={grandTotalSpend}
                thousandSeparator={true}
              /> 
            </td>
          </tr>
          <tr className="total">
            <td>Total development costs (%)</td>
            <DataRows
              startYear={startYear}
              displaySelections={displaySelections}
              dataArray={percentComplete}
              yearsOut={yearsOut}
              input="No"
              suffix="%"
            />
            <td className="numerical">
              <NumberFormat
                displayType="text"
                value={percentTotal*100}
                thousandSeparator={true}
                suffix="%"
              /> 
            </td>
          </tr>
          <tr className="total">
            <td>Running total development costs ($)</td>
            <CummulativeDataRows
              startYear={startYear}
              displaySelections={displaySelections}
              dataArray={dollarCompleteCum}
              yearsOut={yearsOut}
              input="No"
            />
            <td></td>
          </tr>
          <tr className="total">
            <td>Running total development costs (%)</td>
            <CummulativeDataRows
              startYear={startYear}
              displaySelections={displaySelections}
              dataArray={percentCompleteCum}
              yearsOut={yearsOut}
              input="No"
              suffix="%"
            />
            <td></td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}

class RevenueRecognizedModel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      priorTrueUpDisplay: "No"
    }

    this.setPriorTrueUpDisplay = this.setPriorTrueUpDisplay;
  }

  setPriorTrueUpDisplay() {
    this.setState(function(prevState, props) {
      let currentDisplaySetting = prevState.priorTrueUpDisplay;
      let newTrueUpDisplay = "Yes";
      if (currentDisplaySetting === "No") {
        newTrueUpDisplay = "Yes";
      } else if (currentDisplaySetting === "Yes") {
        newTrueUpDisplay = "No"
      }
      return {
        priorTrueUpDisplay: newTrueUpDisplay
      }
    })
  }

  render() {
    let startYear = this.props.startYear;
    let yearsOut = this.props.yearsOut;
    let displaySelections = this.props.displaySelections;
    let revenueMilestones = this.props.revenueMilestones;
    let versionPeriod = this.props.versionPeriod;
    let versions = this.props.versions;
    let programs = this.props.programs;
    let versionID = this.props.versionID;
    let activeVersionID = this.props.activeVersionID;
 
    let milestoneRows = revenueMilestones.map((milestone, milestoneIndex) => {
      let revVerIndexArray = revenueVersionIndexArray(startYear, yearsOut, versions, activeVersionID);
      let currentPeriodRev = calculateCurrentPeriodRev(milestone, revVerIndexArray, versions, programs); 
      let priorPeriodRevTrueup = calculatePriorPrdTrueup(milestone, currentPeriodRev, versions, programs, activeVersionID);
      let totalCurrentPeriodRev = arrayTotal(currentPeriodRev);
      let totalPriorPeriodRevTrueup = arrayTotal(priorPeriodRevTrueup);

      let totalRevenueMilestoneArray = calculateTotalRevenueByMilestone(startYear, yearsOut, versions, activeVersionID, milestone, programs)
      let totalRevenueMilestone = arrayTotal(totalRevenueMilestoneArray);

      if (this.state.priorTrueUpDisplay === "Yes") {
        return (
          <React.Fragment>
            <tr>
              <td>{milestone.name} - Current Revenue</td>
              <DataRows
                startYear={startYear}
                displaySelections={displaySelections}
                dataArray={currentPeriodRev}
                yearsOut={yearsOut}
                input="No"
              />
              <td className="numerical">
                <NumberFormat
                  displayType="text"
                  value={rounding(totalCurrentPeriodRev,1)}
                  thousandSeparator={true}
                /> 
              </td>
            </tr>
            <tr>
              <td>{milestone.name} - Prior Period True Up</td>
              <DataRows
                startYear={startYear}
                displaySelections={displaySelections}
                dataArray={priorPeriodRevTrueup}
                yearsOut={yearsOut}
                input="No"
              />
              <td className="numerical">
                <NumberFormat
                  displayType="text"
                  value={rounding(totalPriorPeriodRevTrueup,1)}
                  thousandSeparator={true}
                /> 
              </td>
            </tr>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <tr>
              <td>{milestone.name} - Current Revenue</td>
              <DataRows
                startYear={startYear}
                displaySelections={displaySelections}
                dataArray={totalRevenueMilestoneArray}
                yearsOut={yearsOut}
                input="No"
              />
              <td className="numerical">
                <NumberFormat
                  displayType="text"
                  value={rounding(totalRevenueMilestone,1)}
                  thousandSeparator={true}
                /> 
              </td>
            </tr>
          </React.Fragment>
        )
      }
    })

    let totalRevenueArray = calculateTotalRevenue(startYear, yearsOut, versions, activeVersionID, revenueMilestones, programs);
    let grandTotalRevenue = arrayTotal(totalRevenueArray);

    let currentPeriodRev = periodAmountCalc(totalRevenueArray, versionPeriod, "QTD") 
    let currentYTDPeriodRev = periodAmountCalc(totalRevenueArray, versionPeriod, "YTD")
    let versionPeriodLabel = periodNumberToString(versionPeriod);

    return (
      <section id="Revenue-Recognized">
        <h2>Revenue Recognized</h2>
        <table>
          <thead>
            <tr>
              <th>Milestone</th>
              <TablePeriodHeaders
                startYear={startYear}
                displaySelections={displaySelections}
              />
              <th className="numerical">Total Milestone Revenue</th>
            </tr>
          </thead>
          <tbody>
            {milestoneRows}
            <tr className="total">
              <td>Total QTD Revenue</td>
              <TotalRows
                displaySelections={displaySelections}
                dataArray={totalRevenueArray}
              />
              <td className="numerical">
                <NumberFormat
                  displayType="text"
                  value={rounding(grandTotalRevenue,1)}
                  thousandSeparator={true}
                /> 
              </td>
            </tr>
          </tbody>
        </table>
        <br></br>
        <table>
          <tbody>
            <tr className="total">
              <th>{versionPeriodLabel} QTD revenue</th>
              <th className="numerical">
                <NumberFormat
                  displayType="text"
                  value={rounding(currentPeriodRev,1)}
                  thousandSeparator={true}
                />
              </th>
            </tr>
            <tr className="total">
              <th>{versionPeriodLabel} YTD revenue</th>
              <th className="numerical">
                <NumberFormat
                  displayType="text"
                  value={rounding(currentYTDPeriodRev,1)}
                  thousandSeparator={true}
                />
              </th>
            </tr>
            <tr>
              <th>Display prior period adjustment</th>
              <th>
                <button onClick= {(e) => {this.setPriorTrueUpDisplay()}}>
                  {this.state.priorTrueUpDisplay}
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </section>
    )
  }
}

function DeferredRevenueRoll (props) {
  const {
    startYear,
    yearsOut,
    displaySelections,
    revenueMilestones,
    versions,
    programs,
    activeVersionID
  } = props;

  let versionPeriod = versions[activeVersionID].versionPeriod;
  let totalRevenueEarned = calculateTotalRevenue(startYear, yearsOut, versions, activeVersionID, revenueMilestones, programs); 

  let milestoneReceived = addDataArray(startYear, yearsOut);
  milestoneReceived.map((period, periodIndex) => {
    revenueMilestones.forEach((milestone) => {
      if (period.period === milestone.dateEarned) {
        period.amount += milestone.amount
      }
    })
    return revenueMilestones;
  });

  let deferredRevEndBalance = addDataArray(startYear, yearsOut);
  deferredRevEndBalance.map((period, periodIndex) => {
    let begBalance = 0;
    if (periodIndex > 0) {
      begBalance = keepCloning(deferredRevEndBalance[periodIndex - 1].amount);
    };
    let inflows = milestoneReceived[periodIndex].amount;
    let outflows = totalRevenueEarned[periodIndex].amount;
    period.amount = begBalance + inflows - outflows; 
    return period;
  });


  let deferredRevenueBegBalance = addDataArray(startYear, yearsOut);
  deferredRevenueBegBalance.map((period, periodIndex) => {
    let begBalance = 0;
    if (periodIndex > 0) {
      begBalance = keepCloning(deferredRevEndBalance[periodIndex - 1].amount);
    } else {
      begBalance = Number(0);
    };
    period.amount = begBalance;
  })

  let defRevSTBalance = addDataArray(startYear, yearsOut);
  defRevSTBalance.map((period, periodIndex) => {
    let STBalance = 0;
    totalRevenueEarned.forEach((revPeriod, revPeriodIndex) => {
      if (periodIndex < revPeriodIndex && revPeriodIndex < periodIndex + 4) {
        STBalance += revPeriod.amount;
      }
    });
    period.amount = STBalance;
  });

  let defRevLTBalance = addDataArray(startYear, yearsOut);
  defRevLTBalance.map((period, periodIndex) => {
    period.amount = deferredRevEndBalance[periodIndex].amount - defRevSTBalance[periodIndex].amount;
  });

  return (
    <section id="Deferred-Revenue-Rollforward">
      <h2>Deferred Revenue Rollforward</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <TablePeriodHeaders
              startYear={startYear}
              displaySelections={displaySelections}
            />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Beg Balance</td>
            <CummulativeTotalRows
              displaySelections={displaySelections}
              dataArray={deferredRevenueBegBalance}
              startOrEnd="start"
              versionPeriod={versionPeriod}
            />
          </tr>
          <tr>
            <td>Additions</td>
            <TotalRows
              displaySelections={displaySelections}
              dataArray={milestoneReceived}
            />
          </tr>
          <tr>
            <td>Amortization</td>
            <TotalRows
              displaySelections={displaySelections}
              dataArray={totalRevenueEarned}
            />
          </tr>
          <tr className="total">
            <td>End Balance</td>
            <CummulativeTotalRows
              displaySelections={displaySelections}
              dataArray={deferredRevEndBalance}
              startOrEnd="end"
              versionPeriod={versionPeriod}
            />
          </tr>
          <tr className="total">
            <td>ST Balance</td>
            <CummulativeTotalRows
              displaySelections={displaySelections}
              dataArray={defRevSTBalance}
              startOrEnd="end"
              versionPeriod={versionPeriod}
            />
          </tr>
          <tr className="total">
            <td>LT Balance</td>
            <CummulativeTotalRows
              displaySelections={displaySelections}
              dataArray={defRevLTBalance}
              startOrEnd="end"
              versionPeriod={versionPeriod}
            />
          </tr>

        </tbody>
      </table>
    </section>
  )
}

class MaterialityCalc extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      materialityAmnt: 0,
      materialityTotal: 0,
      materialityProg: 0,
      materialityTotalProg: 0
    }

    this.setMaterialityAmnt = this.setMaterialityAmnt.bind(this);
    this.setMaterialityTotal = this.setMaterialityTotal.bind(this);
  }
 
  setMaterialityAmnt(newAmount) {
    let newMaterialityAmnt = Number(newAmount);
    this.setState({materialityAmnt: newMaterialityAmnt})
  }
 
  setMaterialityTotal(newAmount) {
    let newMaterialityTotal = Number(newAmount);
    this.setState({materialityTotal: newMaterialityTotal})
  }

  setMaterialityProg(newProg) {
    let newProgIndex = this.props.programs.findIndex(x => x.name === newProg);
    this.setState({materialityProg: newProgIndex})
  }

  setMaterialityTotalProg(newProg) {
    let newProgIndex = this.props.programs.findIndex(x => x.name === newProg);
    this.setState({materialityTotalProg: newProgIndex})
  }

  render() {
    let programs = this.props.programs;
    let startYear = this.props.startYear;
    let yearsOut = this.props.yearsOut;
    let versions = this.props.versions;
    let activeVersionID = this.props.activeVersionID;
    let revenueMilestones = this.props.revenueMilestones;

    let programNames = programs.map((prog) => {
      return prog.name
    })

    let verCopyActExp = keepCloning(versions);
    let curVerActExpCopy = verCopyActExp[activeVersionID];
    let currentPeriodIndex = curVerActExpCopy.externalSpend[0].findIndex(x => x.period === curVerActExpCopy.versionPeriod);
    let originalActualExp = versions[activeVersionID].externalSpend[this.state.materialityProg][currentPeriodIndex].amount;
    curVerActExpCopy.externalSpend[this.state.materialityProg][currentPeriodIndex].amount = originalActualExp + this.state.materialityAmnt;

    let actualRevenue = calculateTotalRevenue(startYear, yearsOut, versions, activeVersionID, revenueMilestones, programs) 
    let adjActExpRevenue = calculateTotalRevenue(startYear, yearsOut, verCopyActExp, activeVersionID, revenueMilestones, programs); 
    let revDiffActExp = adjActExpRevenue[currentPeriodIndex].amount - actualRevenue[currentPeriodIndex].amount; 

    let verCopyBdgtExp = keepCloning(versions);
    let curVerBdgtExpCopy = verCopyBdgtExp[activeVersionID];
    //TODO need to chnage below bug for check if period is last period in array//
    let lastPeriodIndex = currentPeriodIndex + 1;
    let originalBdgtExp = versions[activeVersionID].externalSpend[this.state.materialityTotalProg][lastPeriodIndex].amount;
    curVerBdgtExpCopy.externalSpend[this.state.materialityTotalProg][lastPeriodIndex].amount = originalBdgtExp + this.state.materialityTotal;
    
    let adjBdgtExpRevenue = calculateTotalRevenue(startYear, yearsOut, verCopyBdgtExp, activeVersionID, revenueMilestones, programs); 
    let revDiffBdgtExp = adjBdgtExpRevenue[currentPeriodIndex].amount - actualRevenue[currentPeriodIndex].amount; 

    return (
      <section id="Materiality-Calculation">
        <h2>Materiality Calculator</h2>
        <table>
          <thead>
            <tr>
              <th>Actual Expenses</th>
              <th>Selection</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Program</td>
              <td>
                <select
                  value={programs[this.state.materialityProg].name}
                  onChange={(e) => this.setMaterialityProg(e.target.value)}
                >
                  <Dropdown options={programNames}/>
                </select>
              </td>
            </tr>
            <tr>
              <td>Actual Expense Change</td>
              <td>
                <NumberFormat
                  value={this.state.materialityAmnt}
                  className="numerical"
                  onValueChange={(values, e) => this.setMaterialityAmnt(Number(values.value))}
                  thousandSeparator={true}
                />
              </td>
            </tr>
            <tr>
              <td>Revenue impact</td>
              <td className="numerical">
                <NumberFormat
                  displayType="text"
                  value={rounding(revDiffActExp,1)}
                  thousandSeparator={true}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br></br>
        <table>
          <thead>
            <tr>
              <th>Budgeted Expenses</th>
              <th>Selection</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Program</td>
              <td>
                <select
                  value={programs[this.state.materialityProg].name}
                  onChange={(e) => this.setMaterialityTotalProg(e.target.value)}
                >
                  <Dropdown options={programNames}/>
                </select>
              </td>
            </tr>
            <tr>
              <td>Budgeted Expense Change</td>
              <td>
                <NumberFormat
                  value={this.state.materialityTotal}
                  className="numerical"
                  onValueChange={(values, e) => this.setMaterialityTotal(Number(values.value))}
                  thousandSeparator={true}
                />
              </td>
            </tr>
            <tr>
              <td>Revenue impact</td>
              <td className="numerical">
                <NumberFormat
                  displayType="text"
                  value={rounding(revDiffBdgtExp,1)}
                  thousandSeparator={true}
                />
              </td>
            </tr>

          </tbody>
        </table>
      </section>
    )
  }
}

class PeriodBridge extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCompPeriod: 2018,
      selectedComparisonIndex: 0,
      selectedPeriodType: "QTD"
    }

    this.setSelectedPeriod = this.setSelectedPeriod.bind(this);
    this.setSelectedComparisonIndex = this.setSelectedComparisonIndex.bind(this);
    this.setSelectedPeriodType = this.setSelectedPeriodType.bind(this);
  }

  setSelectedPeriod(newPeriod) {
    let newSelectedPeriod = periodStringToNumber(newPeriod);
    this.setState({selectedCompPeriod: newSelectedPeriod});
  }

  setSelectedComparisonIndex(newComparison) {
    let versions = this.props.versions;
    let newIndex = 0;
    versions.forEach((version, versionIndex) => {
      if (version.versionName === newComparison) {
        newIndex = versionIndex
        return newIndex;
      }
    });
    this.setState({selectedComparisonIndex: newIndex});
  }

  setSelectedPeriodType(newType) {
    let newSelectedPeriodType = newType;
    this.setState({selectedPeriodType: newSelectedPeriodType})
  }

  render() {
    let programs = this.props.programs;
    let startYear = this.props.startYear;
    let yearsOut = this.props.yearsOut;
    let selectedCompPeriod = this.state.selectedCompPeriod;
    let periodSelections = periodLabels(startYear, yearsOut)
    let versions = this.props.versions;
    let activeVersionID = this.props.activeVersionID;
    let compVersionIndex = this.state.selectedComparisonIndex;
    let selectedPeriodType = this.state.selectedPeriodType;
    let versionName = versions[activeVersionID].versionName; 
    let selectedPeriodLabel = periodNumberToString(this.state.selectedCompPeriod);
    let curVersion = versions[activeVersionID]
    let curPeriod = curVersion.versionPeriod; 
    let curVerMilestones = totalMilestones(curVersion.revenueMilestones, curPeriod)
    let periodTypeSinceInception = "Since Inception";
    let curHeadcountEffort = curVersion.headcountEffort;
    let curExternalSpend = curVersion.externalSpend;
    let curHeadcountSpend = calculateHeadcountSpend(curHeadcountEffort, programs)
    let curTotalProgSpendArray = calculateTotalSpendArrays(curExternalSpend, curHeadcountSpend);
    let curTotalIncurredSpend = periodAmountCalc(calculatePeriodTotal(curTotalProgSpendArray), curPeriod, selectedPeriodType);
    let curTotalSpend = arrayTotal(calculatePeriodTotal(curTotalProgSpendArray)); 


    let compVersion = versions[compVersionIndex]
    let compVerMilestones = totalMilestones(compVersion.revenueMilestones, selectedCompPeriod)
    let compHeadcountEffort = compVersion.headcountEffort;
    let compExternalSpend = compVersion.externalSpend;
    let compHeadcountSpend = calculateHeadcountSpend(compHeadcountEffort, programs)
    let compTotalProgSpendArray = calculateTotalSpendArrays(compExternalSpend, compHeadcountSpend);
    let compTotalIncurredSpend = periodAmountCalc(calculatePeriodTotal(compTotalProgSpendArray), selectedCompPeriod, selectedPeriodType); 
    let compTotalSpend = arrayTotal(calculatePeriodTotal(compTotalProgSpendArray)); 

    let incurredVarianceRows = programs.map((program, programIndex) => {
      let incurredProgSpendVariance = incurredSpendVariance(versions, activeVersionID, compVersionIndex, curPeriod, selectedCompPeriod, programs, programIndex, selectedPeriodType);
      let totalProgramSpend = totalProgSpend(versions, compVersionIndex, programs, programIndex);
      let percentComplete = incurredProgSpendVariance / totalProgramSpend;
      let progWtdAvg = programWeightedAvg(versions, compVersionIndex, programs, programIndex);
      let incurredVarRev = compVerMilestones * percentComplete * progWtdAvg 
      return(
        <React.Fragment>
          <VarianceRows
            programName={program.name}
            label={"Incurred Variance"}
            periodSpend={rounding(incurredProgSpendVariance,1)}
            revenue={rounding(incurredVarRev,1)}
          />
        </React.Fragment>
      )
    })

    let totalVarianceRows = programs.map((program, programIndex) => {
      let totalProgSpendVariance = totalSpendVariance(versions, activeVersionID, compVersionIndex, programs, programIndex)
      let totalVarPercentComplete = totalVarPercComplete(versions, activeVersionID, compVersionIndex, programs, programIndex, curPeriod, selectedPeriodType);
      let progWtdAvg = programWeightedAvg(versions, compVersionIndex, programs, programIndex);
      let totalVarRev = compVerMilestones * totalVarPercentComplete * progWtdAvg;
      return(
        <React.Fragment>
          <VarianceRows
            programName={program.name}
            label={"Total Spend Variance"}
            totalSpend={rounding(totalProgSpendVariance,1)} 
            revenue={rounding(totalVarRev,1)}
          />
        </React.Fragment>
      )
    })
    
    let milestoneVarianceRows = programs.map((program, programIndex) => {
      let milestoneVariance = curVerMilestones - compVerMilestones;
      let totalIncurredSpend = incurredTotalSpend(versions, activeVersionID, programs, programIndex, curPeriod, selectedPeriodType);
      let totalProgramSpend = totalProgSpend(versions, activeVersionID, programs, programIndex);
      let percentComplete = totalIncurredSpend / totalProgramSpend;
      let progWtdAvg = programWeightedAvg(versions, activeVersionID, programs, programIndex);
      let milestoneRev = milestoneVariance * percentComplete * progWtdAvg;
      let milestoneVarianceByProg = milestoneVariance * progWtdAvg;
      return(
        <React.Fragment>
          <VarianceRows
            programName={program.name}
            label={"Milestone Variance"}
            milestones={rounding(milestoneVarianceByProg,1)}
            revenue={rounding(milestoneRev,1)}
          />
        </React.Fragment>
      )
    })

    let wtdAvgVarianceRows = programs.map((program, programIndex) => {
      let wtdAvgVariance = progWtdAvgVariance(versions, activeVersionID, compVersionIndex, programs, programIndex)
      let totalProgramSpend = totalProgSpend(versions, activeVersionID, programs, programIndex);
      let totalIncurredSpend = incurredTotalSpend(versions, activeVersionID, programs, programIndex, curPeriod, selectedPeriodType);
      let percentComplete = totalIncurredSpend / totalProgramSpend;
      let totalWtdAvgVarRev = curVerMilestones * percentComplete * wtdAvgVariance;
      return(
        <React.Fragment>
          <VarianceRows
            programName={program.name}
            label={"Total WA Variance"}
            programWtdAvg={rounding(wtdAvgVariance,10000)}
            revenue={rounding(totalWtdAvgVarRev,1)}
          />
        </React.Fragment>
      )
    })
   
    let priorPrdTrueUp = 0;
    if (selectedPeriodType === "QTD" || Math.floor(curPeriod) !== Math.floor(selectedCompPeriod)) {
      curVersion.revenueMilestones.forEach((milestone) => {
        let revVerIndexArray = revenueVersionIndexArray(startYear, yearsOut, versions, activeVersionID);
        let currentPeriodRev = calculateCurrentPeriodRev(milestone, revVerIndexArray, versions, programs); 
        let priorPrdTrueUpArray = calculatePriorPrdTrueup(milestone, currentPeriodRev, versions, programs, activeVersionID);
        priorPrdTrueUp += periodAmountCalc(priorPrdTrueUpArray, curPeriod, selectedPeriodType);
      })
    }

    let priorPeriodTrueupRows = programs.map((program, programIndex) => {
      let progWtdAvg = programWeightedAvg(versions, activeVersionID, programs, programIndex);
      let progPriorPrdTrueup = progWtdAvg * priorPrdTrueUp;
      return(
        <React.Fragment>
          <VarianceRows
            programName={program.name}
            label={"Prior Period Trueup"}
            revenue={rounding(progPriorPrdTrueup,1)}
          />
        </React.Fragment>
      )
    });

    let compVersionLabel = selectedPeriodLabel + " " + selectedPeriodType;
    let curVersionLabel = periodNumberToString(curVersion.versionPeriod) + " " + selectedPeriodType;
    let trClassName = "total"

    return (
      <section id="Period-Bridge">
        <h2>Revenue Bridge</h2>
        <table>
          <tbody>
            <tr>
              <td>Period</td>
              <td>
                <select
                  value={selectedPeriodLabel}
                  onChange={(e) => this.setSelectedPeriod(e.target.value)}
                >
                  <Dropdown options={periodSelections}/>
                </select>
              </td>
            </tr>
            <tr>
              <td>Comparison Version</td>
              <td>
                <select
                  value={versions[this.state.selectedComparisonIndex].versionName}
                  onChange={(e) => this.setSelectedComparisonIndex(e.target.value)}
                >
                  <Dropdown options={this.props.versionNames}/>
                </select>
              </td>
            </tr>
            <tr>
              <td>Period Type</td>
              <td>
                <select
                  value={this.state.setSelectedPeriodType}
                  onChange={(e) => this.setSelectedPeriodType(e.target.value)}
                >
                  <Dropdown options={periodType}/>
                </select>
              </td>
            </tr> 
          </tbody>
        </table>
        <br></br>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Total Incurred Spend</th>
              <th>Total Spend</th>
              <th>Milestones</th>
              <th>Program WA</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            <VarianceRows
              periodSpend={compTotalIncurredSpend}
              totalSpend={rounding(compTotalSpend,1)}
              programWtdAvg={1}
              revenue={(compTotalIncurredSpend/compTotalSpend)*compVerMilestones}
              milestones={compVerMilestones}
              programName={compVersion.versionName}
              label={compVersionLabel}
              trClass={trClassName}
            />
            {incurredVarianceRows}
            {totalVarianceRows}
            {milestoneVarianceRows}
            {wtdAvgVarianceRows}
            {priorPeriodTrueupRows}
            <VarianceRows
              periodSpend={curTotalIncurredSpend}
              totalSpend={rounding(curTotalSpend,1)}
              programWtdAvg={1}
              revenue={((curTotalIncurredSpend/curTotalSpend)*curVerMilestones) + priorPrdTrueUp}
              milestones={curVerMilestones}
              programName={curVersion.versionName}
              label={curVersionLabel}
              trClass={trClassName}
            />
          </tbody>
        </table>
      </section>
    )
  }
}

class ExpenseAnalytics extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPeriod: this.props.versionPeriod, 
      selectedComparisonIndex: 0,
      selectedPeriodType: "QTD"
    }

    this.setSelectedPeriod = this.setSelectedPeriod.bind(this);
    this.setSelectedComparisonIndex = this.setSelectedComparisonIndex.bind(this);
    this.setSelectedPeriodType = this.setSelectedPeriodType.bind(this);
  }

  setSelectedPeriod(newPeriod) {
    let newSelectedPeriod = periodStringToNumber(newPeriod);
    this.setState({selectedPeriod: newSelectedPeriod});
  }

  setSelectedComparisonIndex(newComparison) {
    let versions = this.props.versions;
    let newIndex = 0;
    versions.forEach((version, versionIndex) => {
      if (version.versionName === newComparison) {
        newIndex = versionIndex
        return newIndex;
      }
    });
    this.setState({selectedComparisonIndex: newIndex});
  }

  setSelectedPeriodType(newType) {
    let newSelectedPeriodType = newType;
    this.setState({selectedPeriodType: newSelectedPeriodType})
  }

  render() {
    let programs = this.props.programs;
    let versions = this.props.versions;
    let activeVersionID = this.props.activeVersionID;
    let curVersion = versions[activeVersionID];
    let versionName = curVersion.versionName; 
    let externalSpend = curVersion.externalSpend; 
    let headcountEffort = curVersion.headcountEffort;
    let headcountSpend = calculateHeadcountSpend(headcountEffort, programs);
    let totalProgramSpend = this.props.totalProgramSpend;
    let startYear = this.props.startYear;
    let yearsOut = this.props.yearsOut;
    let versionPeriod = curVersion.versionPeriod;

    let selectedPeriod = this.state.selectedPeriod;
    let selectedPeriodType = this.state.selectedPeriodType;
    let periodSelections = periodLabels(startYear, yearsOut)

    let comparisonModel = this.props.versions[this.state.selectedComparisonIndex];
    let compExternalSpend = comparisonModel.externalSpend;
    let compHeadcountEffort = comparisonModel.headcountEffort;
    let compHeadcountSpend = calculateHeadcountSpend(compHeadcountEffort, programs); 
    let compTotalProgramSpend = calculateTotalSpendArrays(compExternalSpend, compHeadcountSpend);
     
    let externalSpendAnalyticRows = programs.map((program, programIndex) => {
      let currentProgExtSpend = externalSpend[programIndex];
      let currentPeriodSpend = periodAmountCalc(currentProgExtSpend, versionPeriod, selectedPeriodType);
      let compProgExtSpend = compExternalSpend[programIndex];
      let compPeriodSpend = periodAmountCalc(compProgExtSpend, selectedPeriod, selectedPeriodType)
      let diffDollar = currentPeriodSpend - compPeriodSpend;
      let diffPercent = rounding(diffDollar / compPeriodSpend, 10000);
      return (
        <React.Fragment>
          <tr>
            <td>{program.name}</td>
            <td className="numerical">
              <NumberFormat
                displayType="text"
                value={currentPeriodSpend}
                thousandSeparator={true}
              />
            </td>
            <td className="numerical">
              <NumberFormat
                displayType="text"
                value={compPeriodSpend}
                thousandSeparator={true}
              />
            </td>
            <td className="numerical">
              <NumberFormat
                displayType="text"
                value={diffDollar}
                thousandSeparator={true}
              />
            </td>
            <td className="numerical">
              <NumberFormat
                displayType="text"
                value={rounding(diffPercent*100,10000)}
                suffix={"%"}
              />
            </td>
          </tr>
        </React.Fragment>
      )
    });

    let headcountSpendAnalyticRows = programs.map((program, programIndex) => {
      let currentProgExtSpend = headcountSpend[programIndex];
      let currentPeriodSpend = periodAmountCalc(currentProgExtSpend, versionPeriod, selectedPeriodType);
      let compProgExtSpend = compHeadcountSpend[programIndex];
      let compPeriodSpend = periodAmountCalc(compProgExtSpend, selectedPeriod, selectedPeriodType);
      let diffDollar = currentPeriodSpend - compPeriodSpend;
      let diffPercent = rounding(diffDollar / compPeriodSpend, 10000);
      return (
        <React.Fragment>
          <tr>
            <td>{program.name}</td>
            <td className="numerical">
              <NumberFormat
                displayType="text"
                value={currentPeriodSpend}
                thousandSeparator={true}
              />
            </td>
            <td className="numerical">
              <NumberFormat
                displayType="text"
                value={compPeriodSpend}
                thousandSeparator={true}
              />
            </td>
            <td className="numerical">
              <NumberFormat
                displayType="text"
                value={diffDollar}
                thousandSeparator={true}
              />
            </td>
            <td className="numerical">
              <NumberFormat
                displayType="text"
                value={rounding(diffPercent*100,10000)}
                suffix={"%"}
              />
            </td>
          </tr>
        </React.Fragment>
      )
    });

    let totalSpendAnalyticRows = programs.map((program, programIndex) => {
      let currentProgExtSpend = totalProgramSpend[programIndex];
      let currentPeriodSpend = periodAmountCalc(currentProgExtSpend, versionPeriod, selectedPeriodType);
      let compProgExtSpend = compTotalProgramSpend[programIndex];
      let compPeriodSpend = periodAmountCalc(compProgExtSpend, selectedPeriod, selectedPeriodType);
      let diffDollar = currentPeriodSpend - compPeriodSpend;
      let diffPercent = rounding(diffDollar / compPeriodSpend, 10000);
      return (
        <React.Fragment>
          <tr>
            <td>{program.name}</td>
            <td className="numerical">
              <NumberFormat
                displayType="text"
                value={currentPeriodSpend}
                thousandSeparator={true}
              />
            </td>
            <td className="numerical">
              <NumberFormat
                displayType="text"
                value={compPeriodSpend}
                thousandSeparator={true}
              />
            </td>
            <td className="numerical">
              <NumberFormat
                displayType="text"
                value={diffDollar}
                thousandSeparator={true}
              />
            </td>
            <td className="numerical">
              <NumberFormat
                displayType="text"
                value={rounding(diffPercent*100,10000)}
                suffix={"%"}
              />
            </td>
          </tr>
        </React.Fragment>
      )
    });

    let selectedPeriodLabel = periodNumberToString(this.state.selectedPeriod);
    return (
      <section id="Analytics">
        <h2>Expense Analytics</h2>
        <table>
          <tbody>
            <tr>
              <td>Comparison Period</td>
              <td>
                <select
                  value={selectedPeriodLabel}
                  onChange={(e) => this.setSelectedPeriod(e.target.value)}
                >
                  <Dropdown options={periodSelections}/>
                </select>
              </td>
            </tr>
            <tr>
              <td>Comparison Version</td>
              <td>
                <select
                  value={versions[this.state.selectedComparisonIndex].versionName}
                  onChange={(e) => this.setSelectedComparisonIndex(e.target.value)}
                >
                  <Dropdown options={this.props.versionNames}/>
                </select>
              </td>
            </tr>
            <tr>
              <td>Period Type</td>
              <td>
                <select
                  value={this.state.setSelectedPeriodType}
                  onChange={(e) => this.setSelectedPeriodType(e.target.value)}
                >
                  <Dropdown options={periodType}/>
                </select>
              </td>
            </tr> 
          </tbody>
        </table>
        <br></br>
        <table>
          <thead>
            <tr>
              <th>External Costs - {periodNumberToString(this.state.selectedPeriod)} {this.state.selectedPeriodType}</th>
              <th>{versionName} version</th>
              <th>{comparisonModel.versionName} version</th>
              <th>Change - $</th>
              <th>Change - %</th>
            </tr>
          </thead>
          <tbody>
            {externalSpendAnalyticRows}
          </tbody>
        </table>
        <br></br>
        <table>
          <thead>
            <tr>
              <th>Headcount Costs - {periodNumberToString(this.state.selectedPeriod)} {this.state.selectedPeriodType}</th>
              <th>{versionName} version</th>
              <th>{comparisonModel.versionName} version</th>
              <th>Change - $</th>
              <th>Change - %</th>
            </tr>
          </thead>
          <tbody>
            {headcountSpendAnalyticRows}
          </tbody>
        </table>
        <br></br>
        <table>
          <thead>
            <tr>
              <th>Total Costs - {periodNumberToString(this.state.selectedPeriod)} {this.state.selectedPeriodType}</th>
              <th>{versionName} version</th>
              <th>{comparisonModel.versionName} version</th>
              <th>Change - $</th>
              <th>Change - %</th>
            </tr>
          </thead>
          <tbody>
            {totalSpendAnalyticRows}
          </tbody>
        </table>

      </section>
    )
  }
}

class RevenueProjections extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      copyExpMultiplier: 100,
      forecastPeriod: 2018.5
    }

    this.setCopyExpMultiplier = this.setCopyExpMultiplier.bind(this);
    this.setForecastPeriod = this.setForecastPeriod.bind(this);
  }

  setCopyExpMultiplier(newMultiplier) {
    let newExpMultiplier = newMultiplier;
    this.setState({copyExpMultiplier: newExpMultiplier});
  }

  setForecastPeriod(newPeriod) {
    let newSelectedPeriod = periodStringToNumber(newPeriod);
    this.setState({forecastPeriod: newSelectedPeriod});
  }

  render() {
    let startYear = this.props.startYear;
    let yearsOut = this.props.yearsOut;
    let versions = this.props.versions;
    let activeVersionID = this.props.activeVersionID;
    let programs = this.props.programs;
    let displaySelections = this.props.displaySelections;
    let editFcstExp = this.props.editFcstExp;

    let curVersion = versions[activeVersionID];
    let versionPeriod = curVersion.versionPeriod;
    let nextPeriod = versionPeriod + 0.25;
    let headcountSpend = calculateHeadcountSpend(curVersion.headcountEffort, programs);
    
    // Override the type to not sum in calculatedData function below//
    let forecastDisplaySelections = keepCloning(displaySelections).map((period) => {
      if (Math.floor(versionPeriod) === period.year) {
        period.type = "Quarterly"
      } else {
        period.type = "Annual"
      }
      return period;
    })

    let incurredSpend = 0;
    let programCostRow = programs.map((program, programIndex) => {
      let totalProgSpendArray = curVersion.externalSpend[programIndex].map((period, periodIndex) => {
        let newPeriod = keepCloning(period);
        newPeriod.amount += headcountSpend[programIndex][periodIndex].amount;
        return newPeriod;
      })

      let incurredProgSpend = 0;
      totalProgSpendArray.forEach((period) => {
        if (period.period < versionPeriod) {
          incurredSpend += period.amount;
          incurredProgSpend += period.amount;
        };
      });

      let futureProgSpendArray = curVersion.forecastExpenses[programIndex].filter(period => period.period >= versionPeriod);
      let totalProgSpend = arrayTotal(futureProgSpendArray) + incurredProgSpend;

      return(
        <React.Fragment>
          <tr>
            <td>{program.name} costs</td>
            <td className="numerical">
              <NumberFormat
                displayType="text"
                value={incurredProgSpend}
                thousandSeparator={true}
              />
            </td>
            <RevenueForecastRow
              dataArray={futureProgSpendArray}
              editAmount={editFcstExp}
              programIndex={programIndex}
              displaySelections={forecastDisplaySelections}
              periodStart={versionPeriod}
            />
            <td className="numerical">
              <NumberFormat
                displayType="text"
                value={totalProgSpend}
                thousandSeparator={true}
              />
            </td>
          </tr>
        </React.Fragment>
      )
    });

    let quarterLabels = periodLabels(versionPeriod, 1 - (versionPeriod % 1));
    let periodHeaders = forecastDisplaySelections.map((selection, selectionIndex) => {
      if (selection.type === "Annual" && selection.year > versionPeriod) {
        quarterLabels.push("FY " + (Math.floor(versionPeriod) + (selection.year - versionPeriod)));
      }
    })
    let tableHeaders = quarterLabels.map((label) => {
      return (
        <React.Fragment>
          <th className="numerical">{label}</th>
        </React.Fragment>
      )
    })

    let fcstExpArray = calculatePeriodTotal(keepCloning(curVersion.forecastExpenses));

    let periodSelections = periodLabels(versionPeriod, yearsOut)
    let fcstPeriodLabel = periodNumberToString(this.state.forecastPeriod) 

    let totalRevenue = calculateTotalRevenue(startYear, yearsOut, versions, activeVersionID, curVersion.revenueMilestones, programs);
    let revenueThruPeriod = arrayTotal(totalRevenue.filter(period => period.period < versionPeriod));
    let blankRevArray = revenueVersionIndexArray(startYear, yearsOut, versions, activeVersionID);
    let futurePrdBlankRevArray = blankRevArray.filter(period => period.period >= versionPeriod);
    let revenueProjection = calculateFcstRevenue(curVersion.revenueMilestones, futurePrdBlankRevArray, fcstExpArray, versionPeriod, activeVersionID, revenueThruPeriod)
    let fcstRevDisplayType = displayArray(forecastDisplaySelections);
    let fcstRevReducedDisplayType = fcstRevDisplayType.filter(period => period.period >= versionPeriod);
    let fcstRevCalcData = dataToDisplay(fcstRevReducedDisplayType, revenueProjection);
    let totalFcstRevenue = arrayTotal(revenueProjection) + revenueThruPeriod;
    let revenueProjectionRow = fcstRevCalcData.map((period) => {
      return(
        <React.Fragment>
          <td className="numerical">
            <NumberFormat
              displayType="text"
              value={rounding(period.amount,1)}
              thousandSeparator={true}
            /> 
          </td>
        </React.Fragment>
      )
    });

    let revenueProjectionDiff = revenueProjection.map((fcstPeriod) => {
      let newFcstPeriod = keepCloning(fcstPeriod);
      totalRevenue.forEach((revPeriod) => {
        if (fcstPeriod.period === revPeriod.period) {
          newFcstPeriod.amount = fcstPeriod.amount - revPeriod.amount;
        }
      });
      return newFcstPeriod;
    });
    let revDiffCalcData = dataToDisplay(fcstRevReducedDisplayType, revenueProjectionDiff);

    let revenueProjectionDiffRow = revDiffCalcData.map((period) => {
      return(
        <React.Fragment>
          <td className="numerical">
            <NumberFormat
              displayType="text"
              value={rounding(period.amount,1)}
              thousandSeparator={true}
            /> 
          </td>
        </React.Fragment>
      )
    });

    return(
      <section id="RevenueForecast">
        <h2>Revenue Forecast</h2>
        <table>
          <tbody>
            <tr>
              <td>Reset costs at a multiple of X%</td>
              <td>
                <NumberFormat
                  value={this.state.copyExpMultiplier}
                  className="numerical"
                  onValueChange={(values, e) => this.setCopyExpMultiplier(values.value)}
                  suffix={"%"}
                  isNumericString={true}
                />
              </td>
              <td>
                <button onClick={(e) => this.props.setFcstExpMultiplier(this.state.copyExpMultiplier, programs)}>Copy</button>
              </td>
            </tr>
            <tr>
              <td>Revenue as of</td>
              <td>
                <select
                  value={fcstPeriodLabel}
                  onChange={(e) => this.setForecastPeriod(e.target.value)}
                >
                  <Dropdown options={periodSelections}/>
                </select>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <br></br>
        <table>
          <thead>
            <tr>
              <th>Program costs</th>
              <th>Incurred thru {periodNumberToString(versionPeriod - 0.25)}</th>
              {tableHeaders}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {programCostRow}
            <tr></tr>
            <tr className="total">
              <td>Projected Revenue Pattern</td>
              <td className="numerical">
                <NumberFormat
                  displayType="text"
                  value={rounding(revenueThruPeriod,1)}
                  thousandSeparator={true}
                />
              </td>
              {revenueProjectionRow}
              <td className="numerical">
                <NumberFormat
                  displayType="text"
                  value={rounding(totalFcstRevenue,1)}
                  thousandSeparator={true}
                />
              </td>
            </tr>
            <tr className="total">
              <td>GAAP revenue diff</td>
              <td className="numerical">0</td>
              {revenueProjectionDiffRow}
              <td className="numerical">
                <NumberFormat
                  displayType="text"
                  value={rounding(arrayTotal(revenueProjectionDiff),1)}
                  thousandSeparator={true}
                />
              </td>
            </tr> 
          </tbody>
        </table>
      </section>
    )
  }
}

function RevenueForecastRow(props) {
  const {
    dataArray,
    editAmount,
    displaySelections,
    programIndex,
    periodStart,
  } = props;

  let displayType = displayArray(displaySelections);
  let reducedDisplayType = displayType.filter(period => period.period >= periodStart);
  let calculatedData = dataToDisplay(reducedDisplayType, dataArray);
  let revenueForecastRow = calculatedData.map((cell, cellIndex) => {
    return(
      <React.Fragment>
        <td>
          <NumberFormat
            value={cell.amount}
            className="numerical"
            onValueChange={(values, e) => editAmount(cell.type, cell.period, Number(values.value), programIndex)}
            thousandSeparator={true}
            isNumericString={true}
            decimalSeparator={"."}
          />
        </td>
      </React.Fragment>
    )
  })
  return revenueForecastRow;
}

function Dropdown({options}) {
  let rows = options.map((x) => {
    return (
      <option value={x}>{x}</option>
    )
  })

  return (
    <React.Fragment>
      {rows}
    </React.Fragment>
  )
}

function DeleteItem({removeItem, index}) {
  return (
    <td className="actions-cell">
      <button className="delete" onClick={(e) => {removeItem(index)}}>
        Delete
      </button>
    </td>
  )
}

function AddItem({addItem, label}) {
  return (
    <button onClick={addItem} className="add">{"Add " + label}</button>
  )
}

function TablePeriodHeaders({startYear, displaySelections}) {
  let labels = [];
  displaySelections.forEach((selection, selectionIndex) => {
    if (selection.type === "Annual") {
      labels.push("FY " + (startYear + selectionIndex))
    } else {
      for (let qtr = 1; qtr <= 4; qtr++) {
        labels.push("Q" + qtr + " " + (startYear + selectionIndex))
      }
    }
  })
  let tableHeaders = labels.map((label) => {
    return (
      <React.Fragment>
        <th className="numerical">{label}</th>
      </React.Fragment>
    )
  })
  return tableHeaders
}

function DataRows(props) {
  const {
    startYear,
    displaySelections,
    dataArray,
    yearsOut,
    programIndex,
    editAmount,
    input,
    suffix,
    versionPeriod,
    activeVersionID
  } = props;
  // suffix added only when necessary //
  // input determines if user can change amount //

  let years = yearsArray(startYear, yearsOut)
  let displayType = displayArray(displaySelections);
  let calculatedData = dataToDisplay(displayType, dataArray);
  let dataCells = calculatedData.map((cell, cellIndex) => {
    if (input === "Yes" && (cell.period >= versionPeriod || activeVersionID === 0)) {
      return(
        <React.Fragment>
          <td>
            <NumberFormat
              value={cell.amount}
              className="numerical"
              onValueChange={(values, e) => editAmount(cell.type, cell.period, Number(values.value), programIndex)}
              thousandSeparator={true}
              isNumericString={true}
              decimalSeparator={"."}
            />
          </td>
        </React.Fragment>
      )
    } else if (input === "No" || cell.period < versionPeriod) {
      let cellCopy = keepCloning(cell);
      let displayAmount = 0; 
      if (suffix === "%") {
        displayAmount = rounding(cellCopy.amount*100, 1000);
      } else {
        displayAmount = rounding(cellCopy.amount, 1);
      }
      return(
        <React.Fragment>
          <td className="numerical">
            <NumberFormat
              displayType="text"
              value={displayAmount}
              thousandSeparator={true}
              suffix={suffix}
            /> 
          </td>
        </React.Fragment>
      )
    }
  })
  return dataCells;
}

function TotalRows(props) {
  const {
    displaySelections,
    dataArray,
  } = props;

  let displayType = displayArray(displaySelections);
  let calculatedData = dataToDisplay(displayType, dataArray);
  let dataCells = calculatedData.map((cell, cellIndex) => {
    return(
      <React.Fragment>
        <td className="numerical">
          <NumberFormat
            displayType="text"
            value={rounding(cell.amount,1)}
            thousandSeparator={true}
          /> 
        </td>
      </React.Fragment>
    )
  })
  return dataCells;
}

function CummulativeDataRows(props) {
  const {
    startYear,
    displaySelections,
    dataArray,
    yearsOut,
    programIndex,
    editAmount,
    input,
    suffix,
  } = props;

  let years = yearsArray(startYear, yearsOut)
  //Override the type to not sum in calculatedData function below//
  let displaySelectionsOverride = keepCloning(displaySelections).map((period) => {
    period.type = "Quarterly"
    return period;
  })
  let displayType = displayArray(displaySelectionsOverride);
  let calculatedData = dataToDisplay(displayType, dataArray);
  let dataCells = calculatedData.map((cell, cellIndex) => {
    let cellCopy = keepCloning(cell);
    let displayAmount = 0; 
    if (suffix === "%") {
      displayAmount = rounding(cellCopy.amount*100, 1000);
    } else {
      displayAmount = rounding(cellCopy.amount, 1000);
    }
    let cellYear = Math.floor(cell.period);
    let periodDisplayCheck = displaySelections.filter(year => year.year === cellYear)
    let periodDisplay = periodDisplayCheck[0];
    if (periodDisplay.type === "Annual" && (cell.period - cellYear === 0.75)) {
      return(
        <React.Fragment>
          <td className="numerical">
            <NumberFormat
              displayType="text"
              value={displayAmount}
              thousandSeparator={true}
              suffix={suffix}
            /> 
          </td>
        </React.Fragment>
      )
    } else if (periodDisplay.type === "Quarterly") {
      return(
        <React.Fragment>
          <td className="numerical">
            <NumberFormat
              displayType="text"
              value={displayAmount}
              thousandSeparator={true}
              suffix={suffix}
            /> 
          </td>
        </React.Fragment>
      )
    } else {
      return(null)
    }
  })
  return dataCells;
}

function VarianceRows(props) {
  const {
    periodSpend,
    totalSpend,
    programWtdAvg,
    revenue,
    programName,
    milestones,
    label,
    trClass
  } = props;

  let programWtdAvgDisplay; 
  if (typeof(programWtdAvg) === "number") {
    programWtdAvgDisplay = rounding(programWtdAvg * 100,100)
  }
  return(
    <React.Fragment>
      <tr className={trClass}>
        <td>{programName} - {label}</td>
        <td className="numerical">
          <NumberFormat
            displayType="text"
            value={periodSpend}
            thousandSeparator={true}
          /> 
        </td>
        <td className="numerical">
          <NumberFormat
            displayType="text"
            value={totalSpend}
            thousandSeparator={true}
          /> 
        </td>
        <td className="numerical">
          <NumberFormat
            displayType="text"
            value={milestones}
            thousandSeparator={true}
          /> 
        </td>
        <td className="numerical">
          <NumberFormat
            displayType="text"
            value={programWtdAvgDisplay}
            thousandSeparator={true}
            suffix={"%"}
          /> 
        </td>
        <td className="numerical">
          <NumberFormat
            displayType="text"
            value={rounding(revenue,1)}
            thousandSeparator={true}
          /> 
        </td>
      </tr>
    </React.Fragment>
  )
}

function CummulativeTotalRows(props) {
  const {
    displaySelections,
    dataArray,
    startOrEnd,
    versionPeriod
  } = props;

  // Override the type to not sum in calculatedData function below//
  let displaySelectionsOverride = keepCloning(displaySelections).map((period) => {
    period.type = "Quarterly"
    return period;
  })
 
  let displayType = displayArray(displaySelectionsOverride);
  let calculatedData = dataToDisplay(displayType, dataArray);
  let dataCells = calculatedData.map((cell, cellIndex) => {
    let begOrEnd = 0;
    if (startOrEnd === "start") {
      begOrEnd = Number(0);
    } else if (startOrEnd === "end") {
      begOrEnd = Number(0.75);
    };
    let cellYear = Math.floor(cell.period);
    let periodDisplayCheck = displaySelections.filter(year => year.year === cellYear)
    let periodDisplay = periodDisplayCheck[0];
    if (periodDisplay.type === "Annual" && (cell.period - cellYear) === begOrEnd) {
      return(
        <React.Fragment>
          <td className="numerical">
            <NumberFormat
              displayType="text"
              value={rounding(cell.amount,1)}
              thousandSeparator={true}
            /> 
          </td>
        </React.Fragment>
      )
    } else if (periodDisplay.type === "Quarterly") {
      return(
        <React.Fragment>
          <td className="numerical">
            <NumberFormat
              displayType="text"
              value={rounding(cell.amount,1)}
              thousandSeparator={true}
            /> 
          </td>
        </React.Fragment>
      )
    } else {
      return(null)
    }
  })
  return dataCells;
}

class PopoverDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClick(e) {
    this.setState({open: !this.state.open});
  }

  handleClose(e) {
    this.setState({open: false});
  }

  render() {
    return (
      <div>
        <a
          href="#"
          className="button"
          ref="target"
          onClick={this.handleClick.bind(this)}>Popover</a>
        <Popover
          placement='left'
          container={this}
          target={this.refs.target}
          show={this.state.open}
          onHide={this.handleClose.bind(this)} >
          <p>This is popover</p>
        </Popover>
      </div>
    );
  }
}

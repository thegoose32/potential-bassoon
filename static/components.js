import React from 'react'
import ReactDOM from 'react-dom'
import NumberFormat from 'react-number-format';
import {CSVLink} from 'react-csv'
var math = require('math.js');

import {displayOptions, newAmounts, defaultState, displayArray, dataToDisplay, periodLabels,
  yearsArray, addDataArray, editDataArrayLength, editDataArrayYears,
  arrayTotal, calculatePeriodTotal, keepCloning, rounding, 
  calculateHeadcountSpend, percentCompleteArray, dollarCompleteCummArray,
  percentCompleteCummArray, periodType, periodAmountCalc, calculateTotalSpendArrays,
  priorPeriodTrueup, calculateCurrentPeriodRev, 
  setYearsOut, calculatePriorVersionIndex, calculateModelRevenue, periodStringToNumber, percentCompleteCummArrayFromData, periodNumberToString, currentPeriodRevenue, 

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
    this.setVersionDate = this.setVersionDate.bind(this);

    //Model Setup
    this.setModelName = this.setModelName.bind(this);
    this.setStartYear = this.setStartYear.bind(this);
    this.setEndYear = this.setEndYear.bind(this);
    this.setYearsOut = this.setYearsOut.bind(this);

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
      copiedScenario.versionName = "New version";
      let lastID = versions[versions.length - 1].versionID;
      copiedScenario.versionID = lastID + 1;
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
  
  setVersionDate(newScenarioDate, versionIndex) {
    this.setState(function(prevState, props) {
      let versions = prevState.versions;
      let currentScenario = versions[versionIndex];
      currentScenario.versionPeriod = periodStringToNumber(newScenarioDate);
      return {
        versions: versions
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
    this.setState((prevState, props) => {
      let yearsOut = this.state.endYear - startYear + 1;
      return {
        startYear: startYear,
      }
      this.setYearsOut(startYear, yearsOut);
    })
  }

  setEndYear(endYear) {
    this.setState({endYear: endYear})
    let yearsOut = endYear - this.state.startYear + 1;
    this.setYearsOut(yearsOut);
  }

  //TODO: needs to be fixed - currently not running if startYear changes//
  setYearsOut(yearsOut) {
    let newYearsOut = Number(yearsOut); 
    let startYear = this.state.startYear; 
    this.setState(setYearsOut(startYear, yearsOut))
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
    let yearsOut = this.state.yearsOut;
 
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
      let period = "Q1 " + prevState.startYear;
      let newMilestone = {
        id: newId,
        name: "New Milestone",
        dateEarned: period,
        datePaid: period,
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
      revMilestones[milestoneIndex].dateEarned = periodStringToNumber(newDate);
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
      quarterAmount = rounding(newAmount / 4, 1000);
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
    let quarterAmount = 0;
    if (displayType === "Annual") {
      quarterAmount = rounding(newAmount / 4, 1000);
    } 
    this.setVersionState((prevState, props) => {
      let hcEffort = keepCloning(prevState.headcountEffort);
      let programHcEffort = hcEffort[programIndex];
      let newHcEffort = programHcEffort.map((amount) => {
        if (displayType === "Annual" && Math.floor(amount.period) === period) {
          amount.amount = quarterAmount;
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

  setComparisonModel(newModelIndex) {
    let newComparisonModel = newModelIndex;
    this.setVersionState({comparisonModelIndex: newComparisonModel});
  }

  handleSaveClick() {
    const saveErrorMessage = "We were unable to save your changes.  We apologize " +
          "about the inconvenience."
    fetch('/api/save_lrp_model', {
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
      } else {
        window.alert(saveErrorMessage);
      }
    }, () => {
        window.alert(saveErrorMessage);
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
    let percentTotalCum = rounding(arrayTotal(percentComplete), 1000000);

    let versionNames = versions.map((version) => {
      return version.versionName
    })

    let priorVersionIndex = calculatePriorVersionIndex(versions, priorVersionID);

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
          />
          <ScenarioManager
            versions={this.state.versions}
            addVersion={this.addVersion}
            deleteVersion={this.deleteVersion}
            editVersionName={this.editVersionName}
            setActiveVersionID={this.setActiveVersionID}
            activeVersionID={this.state.activeVersionID}
            setVersionDate={this.setVersionDate}
            startYear={startYear}
            yearsOut={yearsOut}
            setPriorVersion={this.setPriorVersion}
            versionNames = {versionNames}
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
            externalSpend={externalSpend}
            programs={programs}
            editExtSpendAmount={this.editExtSpendAmount}
          />
          <HeadcountEffort
            startYear={startYear}
            yearsOut={yearsOut}
            displaySelections={displaySelections}
            headcountEffort={headcountEffort}
            programs={programs}
            editHeadcountEffort={this.editHeadcountEffort}
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
            percentTotalCum={percentTotalCum}
            totalSpend={totalSpend}
          />
          <RevenueRecognizedModel
            startYear={startYear}
            yearsOut={yearsOut}
            displaySelections={displaySelections}
            percentComplete={percentComplete}
            percentCompleteCum={percentCompleteCum}
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
            percentComplete={percentComplete}
            percentCompleteCum={percentCompleteCum}
            revenueMilestones={revenueMilestones}
            programs={programs}
            versions={versions}
            activeVersionID={activeVersionID}
          />
          <PeriodBridge
            startYear={startYear}
            yearsOut={yearsOut}
            externalSpend={externalSpend}
            headcountEffort={headcountEffort}
            programs={programs}
            percentCompleteCum={percentCompleteCum}
            percentComplete={percentComplete}
            totalProgramSpend={totalProgramSpend}
            headcountSpend={headcountSpend}
            grandTotalSpend={grandTotalSpend}
            revenueMilestones={revenueMilestones}
            versions={versions}
            versionNames={versionNames}
            totalSpend={totalSpend}
            activeVersionID={activeVersionID}
          />
          <PeriodAnalytic
            startYear={startYear}
            yearsOut={yearsOut}
            externalSpend={externalSpend}
            headcountEffort={headcountEffort}
            headcountSpend={headcountSpend}
            programs={programs}
            totalProgramSpend={totalProgramSpend}
            versions={versions}
            versionNames={versionNames}
            versionPeriod={versionPeriod}
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
  } = props;

  let versionNames = versions.map((version) => {
    return(version.versionName);
  })

  let activeScenarioName = versions[activeVersionID].versionName;

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
        <h2>Model Setup</h2>
        <table>
          <tbody>
            <tr>
              <th>Model Name</th>
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

function ScenarioManager(props) { 
  const {
    versions,
    addVersion,
    deleteVersion,
    editVersionName,
    activeVersionID,
    setVersionDate,
    startYear,
    yearsOut,
    setPriorVersion,
    versionNames
  } = props;
    
  let periodSelections = periodLabels(startYear, yearsOut);
  let priorPeriodSelections = versionNames;
  priorPeriodSelections.unshift("N/A - Initial Version");

  let versionRows = versions.map((version, index) => {
    let versionName = version.versionName;
    let versionPeriod = periodNumberToString(version.versionPeriod);
    let priorScenarioName = versions.forEach((priorScenario) => {
      if (version.priorVersionID === priorScenario.versionID) {
        return priorScenario.versionName;
      }
    });
    let priorModelSelections = priorPeriodSelections.slice();
    let currentModelName = priorModelSelections.indexOf(versionName)
    priorModelSelections.splice(currentModelName, 1);
    if (index === 0 || index <= activeVersionID) {
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
                onChange={(e) => setVersionDate(e.target.value, index)}
              >
                <Dropdown options={periodSelections}/>
              </select>
            </td>
            <td> 
              <select
                value={priorScenarioName}
                onChange={(e) => setPriorVersion(e.target.value, index)}
              >
                <Dropdown options={priorModelSelections}/>
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
            <td> 
              <select
                value={versionPeriod}
                onChange={(e) => setVersionDate(e.target.value, index)}
              >
                <Dropdown options={periodSelections}/>
              </select>
            </td>
            <td> 
              <select
                value={priorScenarioName}
                onChange={(e) => setPriorVersion(e.target.value, index)}
              >
                <Dropdown options={priorModelSelections}/>
              </select>
            </td>
            <DeleteItem index={index} removeItem={deleteVersion} />
          </tr>
        </React.Fragment>
      )
    }
  });
  
  return (
    <section id="Versions">
      <h2>Version Manager</h2>
      <table className="actions-column">
        <thead>
          <tr>
            <th>Name</th>
            <th>Version Period</th>
            <th>Prior Version</th>
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
      <h2>Years Display</h2>
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
      <h2>Programs under Revenue Model</h2>
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
              value={milestone.dateEarnedLabel}
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

  return (
    <section id="Revenue-Milestones">
      <h2>Revenue Milestones</h2>
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
    externalSpend,
    programs,
    editExtSpendAmount
  } = props;

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
      <h2>External Program Spend</h2>
      <table>
        <thead>
          <tr>
            <th>Program</th>
            <TablePeriodHeaders
              startYear={startYear}
              yearsOut={yearsOut}
              displaySelections={displaySelections}
            />
            <th>Total External Spend</th>
          </tr>
        </thead>
        <tbody>
          {externalSpendRow}
          <tr>
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
    headcountEffort,
    programs,
    editHeadcountEffort
  } = props;

  let headcountEffortRow = headcountEffort.map((hcEffort, hcEffortIndex) => {
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
            editAmount={editHeadcountEffort}
            programIndex={hcEffortIndex}
            input="Yes"
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

  let totalHeadcountEffort = calculatePeriodTotal(headcountEffort);
  let grandTotal = arrayTotal(totalHeadcountEffort);

  return (
    <section id="Headcount-Effort">
      <h2>Headcount Effort by Program</h2>
      <table>
        <thead>
          <tr>
            <th>Program</th>
            <th>Annual FTE Rate</th>
            <TablePeriodHeaders
              startYear={startYear}
              yearsOut={yearsOut}
              displaySelections={displaySelections}
            />
            <th>Total Headcount Effort</th>
          </tr>
        </thead>
        <tbody>
          {headcountEffortRow}
          <tr>
            <td>Total</td>
            <td></td>
            <TotalRows
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
      <h2>Headcount Spend by Program</h2>
      <table>
        <thead>
          <tr>
            <th>Program</th>
            <th className="numerical"> Annual FTE Rate</th>
            <TablePeriodHeaders
              startYear={startYear}
              yearsOut={yearsOut}
              displaySelections={displaySelections}
            />
            <th>Total Headcount Spend</th>
          </tr>
        </thead>
        <tbody>
          {headcountEffortRow}
          <tr>
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
    percentTotalCum,
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
              yearsOut={yearsOut}
              displaySelections={displaySelections}
            />
            <th className="numerical">Total Program Spend</th>
          </tr>
        </thead>
        <tbody>
          {totalProgRow}
          <tr>
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
          <tr>
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
          <tr>
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
          <tr>
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

function RevenueRecognizedModel(props) {
  const {
    startYear,
    yearsOut,
    displaySelections,
    revenueMilestones,
    percentComplete,
    percentCompleteCum,
    versionPeriod,
    cummPercentDiff,
    versions,
    programs,
    versionID,
    activeVersionID
  } = props;
  
  let milestoneRows = revenueMilestones.map((milestone, milestoneIndex) => {
    let totalMilestoneRevenue = calculateModelRevenue(startYear, yearsOut, milestone, versions, programs, activeVersionID);
    let priorPeriodRevTrueup = priorPeriodTrueup(programs, milestone, versionPeriod, startYear, yearsOut, versions, activeVersionID);
    let currentPeriodRev = currentPeriodRevenue(startYear, yearsOut, milestone, versions, programs, activeVersionID, versionPeriod); 
    let totalCurrentPeriodRev = arrayTotal(currentPeriodRev);
    let totalPriorPeriodRevTrueup = arrayTotal(priorPeriodRevTrueup);

    if (totalPriorPeriodRevTrueup !== 0) {
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
        </React.Fragment>
      )
    }
  })

  let milestoneRevEarned = revenueMilestones.map((milestone) => {
    return calculateModelRevenue(startYear, yearsOut, milestone, versions, programs, activeVersionID)
  })

  let totalRevenueEarned = calculatePeriodTotal(milestoneRevEarned);
  let grandTotalRevenue = arrayTotal(totalRevenueEarned);

  let currentPeriodRev = periodAmountCalc(totalRevenueEarned, versionPeriod, "QTD") 
  let currentYTDPeriodRev = periodAmountCalc(totalRevenueEarned, versionPeriod, "YTD")
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
              yearsOut={yearsOut}
              displaySelections={displaySelections}
            />
            <th className="numerical">Total Milestone Revenue</th>
          </tr>
        </thead>
        <tbody>
          {milestoneRows}
          <tr>
            <td>Total Revenue</td>
            <TotalRows
              displaySelections={displaySelections}
              dataArray={totalRevenueEarned}
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
          <tr>
            <td>{versionPeriodLabel} QTD revenue</td>
            <td className="numerical">
              <NumberFormat
                displayType="text"
                value={rounding(currentPeriodRev,1)}
                thousandSeparator={true}
              />
            </td>
          </tr>
          <tr>
            <td>{versionPeriodLabel} YTD revenue</td>
            <td className="numerical">
              <NumberFormat
                displayType="text"
                value={rounding(currentYTDPeriodRev,1)}
                thousandSeparator={true}
              />
            </td>
          </tr>
 
        </tbody>
      </table>
    </section>
  )
}

function DeferredRevenueRoll (props) {
  const {
    startYear,
    yearsOut,
    displaySelections,
    revenueMilestones,
    percentComplete,
    percentCompleteCum,
    versions,
    programs,
    activeVersionID
  } = props;

  let milestoneRevEarned = revenueMilestones.map((milestone) => {
    return calculateModelRevenue(startYear, yearsOut, milestone, versions, programs, activeVersionID)
  })

  let totalRevenueEarned = calculatePeriodTotal(milestoneRevEarned);

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

  return (
    <section id="Deferred-Revenue-Rollforward">
      <h2>Deferred Revenue Rollforward</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <TablePeriodHeaders
              startYear={startYear}
              yearsOut={yearsOut}
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
          <tr>
            <td>End Balance</td>
            <CummulativeTotalRows
              displaySelections={displaySelections}
              dataArray={deferredRevEndBalance}
              startOrEnd="end"
            />
          </tr>
        </tbody>
      </table>
    </section>
  )
}

class PeriodBridge extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPeriod: 2018,
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
    let startYear = this.props.startYear;
    let yearsOut = this.props.yearsOut;
    let selectedPeriod = this.state.selectedPeriod;
    let periodSelections = periodLabels(startYear, yearsOut)
    let versions = this.props.versions;
    let revenueMilestones = this.props.revenueMilestones;
    let selectedPeriodType = this.state.selectedPeriodType;
    
    //Selected Period Variables//
    let totalProgramSpend = this.props.totalProgramSpend;
    let totalSpend = this.props.totalSpend;
    let grandTotalSpend = this.props.grandTotalSpend;
    
    let milestoneRevEarned = revenueMilestones.map((milestone) => {
      return calculateCurrentPeriodRev(startYear, yearsOut, milestone, this.props.percentCompleteCum)
    })

    let totalRevenueEarned = calculatePeriodTotal(milestoneRevEarned);
    let grandTotalRevenue = arrayTotal(totalRevenueEarned);
 
    let selectedRevenueEarned = periodAmountCalc(totalRevenueEarned, selectedPeriod, selectedPeriodType);

    let selectedPeriodSpend = periodAmountCalc(totalSpend, selectedPeriod, selectedPeriodType);
 
    //Comparison Period Variable//
    let comparisonModel = this.props.versions[this.state.selectedComparisonIndex];
    let compRevenueMilestones = comparisonModel.revenueMilestones;
    let compHeadcountEffort = comparisonModel.headcountEffort;
    let compExternalSpend = comparisonModel.externalSpend;
    let compHeadcountSpend = calculateHeadcountSpend(compHeadcountEffort, programs)
    let compTotalProgramSpend = calculateTotalSpendArrays(compExternalSpend, compHeadcountSpend);
     
    let compTotalSpend = calculatePeriodTotal(compTotalProgramSpend);
    let compGrandTotal = arrayTotal(compTotalSpend);
    let compPercentCompleteCumm = percentCompleteCummArrayFromData(compHeadcountEffort, compExternalSpend, programs)
    let compMilestoneRevEarned = compRevenueMilestones.map((milestone) => {
      return calculateModelRevenue(startYear, yearsOut, milestone, versions, programs, this.state.selectedComparisonIndex); 
    })

    let compTotalRevenueEarned = calculatePeriodTotal(compMilestoneRevEarned);
    let compRevenueEarned = periodAmountCalc(compTotalRevenueEarned, selectedPeriod, selectedPeriodType);

    let compSelectedPeriodSpend = periodAmountCalc(compTotalSpend, selectedPeriod, selectedPeriodType);;

    //Program Change in Spend Rows//
    let periodBridgeRow = programs.map((program, programIndex) => {
      let selectedProgSpendPeriod = periodAmountCalc(totalProgramSpend[programIndex], selectedPeriod, selectedPeriodType);
      let grandTotalProgramSpend = arrayTotal(totalProgramSpend[programIndex]);
      let compProgSpendPeriod = periodAmountCalc(compTotalProgramSpend[programIndex], selectedPeriod, selectedPeriodType);
      let compGrandTotalProgramSpend = arrayTotal(compTotalProgramSpend[programIndex]);
      let periodDifference = grandTotalRevenue * (((compProgSpendPeriod / compGrandTotalProgramSpend)*(compGrandTotalProgramSpend / compGrandTotal)) - ((selectedProgSpendPeriod / grandTotalProgramSpend) * (grandTotalProgramSpend / grandTotalSpend)));
      return (
        <React.Fragment>
          <tr>
            <td>{program.name} changes</td>
            <td className="numerical">
              <NumberFormat
                displayType="text"
                value={rounding(periodDifference,1)}
                thousandSeparator={true}
              />
            </td>
            <td className="numerical">
              <NumberFormat
                displayType="text"
                value={rounding(compProgSpendPeriod - selectedProgSpendPeriod,1)}
                thousandSeparator={true}
              />
            </td>
            <td className="numerical">
              <NumberFormat
                displayType="text"
                value={rounding(compGrandTotalProgramSpend - grandTotalProgramSpend,1)}
                thousandSeparator={true}
              />
            </td>
            <td className="numerical">
              <NumberFormat
                displayType="text"
                value={rounding((((compProgSpendPeriod / compGrandTotalProgramSpend)*(compGrandTotalProgramSpend / compGrandTotal)) - ((selectedProgSpendPeriod / grandTotalProgramSpend) * (grandTotalProgramSpend / grandTotalSpend))) * 100, 1000)}
                thousandSeparator={true}
                suffix={"%"}
              />
            </td>
 
          </tr>
        </React.Fragment>
      )
    });

    let selectedPeriodLabel = periodNumberToString(this.state.selectedPeriod);
    return (
      <section id="Period-Bridge">
        <h2>Revenue Bridge</h2>
        <table>
          <tbody>
            <tr>
              <td>Selected Period</td>
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
              <td>Selected Comparison Model</td>
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
              <th>Revenue</th>
              <th>Period Cost</th>
              <th>Total Cost</th>
              <th>% of Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Current Model Revenue</td>
              <td className="numerical">
                <NumberFormat
                  displayType="text"
                  value={rounding(selectedRevenueEarned,1)}
                  thousandSeparator={true}
                />
              </td>
              <td className="numerical">
                <NumberFormat
                  displayType="text"
                  value={rounding(selectedPeriodSpend,1)}
                  thousandSeparator={true}
                />
              </td>
 
              <td className="numerical">
                <NumberFormat
                  displayType="text"
                  value={rounding(grandTotalSpend,1)}
                  thousandSeparator={true}
                />
              </td>
              <td className="numerical">
                <NumberFormat
                  displayType="text"
                  value={rounding((selectedPeriodSpend / grandTotalSpend)*100,1000)}
                  thousandSeparator={true}
                  suffix={"%"}
                />
              </td>
            </tr>
            {periodBridgeRow}
            <tr>
              <td>Comparison Model Revenue</td>
              <td className="numerical">
                <NumberFormat
                  displayType="text"
                  value={rounding(compRevenueEarned,1)}
                  thousandSeparator={true}
                />
              </td>
              <td className="numerical">
                <NumberFormat
                  displayType="text"
                  value={rounding(compSelectedPeriodSpend,1)}
                  thousandSeparator={true}
                />
              </td>
 
              <td className="numerical">
                <NumberFormat
                  displayType="text"
                  value={rounding(compGrandTotal,1)}
                  thousandSeparator={true}
                />
              </td>
              <td className="numerical">
                <NumberFormat
                  displayType="text"
                  value={rounding((compSelectedPeriodSpend / compGrandTotal)*100,1000)}
                  thousandSeparator={true}
                  suffix={"%"}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    )
  }
}

class PeriodAnalytic extends React.Component {
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
    let externalSpend = this.props.externalSpend;
    let headcountSpend = this.props.headcountSpend;
    let totalProgramSpend = this.props.totalProgramSpend;
    let headcountEffort = this.props.headcountEffort;
    let startYear = this.props.startYear;
    let yearsOut = this.props.yearsOut;
    let versionPeriod = this.props.versionPeriod;

    let selectedPeriod = this.state.selectedPeriod;
    let versions = this.props.versions;
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
                value={diffPercent*100}
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
                value={diffPercent*100}
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
                value={diffPercent*100}
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
        <h2>Analytic Engine</h2>
        <table>
          <tbody>
            <tr>
              <td>Selected Comparison Period</td>
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
              <td>Selected Comparison Model</td>
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
              <th>External Costs</th>
              <th>Current Period</th>
              <th>Comparison Period</th>
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
              <th>Headcount Costs</th>
              <th>Current Period</th>
              <th>Comparison Period</th>
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
              <th>Total Costs</th>
              <th>Current Period</th>
              <th>Comparison Period</th>
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

function TablePeriodHeaders({startYear, yearsOut, displaySelections}) {
  let labels = [];
  displaySelections.forEach((selection, selectionIndex) => {
    if (selection.type === "Annual") {
      labels.push("FY " + (startYear + selectionIndex))
    } else {
      for (let x = 1; x < 5; x++) {
        labels.push("Q" + x + " " + (startYear + selectionIndex))
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
    suffix
  } = props;

  let years = yearsArray(startYear, yearsOut)
  let displayType = displayArray(displaySelections);
  let calculatedData = dataToDisplay(displayType, dataArray);
  let dataCells = calculatedData.map((cell, cellIndex) => {
    if (input === "Yes") {
      return(
        <React.Fragment>
          <td>
            <NumberFormat
              value={cell.amount}
              className="numerical"
              onValueChange={(values, e) => editAmount(cell.type, cell.period, Number(values.value), programIndex)}
              thousandSeparator={true}
              isNumericString={true}
              decimalScale={2}
              fixedDecimalScale={false}
              decimalSeparator={"."}
            />
          </td>
        </React.Fragment>
      )
    } else if (input === "No") {
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

function CummulativeTotalRows(props) {
  const {
    displaySelections,
    dataArray,
    startOrEnd
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


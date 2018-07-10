import React from 'react'
import ReactDOM from 'react-dom'
import NumberFormat from 'react-number-format';
import {CSVLink} from 'react-csv'
var math = require('math.js');

import {displayOptions, newAmounts, defaultState, displayArray, dataToDisplay, periodLabels,
  yearsArray, addDataArray, editDataArrayLength, editDataArrayYears,
  arrayTotal, calculatePeriodTotal, keepCloning, rounding, calculateRevenue, 
  calculateHeadcountSpend, percentCompleteArray, dollarCompleteCummArray,
  percentCompleteCummArray, periodType, periodAmountCalc, calculateTotalSpendArrays,
  calculateCummPercentDiff, calculatePriorPeriodRevTrueup, calculateCurrentPeriodRev

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

    //Scenario
    this.setScenarioState = this.setScenarioState.bind(this);
    this.addScenario = this.addScenario.bind(this);
    this.deleteScenario = this.deleteScenario.bind(this);
    this.editScenarioName = this.editScenarioName.bind(this);
    this.setActiveScenarioId = this.setActiveScenarioId.bind(this);
    this.setPriorScenario = this.setPriorScenario.bind(this);

    //Model Setup
    this.setModelName = this.setModelName.bind(this);
    this.setStartYear = this.setStartYear.bind(this);
    this.setEndYear = this.setEndYear.bind(this);
    this.setYearsOut = this.setYearsOut.bind(this);
    this.setScenarioDate = this.setScenarioDate.bind(this);

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
    this.editMilestonePaid = this.editMilestonePaid.bind(this);
    this.editMilestoneAmount = this.editMilestoneAmount.bind(this);

    //External Spend
    this.editExtSpendAmount = this.editExtSpendAmount.bind(this);

    //Headcount Effort
    this.editHeadcountEffort = this.editHeadcountEffort.bind(this);
    
    //Period Analytics
    this.setComparisonModel = this.setComparisonModel.bind(this);
  }

  setScenarioState(scenarioChanges) {
    this.setState((prevState, props) => {
      const activeScenarioId = prevState.activeScenarioId;
      const currentScenario = prevState.scenarios[activeScenarioId];
      let updatedCurrentScenario;
      let updatedAssumptions;
      if (typeof scenarioChanges === "function") {
        updatedAssumptions = scenarioChanges(currentScenario, props);
        updatedCurrentScenario = Object.assign({}, currentScenario, updatedAssumptions);
      } else {
        updatedCurrentScenario = Object.assign({}, currentScenario, scenarioChanges);
      }
      const newState = prevState
      newState.scenarios[activeScenarioId] = updatedCurrentScenario;
      return newState;
    })
  }

  addScenario() {
    this.setState((prevState, props) => {
      let scenarios = prevState.scenarios;
      let copiedScenarioIndex = prevState.activeScenarioId;
      let copiedScenario = JSON.parse(JSON.stringify(scenarios[copiedScenarioIndex])); 
      copiedScenario.scenarioName = "New scenario";
      copiedScenario.scenarioID = prevState.scenarioID + 1;
      scenarios.push(copiedScenario);
      return {
        scenarios: scenarios
      }
    })
  }
  
  deleteScenario(scenarioIndex) {
    this.setState(function(prevState, props) {
      let scenarios = prevState.scenarios;
      scenarios.splice(scenarioIndex, 1);
      return {
        scenarios: scenarios
      }
    })
  }

  editScenarioName(newName, scenarioIndex) {
    this.setState(function(prevState, props) {
      let scenarios = prevState.scenarios;
      let currentScenario = scenarios[scenarioIndex];
      currentScenario.scenarioName = newName;
      return {
        scenarios: scenarios
      }
    })
  }
  
  setScenarioDate(newScenarioDate, scenarioIndex) {
    this.setState(function(prevState, props) {
      let scenarios = prevState.scenarios;
      let currentScenario = scenarios[scenarioIndex];
      currentScenario.scenarioDate = newScenarioDate;
      return {
        scenarios: scenarios
      }
    })
  }

  setActiveScenarioId(newScenario) {
    this.setState(function(prevState, props) {
      let scenarios = prevState.scenarios;
      let newScenarioIndex = scenarios.findIndex(x => x.scenarioName === newScenario);
      return {
        activeScenarioId: newScenarioIndex 
      }
    })
  }

  setPriorScenario(priorScenario, scenarioIndex) {
    this.setState(function(prevState, props) {
      let scenarios = prevState.scenarios;
      let priorScenarioID = scenarios.forEach((scenario, scenarioIndex) => {
        if (priorScenario === scenario.scenarioName) {
          return scenario.scenarioID
        }
      })
      let currentScenario = scenarios[scenarioIndex];
      currentScenario.priorScenarioID = priorScenarioID;
      return {
        scenarios: scenarios
      }
    });
  }

  setModelName(name) {
    this.setState({modelName: name});
  }

  setStartYear(startYear) {
    this.setState((prevState, props) => {
      let startYearNum = Number(startYear);
      return {
        startYear: startYearNum
      };
    })
    let yearsOut = this.state.endYear - startYear + 1;
    this.setYearsOut(yearsOut);
  }

  setEndYear(endYear) {
    this.setState((prevState, props) => {
      let endYearNum = Number(endYear);
      return {
        endYear: endYearNum
      };
    })
    let yearsOut = endYear - this.state.startYear + 1;
    this.setYearsOut(yearsOut);
  }

  setYearsOut(yearsOut) {
    let newYearsOut = Number(yearsOut); 
    this.setState((prevState, props) => {

      let startYear = this.state.startYear; 
      let extSpend = prevState.externalSpend;
      let hcSpend = prevState.headcountEffort;
      
      let scenarios = prevState.scenarios;
      let newScenarios = scenarios.map((scenario, scenarioIndex) => {
        let newScenario = keepCloning(scenario);
        let displaySelections = []; 
        for (let x = 0; x < newYearsOut; x++) {
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
          let arrayLength = editDataArrayLength(array, startYear, newYearsOut);
          return editDataArrayYears(arrayLength, startYear, newYearsOut);
        })

        let newHCEffort = newScenario.headcountEffort.map((array) => {
          let arrayLength = editDataArrayLength(array, startYear, newYearsOut);
          return editDataArrayYears(arrayLength, startYear, newYearsOut);
        })
        newScenario.externalSpend = newExtSpend;
        newScenario.headcountEffort = newHCEffort;
        return newScenario;
      })

      return {
        yearsOut: newYearsOut,
        scenarios: newScenarios
      }
    })
  }

  setDisplayType(display, displayIndex) {
    this.setScenarioState((prevState, props) => {
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
      
      let scenarios = prevState.scenarios;
      let newScenarios = scenarios.map((scenario, scenarioIndex) => {
        let newScenario = keepCloning(scenario);
        
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
        scenarios: newScenarios
      } 
    })
  }

  deleteProgram(programIndex) {
    this.setScenarioState((prevState, props) => {
      let programArray = prevState.programs;
      let externalSpendArray = prevState.externalSpend;
      let headcountEffortArray = prevState.headcountEffort;
      programArray.splice(programIndex, 1);
      externalSpendArray.splice(programIndex, 1);
      headcountEffortArray.splice(programIndex, 1);
      return {
        programs: programArray,
        externalSpend: externalSpendArray,
        headcountEffort: headcountEffortArray
      }
    });
  }
  
  editProgramName(programIndex, programName) {
    this.setScenarioState((prevState, props) => {
      let programArray = prevState.programs.slice();
      programArray[programIndex].name = programName;
      return {
        programs: programArray
      }
    });
  }

  editProgramFTERate(programIndex, newAmount) {
    this.setScenarioState((prevState, props) => {
      let programArray = this.state.programs.slice();
      programArray[programIndex].fteRate = newAmount;
      return {
        programs: programArray
      }
    })
  }

  addMilestone() {
    this.setScenarioState((prevState, props) => {
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
    this.setScenarioState((prevState, props) => {
      let revMilestones = prevState.revenueMilestones;
      revMilestones.splice(milestoneIndex, 1);
      return {
        revenueMilestones: revMilestones
      }
    })
  }

  editMilestoneName(milestoneIndex, newName) {
    this.setScenarioState((prevState, props) => {
      let revMilestones = prevState.revenueMilestones.slice();
      revMilestones[milestoneIndex].name = newName;
      return {
        revenueMilestones: revMilestones
      }
    })
  }

  editMilestoneEarned(milestoneIndex, newDate) {
    this.setScenarioState((prevState, props) => {
      let revMilestones = prevState.revenueMilestones.slice();
      revMilestones[milestoneIndex].dateEarned = newDate;
      return {
        revenueMilestones: revMilestones
      }
    })
  }

  editMilestonePaid(milestoneIndex, newDate) {
    this.setScenarioState((prevState, props) => {
      let revMilestones = prevState.revenueMilestones.slice();
      revMilestones[milestoneIndex].datePaid = newDate;
      return {
        revenueMilestones: revMilestones
      }
    })
  }

  editMilestoneAmount(milestoneIndex, newAmount) {
    this.setScenarioState((prevState, props) => {
      let revMilestones = prevState.revenueMilestones.slice();
      revMilestones[milestoneIndex].amount = Number(newAmount);
      return {
        revenueMilestones: revMilestones
      }
    })
  }

  editExtSpendAmount(displayType, quarter, year, newAmount, programIndex) {
    let quarterAmount = 0;
    if (displayType === "Annual") {
      quarterAmount = rounding(newAmount / 4, 1000);
    } 
    this.setScenarioState((prevState, props) => {
      let extSpend = keepCloning(prevState.externalSpend);
      let programExtSpend = extSpend[programIndex];
      let newExtSpend = programExtSpend.map((amount) => {
        if (displayType === "Annual" && amount.year === year) {
          amount.amount = quarterAmount
        } else if (displayType === "Quarterly" && amount.year === year && amount.quarter === quarter) {
          amount.amount = newAmount;
        }
        return amount;
      })
      return {
        externalSpend: extSpend
      }
    })
  }

  editHeadcountEffort(displayType, quarter, year, newAmount, programIndex) {
    let quarterAmount = 0;
    if (displayType === "Annual") {
      quarterAmount = rounding(newAmount / 4, 1000);
    } 
    this.setScenarioState((prevState, props) => {
      let hcEffort = keepCloning(prevState.headcountEffort);
      let programHcEffort = hcEffort[programIndex];
      let newHcEffort = programHcEffort.map((amount) => {
        if (displayType === "Annual" && amount.year === year) {
          amount.amount = quarterAmount;
        } else if (displayType === "Quarterly" && amount.year === year && amount.quarter === quarter) {
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
    this.setScenarioState({comparisonModelIndex: newComparisonModel});
  }


  render() {
    const {
      headcountEffort,
      externalSpend,
      displaySelections,
      revenueMilestones,
      scenarioDate,
      priorScenarioID,
      scenarioID
    } = this.state.scenarios[this.state.activeScenarioId];
 
    const {
      modelName,
      startYear,
      programs,
      scenarios,
      endYear,
      activeScenarioId
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

    let scenarioNames = scenarios.map((scenario) => {
      return scenario.scenarioName
    })

    let priorVersionIndex = 0
    scenarios.forEach((scenario, scenarioIndex) => {
      if (priorScenarioID === 0) {
        return priorVersionIndex = "Initial Model";
      } else if (priorScenarioID === scenario.scenarioID) {
        return priorVersionIndex = scenarioIndex;
      }
    })

    let cummPercentDiff = calculateCummPercentDiff(programs, startYear, yearsOut, scenarios, activeScenarioId, priorVersionIndex);


    return (
      <div id="grid">
        <HeaderBar
          modelName={this.state.modelName}
        />
        <SideNavigation
          scenarios={this.state.scenarios}
          activeScenarioId={this.state.activeScenarioId}
          setActiveScenarioId={this.setActiveScenarioId}
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
            scenarios={this.state.scenarios}
            addScenario={this.addScenario}
            deleteScenario={this.deleteScenario}
            editScenarioName={this.editScenarioName}
            setActiveScenarioId={this.setActiveScenarioId}
            activeScenarioId={this.state.activeScenarioId}
            setScenarioDate={this.setScenarioDate}
            startYear={startYear}
            yearsOut={yearsOut}
            setPriorScenario={this.setPriorScenario}
            scenarioNames = {scenarioNames}
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
            scenarioDate={scenarioDate}
            cummPercentDiff={cummPercentDiff}
            scenarios={scenarios}
            programs={programs}
            scenarioID={scenarioID}
          /> 
          <DeferredRevenueRoll
            startYear={startYear}
            yearsOut={yearsOut}
            displaySelections={displaySelections}
            percentComplete={percentComplete}
            percentCompleteCum={percentCompleteCum}
            revenueMilestones={revenueMilestones}
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
            scenarios={scenarios}
            scenarioNames={scenarioNames}
            totalSpend={totalSpend}
          />
          <PeriodAnalytic
            startYear={startYear}
            yearsOut={yearsOut}
            externalSpend={externalSpend}
            headcountEffort={headcountEffort}
            headcountSpend={headcountSpend}
            programs={programs}
            totalProgramSpend={totalProgramSpend}
            scenarios={scenarios}
            scenarioNames={scenarioNames}
            scenarioDate={scenarioDate}
          /> 
        </div>
      </div>
    )
  }
}

function HeaderBar({modelName}) {
  return(
    <div id="header">
      <h2>pharmaRevRec</h2>
      <h1 className="title">{modelName}</h1>
      <span>
        <a href="/logout/">Logout</a>
      </span>
    </div>
  )
}

function SideNavigation(props) {
  const {
    scenarios,
    activeScenarioId,
    setActiveScenarioId,
  } = props;

  let scenarioNames = scenarios.map((scenario) => {
    return(scenario.scenarioName);
  })

  let activeScenarioName = scenarios[activeScenarioId].scenarioName;

  return(
    <div id="sidebar">
      <a href="#Model_Setup">Setup</a>
      <a href="#Programs">Programs</a>
      <a href="#Headcount">Headcount</a>
      <a href="#Other_Cost">Other Cost</a>
      <a href="#Financings">Financings</a>
      <a href="#Cash_Rollforward">Reports</a>
      <hr></hr>
      <table>
        <tr>
          <td className="a">Active Version</td>
        </tr>
        <tr>
          <td>
            <select
              value={scenarios[activeScenarioId].scenarioName}
              onChange={(e) => setActiveScenarioId(e.target.value)}
            >
              <Dropdown options={scenarioNames}/>
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
    scenarios,
    addScenario,
    deleteScenario,
    editScenarioName,
    activeScenarioId,
    setScenarioDate,
    startYear,
    yearsOut,
    setPriorScenario,
    scenarioNames
  } = props;
    
  let periodSelections = periodLabels(startYear, yearsOut);
  let priorPeriodSelections = scenarioNames;
  priorPeriodSelections.unshift("N/A - Initial Version");

  let scenarioRows = scenarios.map((scenario, index) => {
    let scenarioName = scenario.scenarioName;
    let scenarioDate = scenario.scenarioDate;
    let priorScenarioName = scenarios.forEach((priorScenario) => {
      if (scenario.priorScenarioID === priorScenario.scenarioID) {
        return priorScenario.scenarioName;
      }
    });
    let priorModelSelections = priorPeriodSelections.slice();
    let currentModelName = priorModelSelections.indexOf(scenarioName)
    priorModelSelections.splice(currentModelName, 1);
    if (index === 0 || index <= activeScenarioId) {
      return (
        <React.Fragment>
          <tr>
            <td>
              <input
                value={scenarioName}
                onChange={(e) => editScenarioName(e.target.value, index)}
              />
            </td>
            <td> 
              <select
                value={scenarioDate}
                onChange={(e) => setScenarioDate(e.target.value, index)}
              >
                <Dropdown options={periodSelections}/>
              </select>
            </td>
            <td> 
              <select
                value={priorScenarioName}
                onChange={(e) => setPriorScenario(e.target.value, index)}
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
                value={scenarioName}
                onChange={(e) => editScenarioName(e.target.value, index)}
              />
            </td>
            <td> 
              <select
                value={scenarioDate}
                onChange={(e) => setScenarioDate(e.target.value, index)}
              >
                <Dropdown options={periodSelections}/>
              </select>
            </td>
            <td> 
              <select
                value={priorScenarioName}
                onChange={(e) => setPriorScenario(e.target.value, index)}
              >
                <Dropdown options={priorModelSelections}/>
              </select>
            </td>
            <DeleteItem index={index} removeItem={deleteScenario} />
          </tr>
        </React.Fragment>
      )
    }
  });
  
  return (
    <section id="Scenarios">
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
          {scenarioRows}
        </tbody>
      </table>
      <AddItem addItem={addScenario} label={'Version'}/>
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
            <th>FTE Rate</th>
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
              value={milestone.dateEarned}
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
            <th>FTE Rate</th>
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
            <th className="numerical">FTE Rate</th>
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
    scenarioDate,
    cummPercentDiff,
    scenarios,
    programs,
    scenarioID
  } = props;

  let selectedQtr = Number(scenarioDate[1]);
  let selectedYear = Number(scenarioDate.slice(3));
  
  let milestoneRows = revenueMilestones.map((milestone, milestoneIndex) => {
    let currentPeriodRev = calculateCurrentPeriodRev(startYear, yearsOut, milestone, percentCompleteCum);
    let modelPeriodRev = currentPeriodRev.map((period) => {
      let newPeriod = keepCloning(period);
      scenarios.forEach((scenario, scenarioIndex) => {
        if (scenarioID !== scenario.scenarioID) {
          let scenarioQtr = Number(scenario.scenarioDate[1]);
          let scenarioYear = Number(scenario.scenarioDate.slice(3));
          if (newPeriod.quarter === scenarioQtr && newPeriod.year === scenarioYear) {
            //calculate scenario cumm revenue//
            let currentHeadcountEffort = scenario.headcountEffort;
            let currentExternalSpend = scenario.externalSpend;
            
            let currentHeadcountSpend = calculateHeadcountSpend(currentHeadcountEffort, programs); 
            let currentTotalProgramSpend = calculateTotalSpendArrays(currentExternalSpend, currentHeadcountSpend);
            let currentTotalSpend = calculatePeriodTotal(currentTotalProgramSpend);
            let currentGrandTotalSpend = arrayTotal(currentTotalSpend);

            let currentPercentComplete = percentCompleteArray(currentTotalSpend);
            let currentPercentTotal = rounding(arrayTotal(currentPercentComplete), 1000000);
            let currentDollarCompleteCumm = dollarCompleteCummArray(currentTotalSpend)
            let currentPercentCompleteCumm = percentCompleteCummArray(currentDollarCompleteCumm, currentGrandTotalSpend);
         
            let versionRevenue = calculateCurrentPeriodRev(startYear, yearsOut, milestone, currentPercentCompleteCumm);
            versionRevenue.forEach((versionPeriod) => {
              if (versionPeriod.quarter === newPeriod.quarter && versionPeriod.year === newPeriod.year) {
                newPeriod.amount = versionPeriod.amount;
                return newPeriod;
              };
            })
          }
          return newPeriod;
        }
      })
      return newPeriod;
    })

    let totalCurrentPeriodRev = arrayTotal(modelPeriodRev);
    let priorPeriodRevTrueup = calculatePriorPeriodRevTrueup(cummPercentDiff, milestone,selectedYear, selectedQtr, startYear, yearsOut);
    let totalPriorPeriodRevTrueup = arrayTotal(priorPeriodRevTrueup);

    return (
      <React.Fragment>
        <tr>
          <td>{milestone.name} - Current Revenue</td>
          <DataRows
            startYear={startYear}
            displaySelections={displaySelections}
            dataArray={modelPeriodRev}
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
  })

  let milestoneRevEarned = revenueMilestones.map((milestone) => {
    let milestoneRev = calculateRevenue(startYear, yearsOut, milestone, percentComplete, percentCompleteCum); 
    return milestoneRev;
  })

  let totalRevenueEarned = calculatePeriodTotal(milestoneRevEarned);
  let grandTotalRevenue = arrayTotal(totalRevenueEarned);

  let currentPeriodRev = periodAmountCalc(totalRevenueEarned, selectedQtr, selectedYear, "QTD") 
  let currentYTDPeriodRev = periodAmountCalc(totalRevenueEarned, selectedQtr, selectedYear, "YTD")

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
            <td>{scenarioDate} QTD revenue</td>
            <td className="numerical">
              <NumberFormat
                displayType="text"
                value={rounding(currentPeriodRev,1)}
                thousandSeparator={true}
              />
            </td>
          </tr>
          <tr>
            <td>{scenarioDate} YTD revenue</td>
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
    percentCompleteCum
  } = props;

  let milestoneRevEarned = revenueMilestones.map((milestone) => {
    let milestoneRev = calculateRevenue(startYear, yearsOut, milestone, percentComplete, percentCompleteCum); 
    return milestoneRev;
  })

  let totalRevenueEarned = calculatePeriodTotal(milestoneRevEarned);

  let milestoneReceived = addDataArray(startYear, yearsOut);
  milestoneReceived.map((period, periodIndex) => {
    revenueMilestones.forEach((milestone) => {
      let milestoneEarnedQtr = Number(milestone.dateEarned.slice(1, 2));
      let milestoneEarnedYear = Number(milestone.dateEarned.slice(3));
      if (period.year === milestoneEarnedYear && period.quarter === milestoneEarnedQtr) {
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
      selectedPeriod: "Q1 2018",
      selectedComparisonIndex: 0,
      selectedPeriodType: "QTD"
    }

    this.setSelectedPeriod = this.setSelectedPeriod.bind(this);
    this.setSelectedComparisonIndex = this.setSelectedComparisonIndex.bind(this);
    this.setSelectedPeriodType = this.setSelectedPeriodType.bind(this);
  }

  setSelectedPeriod(newPeriod) {
    let newSelectedPeriod = newPeriod;
    this.setState({selectedPeriod: newPeriod});
  }

  setSelectedComparisonIndex(newComparison) {
    let scenarios = this.props.scenarios;
    let newIndex = 0;
    scenarios.forEach((scenario, scenarioIndex) => {
      if (scenario.scenarioName === newComparison) {
        newIndex = scenarioIndex
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
    let percentComplete = this.props.percentComplete;
    let percentCompleteCum = this.props.percentCompleteCum;
    let selectedQtr = Number(this.state.selectedPeriod[1]);
    let selectedYear = Number(this.state.selectedPeriod.slice(3));
    let periodSelections = periodLabels(startYear, yearsOut)
    let scenarios = this.props.scenarios;
    let revenueMilestones = this.props.revenueMilestones;
    let selectedPeriodType = this.state.selectedPeriodType;
    
    //Selected Period Variables//
    let externalSpend = this.props.externalSpend;
    let headcountSpend = this.props.headcountSpend;
    let totalProgramSpend = this.props.totalProgramSpend;
    let totalSpend = this.props.totalSpend;
    let headcountEffort = this.props.headcountEffort;
    let grandTotalSpend = this.props.grandTotalSpend;
    
    let milestoneRevEarned = revenueMilestones.map((milestone) => {
      let milestoneRev = calculateRevenue(startYear, yearsOut, milestone, percentComplete, percentCompleteCum); 
      return milestoneRev;
    })

    let totalMilestones

    let totalRevenueEarned = calculatePeriodTotal(milestoneRevEarned);
    let grandTotalRevenue = arrayTotal(totalRevenueEarned);
 
    let selectedRevenueEarned = periodAmountCalc(totalRevenueEarned, selectedQtr, selectedYear, selectedPeriodType);

    let selectedPeriodSpend = periodAmountCalc(totalSpend, selectedQtr, selectedYear, selectedPeriodType);
 
    //Comparison Period Variable//
    let comparisonModel = this.props.scenarios[this.state.selectedComparisonIndex];
    let compRevenueMilestones = comparisonModel.revenueMilestones;
    let compExternalSpend = comparisonModel.externalSpend;
    let compHeadcountEffort = comparisonModel.headcountEffort;
    let compHeadcountSpend = calculateHeadcountSpend(compHeadcountEffort, programs); 
    let compTotalProgramSpend = calculateTotalSpendArrays(compExternalSpend, compHeadcountSpend);
     
    let compTotalSpend = calculatePeriodTotal(compTotalProgramSpend);
    let compGrandTotal = arrayTotal(compTotalSpend);
    let compPercentComplete = percentCompleteArray(compTotalSpend);
    let compDollarCompleteCumm = dollarCompleteCummArray(compTotalSpend);
    let compPercentCompleteCumm = percentCompleteCummArray(compDollarCompleteCumm, compGrandTotal);

    let compMilestoneRevEarned = compRevenueMilestones.map((milestone) => {
      let milestoneRev = calculateRevenue(startYear, yearsOut, milestone, compPercentComplete, compPercentCompleteCumm); 
      return milestoneRev;
    })

    let compTotalRevenueEarned = calculatePeriodTotal(compMilestoneRevEarned);
    let compRevenueEarned = periodAmountCalc(compTotalRevenueEarned, selectedQtr, selectedYear, selectedPeriodType);

    let compSelectedPeriodSpend = periodAmountCalc(compTotalSpend, selectedQtr, selectedYear, selectedPeriodType);;

    //Program Change in Spend Rows//
    let periodBridgeRow = programs.map((program, programIndex) => {
      let selectedProgSpendPeriod = periodAmountCalc(totalProgramSpend[programIndex], selectedQtr, selectedYear, selectedPeriodType);
      let grandTotalProgramSpend = arrayTotal(totalProgramSpend[programIndex]);
      let compProgSpendPeriod = periodAmountCalc(compTotalProgramSpend[programIndex], selectedQtr, selectedYear, selectedPeriodType);
      let compGrandTotalProgramSpend = arrayTotal(compTotalProgramSpend[programIndex]);
      let periodDifference = grandTotalRevenue * (((compProgSpendPeriod / compGrandTotalProgramSpend)*(compGrandTotalProgramSpend / compGrandTotal)) - ((selectedProgSpendPeriod / grandTotalProgramSpend) * (grandTotalProgramSpend / this.props.grandTotalSpend)));
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
                value={rounding((((compProgSpendPeriod / compGrandTotalProgramSpend)*(compGrandTotalProgramSpend / compGrandTotal)) - ((selectedProgSpendPeriod / grandTotalProgramSpend) * (grandTotalProgramSpend / this.props.grandTotalSpend))) * 100, 1000)}
                thousandSeparator={true}
                suffix={"%"}
              />
            </td>
 
          </tr>
        </React.Fragment>
      )
    });

    return (
      <section id="Period-Bridge">
        <h2>Revenue Bridge</h2>
        <table>
          <tbody>
            <tr>
              <td>Selected Period</td>
              <td>
                <select
                  value={this.state.selectedPeriod}
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
                  value={scenarios[this.state.selectedComparisonIndex].scenarioName}
                  onChange={(e) => this.setSelectedComparisonIndex(e.target.value)}
                >
                  <Dropdown options={this.props.scenarioNames}/>
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
                  value={rounding(this.props.grandTotalSpend,1)}
                  thousandSeparator={true}
                />
              </td>
              <td className="numerical">
                <NumberFormat
                  displayType="text"
                  value={rounding((selectedPeriodSpend / this.props.grandTotalSpend)*100,1000)}
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
      selectedPeriod: this.props.scenarioDate, 
      selectedComparisonIndex: 0,
      selectedPeriodType: "QTD"
    }

    this.setSelectedPeriod = this.setSelectedPeriod.bind(this);
    this.setSelectedComparisonIndex = this.setSelectedComparisonIndex.bind(this);
    this.setSelectedPeriodType = this.setSelectedPeriodType.bind(this);
  }

  setSelectedPeriod(newPeriod) {
    let newSelectedPeriod = newPeriod;
    this.setState({selectedPeriod: newPeriod});
  }

  setSelectedComparisonIndex(newComparison) {
    let scenarios = this.props.scenarios;
    let newIndex = 0;
    scenarios.forEach((scenario, scenarioIndex) => {
      if (scenario.scenarioName === newComparison) {
        newIndex = scenarioIndex
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
    let scenarioDate = this.props.scenarioDate;
    let versionQtr = Number(scenarioDate[1]);
    let versionYear = Number(scenarioDate.slice(3));

    let selectedQtr = Number(this.state.selectedPeriod[1]);
    let selectedYear = Number(this.state.selectedPeriod.slice(3));
    let scenarios = this.props.scenarios;
    let selectedPeriodType = this.state.selectedPeriodType;
    let periodSelections = periodLabels(startYear, yearsOut)

    let comparisonModel = this.props.scenarios[this.state.selectedComparisonIndex];
    let compExternalSpend = comparisonModel.externalSpend;
    let compHeadcountEffort = comparisonModel.headcountEffort;
    let compHeadcountSpend = calculateHeadcountSpend(compHeadcountEffort, programs); 
    let compTotalProgramSpend = calculateTotalSpendArrays(compExternalSpend, compHeadcountSpend);
     
    let externalSpendAnalyticRows = programs.map((program, programIndex) => {
      let currentProgExtSpend = externalSpend[programIndex];
      let currentPeriodSpend = periodAmountCalc(currentProgExtSpend, versionQtr, versionYear, selectedPeriodType);
      let compProgExtSpend = compExternalSpend[programIndex];
      let compPeriodSpend = periodAmountCalc(compProgExtSpend, selectedQtr, selectedYear, selectedPeriodType)
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
      let currentPeriodSpend = periodAmountCalc(currentProgExtSpend, versionQtr, versionYear, selectedPeriodType);
      let compProgExtSpend = compHeadcountSpend[programIndex];
      let compPeriodSpend = periodAmountCalc(compProgExtSpend, selectedQtr, selectedYear, selectedPeriodType);
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
      let currentPeriodSpend = periodAmountCalc(currentProgExtSpend, versionQtr, versionYear, selectedPeriodType);
      let compProgExtSpend = compTotalProgramSpend[programIndex];
      let compPeriodSpend = periodAmountCalc(compProgExtSpend, selectedQtr, selectedYear, selectedPeriodType);
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

    return (
      <section id="Analytics">
        <h2>Analytic Engine</h2>
        <table>
          <tbody>
            <tr>
              <td>Selected Comparison Period</td>
              <td>
                <select
                  value={this.state.selectedPeriod}
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
                  value={scenarios[this.state.selectedComparisonIndex].scenarioName}
                  onChange={(e) => this.setSelectedComparisonIndex(e.target.value)}
                >
                  <Dropdown options={this.props.scenarioNames}/>
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
              onValueChange={(values, e) => editAmount(cell.type, cell.quarter, cell.year, Number(values.value), programIndex)}
              thousandSeparator={true}
              isNumericString={true}
              decimalScale={2}
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
    let cellYear = cell.year;
    let periodDisplayCheck = displaySelections.filter(year => year.year === cellYear)
    let periodDisplay = periodDisplayCheck[0];
    if (periodDisplay.type === "Annual" && cell.quarter === 4) {
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

  //Override the type to not sum in calculatedData function below//
  let displaySelectionsOverride = keepCloning(displaySelections).map((period) => {
    period.type = "Quarterly"
    return period;
  })
 
  let displayType = displayArray(displaySelectionsOverride);
  let calculatedData = dataToDisplay(displayType, dataArray);
  let dataCells = calculatedData.map((cell, cellIndex) => {
    let begOrEnd = 0;
    if (startOrEnd === "start") {
      begOrEnd = Number(1);
    } else if (startOrEnd === "end") {
      begOrEnd = Number(4);
    };
    let cellYear = cell.year;
    let periodDisplayCheck = displaySelections.filter(year => year.year === cellYear)
    let periodDisplay = periodDisplayCheck[0];
    if (periodDisplay.type === "Annual" && cell.quarter === begOrEnd) {
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


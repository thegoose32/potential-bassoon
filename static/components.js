import React from 'react'
import ReactDOM from 'react-dom'
import NumberFormat from 'react-number-format';
import {CSVLink} from 'react-csv';

import {displayOptions, newAmounts, defaultState, displayArray, dataToDisplay, periodLabels,
  displayType, yearsArray, addDataArray, editDataArrayLength, editDataArrayYears,
  arrayTotal, calculatePeriodTotal, keepCloning, rounding, calculateRevenue, 
  calculateHeadcountSpend

} from './model'

import styles from './index.scss'

export class LRP_Engine extends React.Component {
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

    //Model Setup
    this.setModelName = this.setModelName.bind(this);
    this.setStartYear = this.setStartYear.bind(this);
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

  setActiveScenarioId(newScenario) {
    this.setState(function(prevState, props) {
      let scenarios = prevState.scenarios;
      let newScenarioIndex = scenarios.findIndex(x => x.scenarioName === newScenario);
      return {
        activeScenarioId: newScenarioIndex 
      }
    })
  }

  setModelName(name) {
    this.setState({modelName: name});
  }

  setStartYear(startYear) {
    let startYearNum = Number(startYear);
    this.setState({startYear: startYearNum});
  }

  setYearsOut(yearsOut) {
    this.setScenarioState((prevState, props) => {
      let startYear = prevState.startYear;
      let extSpend = prevState.externalSpend;
      let hcSpend = prevState.headcountEffort;
      
      let newYearsOut = Number(yearsOut); 
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

      let newExtSpend = extSpend.map((array) => {
        let arrayLength = editDataArrayLength(array, startYear, newYearsOut);
        return editDataArrayYears(arrayLength, startYear, newYearsOut);
      })

      let newHCSpend = hcSpend.map((array) => {
        let arrayLength = editDataArrayLength(array, startYear, newYearsOut);
        return editDataArrayYears(arrayLength, startYear, newYearsOut);
      })


      return {
        yearsOut: newYearsOut,
        displaySelections: displaySelections,
        externalSpend: newExtSpend,
        headcountEffort: newHCSpend
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
    this.setScenarioState((prevState, props) => {
      let programArray = prevState.programs;
      let oldId = programArray[programArray.length - 1].id;
      let newId = oldId + 1;
      let newProgram = {
        name: "New Program",
        id: newId,
        fteRate: 250000
      }
      programArray.push(newProgram);

      //add external spend array//
      let newExtSpend = prevState.externalSpend;
      let startYear = prevState.startYear;
      let yearsOut = prevState.yearsOut;
      let newExtSpendArray = addDataArray(startYear, yearsOut);
      newExtSpend.push(newExtSpendArray);

      return {
        programs: programArray,
        externalSpend: newExtSpend
      }
    });
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
      let programArray = prevState.programs.slice();
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
      quarterAmount = rounding(newAmount / 4, 100);
    } 
    this.setScenarioState((prevState, props) => {
      let extSpend = prevState.externalSpend.slice();
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
      quarterAmount = rounding(newAmount / 4, 100);
    } 
    this.setScenarioState((prevState, props) => {
      let hcEffort = prevState.headcountEffort.slice();
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
      programs,
      revenueMilestones,
    } = this.state.scenarios[this.state.activeScenarioId];
 
    const {
      modelName,
      startYear,
      yearsOut,
    } = this.state;
    
    let headcountSpend = calculateHeadcountSpend(headcountEffort, programs); 
    let totalProgramSpend = externalSpend.map((progSpend, progIndex) => {
      let totalSpend = progSpend.map((extSpend, extSpendIndex) => {
        let copiedExtSpend = keepCloning(extSpend);
        copiedExtSpend.amount = rounding(extSpend.amount + headcountSpend[progIndex][extSpendIndex].amount, 100);
        return copiedExtSpend;
      })
      return totalSpend;
    });

    let totalSpend = calculatePeriodTotal(totalProgramSpend);
    let grandTotal = arrayTotal(totalSpend);

    let percentComplete = totalSpend.map((period, periodIndex) => {
      let periodCopy = keepCloning(period);
      periodCopy.amount = rounding(period.amount / grandTotal, 1000000);
      return periodCopy;
    });
    let percentTotal = rounding(arrayTotal(percentComplete), 1000000);

    let dollarCompleteCum = totalSpend.map((period, periodIndex) => {
      let totalSpendThruPeriod = keepCloning(totalSpend).slice(0, periodIndex + 1);
      let cummulativeTotal = arrayTotal(totalSpendThruPeriod);
      let periodCopy = keepCloning(period);
      periodCopy.amount = cummulativeTotal;
      return periodCopy;
    });

    let percentCompleteCum = dollarCompleteCum.map((period, periodIndex) => {
      let periodCopy = keepCloning(period);
      periodCopy.amount = rounding(period.amount / grandTotal, 1000000);
      return periodCopy;
    });
    let percentTotalCum = rounding(arrayTotal(percentComplete), 1000000);


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
          />
          <ScenarioManager
            scenario={this.state.scenarios}
            addScenario={this.addScenario}
            deleteScenario={this.deleteScenario}
            editScenarioName={this.editScenarioName}
            setActiveScenarioId={this.setActiveScenarioId}
            activeScenarioId={this.state.activeScenarioId}
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
            grandTotal={grandTotal}
            dollarCompleteCum={dollarCompleteCum}
            percentCompleteCum={percentCompleteCum}
            percentComplete={percentComplete}
            percentTotal={percentTotal}
            percentTotalCum={percentTotalCum}
            totalSpend={totalSpend}
          />
          <RevenueRecognized
            startYear={startYear}
            yearsOut={yearsOut}
            displaySelections={displaySelections}
            percentComplete={percentComplete}
            percentCompleteCum={percentCompleteCum}
            revenueMilestones={revenueMilestones}
          /> 
          <DeferredRevenueRoll
            startYear={startYear}
            yearsOut={yearsOut}
            displaySelections={displaySelections}
            percentComplete={percentComplete}
            percentCompleteCum={percentCompleteCum}
            revenueMilestones={revenueMilestones}
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
          <td className="a">Active Scenario</td>
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
      yearsOut: this.props.yearsOut,
    }
    
    this.setLocalStartYear = this.setLocalStartYear.bind(this);
    this.setLocalYearsOut = this.setLocalYearsOut.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  setLocalStartYear(startYear) {
    let startYearNum = Number(startYear);
    this.setState({startYear: startYearNum});
  }

  setLocalYearsOut(yearsOut) {
    let newYearsOut = Number(yearsOut); 
    this.setState({yearsOut: newYearsOut})
  }

  onSubmitClick(event) {
    this.props.setStartYear(this.state.startYear);
    this.props.setYearsOut(this.state.yearsOut);
  }

  render() {
    let modelName = this.props.modelName;
    let startYear = this.props.startYear;
    let setModelName = this.props.setModelName;
    let yearsOut = this.props.yearsOut;

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
                <input
                  value={this.state.startYear}
                  onChange={(e) => this.setLocalStartYear(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>Years Out</th>
              <td className="long">
                <input
                  value={this.state.yearsOut}
                  onChange={(e) => this.setLocalYearsOut(e.target.value)}
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
    scenario,
    addScenario,
    deleteScenario,
    editScenarioName,
    setActiveScenarioId,
    activeScenarioId
  } = props;

  let scenarioRows = scenario.map((scenario, index) => {
    let scenarioName = scenario.scenarioName;
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
            <DeleteItem index={index} removeItem={deleteScenario} />
          </tr>
        </React.Fragment>
      )
    }
  });
  
  return (
    <section id="Scenarios">
      <h2>Scenario Manager</h2>
      <table className="actions-column">
        <thead>
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {scenarioRows}
        </tbody>
      </table>
      <AddItem addItem={addScenario} label={'Scenario'}/>
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
        <tbody>
          <tr>
            <th>Year</th>
            <th>Display</th>
          </tr>
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
            <input
              onChange={(e) => editProgramFTERate(programIndex, e.target.value)}
              value={program.fteRate}
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
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>FTE Rate</th>
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
            <select
              value={milestone.datePaid}
              onChange={(e) => editMilestonePaid(milestoneIndex, e.target.value)}
            >
              <Dropdown options={periodSelections}/>
            </select>
          </td>
          <td>
            <input
              value={milestone.amount}
              onChange={(e) => editMilestoneAmount(milestoneIndex, e.target.value)}
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
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Period Earned</th>
            <th>Period Received</th>
            <th>Amount</th>
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
          <td>{totalProgSpend}</td>
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
            <td>{grandTotal}</td>
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
          <td>{programs[hcEffortIndex].fteRate}</td>
          <DataRows
            startYear={startYear}
            displaySelections={displaySelections}
            dataArray={hcEffort}
            yearsOut={yearsOut}
            editAmount={editHeadcountEffort}
            programIndex={hcEffortIndex}
            input="Yes"
          />
          <td>{totalHeadcountEffort}</td>
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
            <td>{grandTotal}</td>
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

  let headcountEffortSpend = headcountEffort.map((hcEffort, hcEffortIndex) => {
    let headcountSpend = hcEffort.map((hcSpend, hcSpendIndex) => {
      let copiedHcSpend = keepCloning(hcSpend);
      copiedHcSpend.amount = rounding(copiedHcSpend.amount * programs[hcEffortIndex].fteRate, 100);
      return copiedHcSpend
    })
    return headcountSpend;
  });

  let headcountEffortRow = headcountEffortSpend.map((hcEffort, hcEffortIndex) => {
    let totalHeadcountEffort = arrayTotal(hcEffort); 
    return (
      <React.Fragment>
        <tr>
          <td>{programs[hcEffortIndex].name}</td>
          <td>{programs[hcEffortIndex].fteRate}</td>
          <DataRows
            startYear={startYear}
            displaySelections={displaySelections}
            dataArray={hcEffort}
            yearsOut={yearsOut}
            input="No"
          />
          <td>{totalHeadcountEffort}</td>
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
            <th>FTE Rate</th>
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
            <td>{grandTotal}</td>
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
    grandTotal,
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
          <td>{totalProgramSpend}</td>
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
            <th>Total Program Spend</th>
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
            <td>{grandTotal}</td>
          </tr>
          <tr>
            <td>Total development costs (%)</td>
            <DataRows
              startYear={startYear}
              displaySelections={displaySelections}
              dataArray={percentComplete}
              yearsOut={yearsOut}
              input="No"
            />
            <td>{percentTotal}</td>
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
            />
            <td></td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}

function RevenueRecognized(props) {
  const {
    startYear,
    yearsOut,
    displaySelections,
    revenueMilestones,
    percentComplete,
    percentCompleteCum
  } = props;

  let milestoneRows = revenueMilestones.map((milestone, milestoneIndex) => {
    let milestoneRevEarned = calculateRevenue(startYear, yearsOut, milestone, percentComplete, percentCompleteCum); 
    let totalRevenueEarned = arrayTotal(milestoneRevEarned);

    return (
      <React.Fragment>
        <tr>
          <td>{milestone.name}</td>
          <DataRows
            startYear={startYear}
            displaySelections={displaySelections}
            dataArray={milestoneRevEarned}
            yearsOut={yearsOut}
            input="No"
          />
          <td>{rounding(totalRevenueEarned,10)}</td>
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
            <th>Total Milestone Revenue</th>
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
            <td>{grandTotalRevenue}</td>
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
            />
          </tr>
        </tbody>
      </table>
    </section>
  )
}

class PeriodAnalytic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPeriod: "Q1 2018"
    }

    this.setSelectedPeriod = this.setSelectedPeriod.bind(this);

  }

  setSelectedPeriod(newPeriod) {
    let newSelectedPeriod = newPeriod;
    this.setState({selectedPeriod: newPeriod});
  }

  render() {
    let programs = this.props.programs;
    let externalSpend = this.props.externalSpend;
    let headcountSpend = this.props.headcountSpend;
    let totalProgramSpend = this.props.totalProgramSpend;
    let headcountEffort = this.props.headcountEffort;

    let comparisonModel = this.props.scenarios[this.props.analyticComparisonIndex];
    let compExternalSpend = comparisonModel.externalSpend;
    let compHeadcountEffort = comparisonModel.externalSpend;

    
  
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
    <td className="action-cell">
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
        <th>{label}</th>
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
    input
  } = props;

  let years = yearsArray(startYear, yearsOut)
  let displayType = displayArray(displaySelections);
  let calculatedData = dataToDisplay(displayType, dataArray);
  let dataCells = calculatedData.map((cell, cellIndex) => {
    if (input === "Yes") {
      return(
        <React.Fragment>
          <td>
            <input
              type="number"
              value={rounding(cell.amount,10)}
              onChange={(e) => editAmount(cell.type, cell.quarter, cell.year, Number(e.target.value), programIndex)}
            />
          </td>
        </React.Fragment>
      )
    } else if (input === "No") {
      return(
        <React.Fragment>
          <td>{rounding(cell.amount,100)}</td>
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
        <td>{rounding(cell.amount, 100)}</td>
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
    input
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
    let cellYear = cell.year;
    let periodDisplayCheck = displaySelections.filter(year => year.year === cellYear)
    let periodDisplay = periodDisplayCheck[0];
    if (periodDisplay.type === "Annual" && cell.quarter === 4) {
      return(
        <React.Fragment>
          <td>{rounding(cell.amount,100)}</td>
        </React.Fragment>
      )
    } else if (periodDisplay.type === "Quarterly") {
      return(
        <React.Fragment>
          <td>{rounding(cell.amount,100)}</td>
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
  } = props;

  //Override the type to not sum in calculatedData function below//
  let displaySelectionsOverride = keepCloning(displaySelections).map((period) => {
    period.type = "Quarterly"
    return period;
  })
 
  let displayType = displayArray(displaySelectionsOverride);
  let calculatedData = dataToDisplay(displayType, dataArray);
  let dataCells = calculatedData.map((cell, cellIndex) => {
    let cellYear = cell.year;
    let periodDisplayCheck = displaySelections.filter(year => year.year === cellYear)
    let periodDisplay = periodDisplayCheck[0];
    if (periodDisplay.type === "Annual" && cell.quarter === 4) {
      return(
        <React.Fragment>
          <td>{rounding(cell.amount,100)}</td>
        </React.Fragment>
      )
    } else if (periodDisplay.type === "Quarterly") {
      return(
        <React.Fragment>
          <td>{rounding(cell.amount,100)}</td>
        </React.Fragment>
      )
    } else {
      return(null)
    }
  })
  return dataCells;
}

ReactDOM.render(
  <PharmaRevRec />,
  document.getElementById('root')
);



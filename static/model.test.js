import * as model from './model.js'

test("calculateYearsNegative", () => {
  const startYear = -20;
  const actual = model.calculateYears(startYear);
  const expected = ["Q1 -20", "Q2 -20", "Q3 -20", "Q4 -20", "Q1 -19", "Q2 -19", "Q3 -19", "Q4 -19", "Q1 -18", "Q2 -18", "Q3 -18", "Q4 -18", "FY -17", "FY -16"];
  expect(actual).toEqual(expected);
});

test("calculateYearsEightDigit", () => {
  const startYear = 102030;
  const actual = model.calculateYears(startYear);
  const expected = ["Q1 102030", "Q2 102030", "Q3 102030", "Q4 102030", "Q1 102031", "Q2 102031", "Q3 102031", "Q4 102031", "Q1 102032", "Q2 102032", "Q3 102032", "Q4 102032", "FY 102033", "FY 102034"];
  expect(actual).toEqual(expected);
});

test("beg cash calculation", () => {
  const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  const actual = model.begCash(1, [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
  expect(actual).toEqual(expected);
});

test("total Fiancings calculation", () => {
  const financings = [
    {
      item: 'Seed Round',
      period: "Q1 2018",
      amount: 7500000
    },
    {
      item: 'Series A',
      period: "Q4 2020",
      amount: 35000000
    },
    {
      item: 'IPO',
      period: "FY 2022",
      amount: -1000000
    }
  ];
  const years = ["Q1 2018", "Q2 2018", "Q3 2018", "Q4 2018", "Q1 2019", "Q2 2019", "Q3 2019", "Q4 2019", "Q1 2020", "Q2 2020", "Q3 2020", "Q4 2020", "FY 2021", "FY 2022"];
  const actual = model.totalFinancings(financings, years);
  const expected = [7500000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 35000000, 0, -1000000];
  expect(actual).toEqual(expected);
});

test("total Headcount calculation", () => {
  const headcount = [
    {
      dept: 'Research',
      class: 'R&D',
      payRate: 350000,
      FTEs: [4, 4.5, 5.5, 5.5, 6.5, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      dept: 'Clinical',
      class: 'R&D',
      payRate: 350000,
      FTEs: [0, 0, -1, -1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      dept: 'Manufacturing',
      class: 'R&D',
      payRate: 350000,
      FTEs: [0, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      dept: 'Operations',
      class: 'G&A',
      payRate: 300000,
      FTEs: [1, 1, 1, 20000, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      dept: 'Finance',
      class: 'G&A',
      payRate: 300000,
      FTEs: [1, -1, -1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      dept: 'Legal / IP',
      class: 'G&A',
      payRate: 300000,
      FTEs: [1, 1, 1, -2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    }
  ]
  const actual = model.calculateTotalHeadcount(headcount);
  const expected = [7, 5.5, 6.5, 20005.5, 16.5, 6, 6, 6, 6, 6, 6, 6, 6, 6];
  expect(actual).toEqual(expected);
});

test("total Headcount cost calculation", () => {
  const headcount = [
    {
      dept: 'Research',
      class: 'R&D',
      payRate: 100,
      FTEs: [4, 4.5, 5.5, 5.5, 6.5, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      dept: 'Clinical',
      class: 'R&D',
      payRate: 100,
      FTEs: [0, 0, -1, -1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      dept: 'Manufacturing',
      class: 'R&D',
      payRate: 100,
      FTEs: [0, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      dept: 'Operations',
      class: 'G&A',
      payRate: 200,
      FTEs: [1, 1, 1, 20000, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      dept: 'Finance',
      class: 'G&A',
      payRate: 200,
      FTEs: [1, -1, -1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      dept: 'Legal / IP',
      class: 'G&A',
      payRate: 200,
      FTEs: [1, 1, 1, -2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    }
  ];
  const actual = model.totalFTECost(headcount);
  const expected = [250, 162.5, 187.5, 1000137.5, 562.5, 225, 225, 225, 225, 225, 225, 225, 900, 900];
  expect(actual).toEqual(expected);
});

test("total other expenses - with out yearOneOverride", () => {
  const otherExpenses = [
    {
      item: 'Rent and Facilities',
      amount: [1200000, 1205000, 1210000, 1215000, 1220000, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    {
      item: 'Capital Expenditures',
      amount: [1000000, 1000000, 1500000, 1500000, 2000000, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    {
      item: 'Legal and IP costs',
      amount: [200000, 200000, 300000, 300000, 400000, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    {
      item: 'IPO costs',
      amount: [0, 0, 0, 13000000, -400000, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    {
      item: 'Facilities',
      amount: [-200000,-2234000, 2.5675, 3000.1274902, 400909,  1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  ];
  const yearOneOverrideYN = "No";
  const yearOneAmounts = [
    {
      dept: 'Research',
      program: 'Program A',
      expenseType: 'Program Cost',
      amount: [10, 20, 30, 40]
    },
    {
      dept: 'Research',
      program: 'Program A',
      expenseType: 'Other Cost',
      amount: [100, 200, 300, 400]
    },
    {
      dept: 'Research',
      program: 'Program A',
      expenseType: 'Headcount Cost',
      amount: [1000, 2000, 3000, 4000]
    }
  ];
  const actual = model.totalOtherExp(otherExpenses, yearOneOverrideYN, yearOneAmounts);
  const expected = [2200000, 171000, 3010002.5675, 16018000.1274902, 3620909,  5, 10, 15, 20, 25, 30, 35, 40, 45];
  expect(actual).toEqual(expected);
});

test("total other expenses - with yearOneOverride", () => {
  const otherExpenses = [
    {
      item: 'Rent and Facilities',
      amount: [1200000, 1205000, 1210000, 1215000, 1220000, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    {
      item: 'Capital Expenditures',
      amount: [1000000, 1000000, 1500000, 1500000, 2000000, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    {
      item: 'Legal and IP costs',
      amount: [200000, 200000, 300000, 300000, 400000, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    {
      item: 'IPO costs',
      amount: [0, 0, 0, 13000000, -400000, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    {
      item: 'Facilities',
      amount: [-200000,-2234000, 2.5675, 3000.1274902, 400909, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  ];
  const yearOneOverrideYN = "Yes";
  const yearOneAmounts = [
    {
      dept: 'Research',
      program: 'Program A',
      expenseType: 'Program Cost',
      amount: [10, 20, 30, 40]
    },
    {
      dept: 'Research',
      program: 'Program A',
      expenseType: 'Other Cost',
      amount: [100, 200, 300, 400]
    },
    {
      dept: 'Research',
      program: 'Program A',
      expenseType: 'Headcount Cost',
      amount: [1000, 2000, 3000, 4000]
    }
  ];
  const actual = model.totalOtherExp(otherExpenses, yearOneOverrideYN, yearOneAmounts);
  const expected = [100, 200, 300, 400, 3620909, 5, 10, 15, 20, 25, 30, 35, 40, 45];
  expect(actual).toEqual(expected);
});


test("test Discovery varRate, exclusion of program A, Preclinical fixedRate  - calculateStdCost", () => {
  const costPhaseLines = [
    {
      item: 'Standard Discovery Cost',
      amount: 2500000,
      type: 'Spread',
      phase: 'Discovery',
      program: 'All Programs'
    },
    {
      item: 'Standard Preclinical Cost',
      amount: 8000000,
      type: 'Spread',
      phase: 'Preclinical',
      program: 'All Programs'
    },
    {
      item: 'Standard Phase 1 Cost',
      amount: 35000000,
      type: 'Spread',
      phase: 'Phase 1',
      program: 'All Programs'
    },
    {
      item: 'Standard Phase 2 Cost',
      amount: 55000000,
      type: 'Spread',
      phase: 'Phase 2',
      program: 'All Programs'
    },
    {
      item: 'Standard Phase 3 Cost',
      amount: 85000000,
      type: 'Spread',
      phase: 'Phase 3',
      program: 'All Programs'
    },
    {
      item: 'Discovery added cost 1',
      amount: 5678,
      type: 'Start',
      phase: 'Discovery',
      program: 'All Programs'
    },
    {
      item: 'Discovery added cost 2',
      amount: 1234,
      type: 'Start',
      phase: 'Discovery',
      program: 'All Programs'
    },
    {
      item: 'Discovery added cost 3',
      amount: 901,
      type: 'End',
      phase: 'Discovery',
      program: 'All Programs'
    },
    {
      item: 'Discovery added cost 4',
      amount: 901,
      type: 'End',
      phase: 'Discovery',
      program: 'A'
    },
    {
      item: 'Preclinical added cost 5',
      amount: 901,
      type: 'Spread',
      phase: 'Preclinical',
      program: 'B'
    }, 
    {
      item: 'Discovery added cost 6',
      amount: 1001,
      type: 'Spread',
      phase: 'Discovery',
      program: 'All Programs'
    }, 
    {
      item: 'Discovery added cost 7',
      amount: 2002,
      type: 'Spread',
      phase: 'Preclinical',
      program: 'All Programs'
    } 
  ];
  const defaultPeriods = [ 
    {
      name: "Discovery",
      defaultPeriods: 2,
    },
    {
      name: "Preclinical",
      defaultPeriods: 3.5,
    },
    {
      name: "Phase 1",
      defaultPeriods: 3,
    },
    {
      name: "Phase 2",
      defaultPeriods: 2,
    },
    {
      name: "Phase 3",
      defaultPeriods: 3,
    }
  ];
  const actual = model.calculateStdCost(costPhaseLines, defaultPeriods);
  const expected = [
    {
      name: "Discovery",
      totalStartIndex: 6912,
      totalEndIndex: 901,
      totalFixed: 2501001,
      defaultPeriods: 2
    },
    {
      name: "Preclinical",
      totalStartIndex: 0,
      totalEndIndex: 0,
      totalFixed: 8002002,
      defaultPeriods: 3.5
    },
    {
      name: "Phase 1",
      totalStartIndex: 0,
      totalEndIndex: 0,
      totalFixed: 35000000,
      defaultPeriods: 3
    },
    {
      name: "Phase 2",
      totalStartIndex: 0,
      totalEndIndex: 0,
      totalFixed: 55000000,
      defaultPeriods: 2
    },
    {
      name: "Phase 3",
      totalStartIndex: 0,
      totalEndIndex: 0,
      totalFixed: 85000000,
      defaultPeriods: 3
    }
  ];
  expect(actual).toEqual(expected);
});

test("test fixed cost denominator - selected periods > default periods", () => {
  const defaultPeriods = [ 
    {
      name: "Discovery",
      defaultPeriods: 2.55,
    },
    {
      name: "Preclinical",
      defaultPeriods: 1,
    },
    {
      name: "Phase 1",
      defaultPeriods: -3,
    },
    {
      name: "Phase 2",
      defaultPeriods: 3,
    },
    {
      name: "Phase 3",
      defaultPeriods: 4.65,
    }
  ];
  const programTimeline = ["Discovery", "Discovery", "Discovery", "Preclinical", "Preclinical"];
  const devPhaseName = "Discovery";
  const actual = model.fixedCostDenominator(defaultPeriods, programTimeline, devPhaseName);
  const expected = 3;
  expect(actual).toEqual(expected);
});

test("test fixed cost denominator - selected periods < default periods", () => {
  const devPhases = [ 
    {
      name: "Discovery",
      defaultPeriods: 2.55,
    },
    {
      name: "Preclinical",
      defaultPeriods: 1,
    },
    {
      name: "Phase 1",
      defaultPeriods: -3,
    },
    {
      name: "Phase 2",
      defaultPeriods: 3,
    },
    {
      name: "Phase 3",
      defaultPeriods: 4.65,
    }
  ];
  const programTimeline = ["Discovery", "Discovery", "Preclinical", "Preclinical", "Preclinical"];
  const devPhaseName = "Discovery";
  const actual = model.fixedCostDenominator(devPhases, programTimeline, devPhaseName);
  const expected = 2.55;
  expect(actual).toEqual(expected);
});

test("calculateProgramCosts - 2 programs", () => {
  const programList = ["A", "B"];
  const programTimeline = [
    ["Discovery", "Discovery", "Discovery", "Discovery", "Discovery", "Discovery", "Discovery", "Discovery", "Preclinical", "Preclinical", "Preclinical", "Preclinical", "Phase 1", "Phase 1"],
    ["Discovery", "Discovery", "Discovery", "Discovery", "Preclinical", "Preclinical", "Preclinical", "Preclinical", "Phase 1", "Phase 1", "Phase 1", "Phase 1", "Phase 2", "Phase 3"]
  ];
  const costPhaseLines = [
    {
      item: 'Standard Discovery Cost',
      amount: 800,
      type: 'Spread',
      phase: 'Discovery',
      program: 'All Programs'
    },
    {
      item: 'Standard Preclinical Cost',
      amount: 1200,
      type: 'Spread',
      phase: 'Preclinical',
      program: 'All Programs'
    },
    {
      item: 'Standard Phase 1 Cost',
      amount: 3000,
      type: 'Spread',
      phase: 'Phase 1',
      program: 'All Programs'
    },
    {
      item: 'Standard Phase 2 Cost',
      amount: 6000,
      type: 'Spread',
      phase: 'Phase 2',
      program: 'All Programs'
    },
    {
      item: 'Standard Phase 3 Cost',
      amount: 9000,
      type: 'Spread',
      phase: 'Phase 3',
      program: 'All Programs'
    },
    {
      item: 'Discovery added cost 2',
      amount: 100,
      type: 'Start',
      phase: 'Discovery',
      program: 'All Programs'
    },
    {
      item: 'Discovery added cost 4',
      amount: 50,
      type: 'End',
      phase: 'Discovery',
      program: 'A'
    },
    {
      item: 'Preclinical added cost 5',
      amount: 40,
      type: 'Start',
      phase: 'Preclinical',
      program: 'B'
    }, 
  ];
  const devPhases = [ 
    {
      name: "Discovery",
      defaultPeriods: 8,
    },
    {
      name: "Preclinical",
      defaultPeriods: 4,
    },
    {
      name: "Phase 1",
      defaultPeriods: 12,
    },
    {
      name: "Phase 2",
      defaultPeriods: 12,
    },
    {
      name: "Phase 3",
      defaultPeriods: 12,
    }
  ];
  const actual = model.calculateProgramCosts(programList, programTimeline, costPhaseLines, devPhases);
  const expected = [
    [200, 100, 100, 100, 100, 100, 100, 150, 300, 300, 300, 300, 1000, 1000],
    [200, 100, 100, 100, 340, 300, 300, 300, 250, 250, 250, 250, 2000, 3000]
  ];
  expect(actual).toEqual(expected);
});

test("totalFTECost - with yearOneOverride", () => {
  const headcount = [
    {
      dept: 'Research',
      class: 'R&D',
      payRate: 100,
      FTEs: [4, 4.5, 5.5, 5.5, 6.5, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      dept: 'Clinical',
      class: 'R&D',
      payRate: 100,
      FTEs: [0, 0, -1, -1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      dept: 'Manufacturing',
      class: 'R&D',
      payRate: 100,
      FTEs: [0, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      dept: 'Operations',
      class: 'G&A',
      payRate: 200,
      FTEs: [1, 1, 1, 20000, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      dept: 'Finance',
      class: 'G&A',
      payRate: 200,
      FTEs: [1, -1, -1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      dept: 'Legal / IP',
      class: 'G&A',
      payRate: 200,
      FTEs: [1, 1, 1, -2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    }
  ];
  const yearOneOverrideYN = "Yes";
  const yearOneAmounts = [
    {
      dept: 'Research',
      program: 'Program A',
      expenseType: 'Program Cost',
      amount: [10, 20, 30, 40]
    },
    {
      dept: 'Research',
      program: 'Program A',
      expenseType: 'Other Cost',
      amount: [100, 200, 300, 400]
    },
    {
      dept: 'Research',
      program: 'Program A',
      expenseType: 'Headcount Cost',
      amount: [1000, 2000, 3000, 4000]
    }
  ];
  const actual = model.totalFTECost(headcount, yearOneOverrideYN, yearOneAmounts);
  const expected = [1000, 2000, 3000, 4000, 562.5, 225, 225, 225, 225, 225, 225, 225, 900, 900]
  expect(actual).toEqual(expected);
});

test("totalProgramExp - with yearOneOverride", () => {
  const programList = ["A", "B"];
  const programTimeline = [
    ["Discovery", "Discovery", "Discovery", "Discovery", "Discovery", "Discovery", "Discovery", "Discovery", "Preclinical", "Preclinical", "Preclinical", "Preclinical", "Phase 1", "Phase 1"],
    ["Discovery", "Discovery", "Discovery", "Discovery", "Preclinical", "Preclinical", "Preclinical", "Preclinical", "Phase 1", "Phase 1", "Phase 1", "Phase 1", "Phase 2", "Phase 3"]
  ];
  const costPhaseLines = [
    {
      item: 'Standard Discovery Cost',
      amount: 800,
      type: 'Spread',
      phase: 'Discovery',
      program: 'All Programs'
    },
    {
      item: 'Standard Preclinical Cost',
      amount: 1200,
      type: 'Spread',
      phase: 'Preclinical',
      program: 'All Programs'
    },
    {
      item: 'Standard Phase 1 Cost',
      amount: 3000,
      type: 'Spread',
      phase: 'Phase 1',
      program: 'All Programs'
    },
    {
      item: 'Standard Phase 2 Cost',
      amount: 6000,
      type: 'Spread',
      phase: 'Phase 2',
      program: 'All Programs'
    },
    {
      item: 'Standard Phase 3 Cost',
      amount: 9000,
      type: 'Spread',
      phase: 'Phase 3',
      program: 'All Programs'
    },
    {
      item: 'Discovery added cost 2',
      amount: 100,
      type: 'Start',
      phase: 'Discovery',
      program: 'All Programs'
    },
    {
      item: 'Discovery added cost 4',
      amount: 50,
      type: 'End',
      phase: 'Discovery',
      program: 'A'
    },
    {
      item: 'Preclinical added cost 5',
      amount: 40,
      type: 'Start',
      phase: 'Preclinical',
      program: 'B'
    }, 
  ];
  const devPhases = [ 
    {
      name: "Discovery",
      defaultPeriods: 8,
    },
    {
      name: "Preclinical",
      defaultPeriods: 4,
    },
    {
      name: "Phase 1",
      defaultPeriods: 12,
    },
    {
      name: "Phase 2",
      defaultPeriods: 12,
    },
    {
      name: "Phase 3",
      defaultPeriods: 12,
    }
  ];
  const yearOneOverrideYN = "Yes";
  const yearOneAmounts = [
    {
      dept: 'Research',
      program: 'Program A',
      expenseType: 'Program Cost',
      amount: [10, 20, 30, 40]
    },
    {
      dept: 'Research',
      program: 'Program A',
      expenseType: 'Other Cost',
      amount: [100, 200, 300, 400]
    },
    {
      dept: 'Research',
      program: 'Program A',
      expenseType: 'Headcount Cost',
      amount: [1000, 2000, 3000, 4000]
    }
  ];

  const actual = model.totalProgramExp(programList, programTimeline, costPhaseLines, devPhases, yearOneOverrideYN, yearOneAmounts);
  const expected = [10, 20, 30, 40, 440, 400, 400, 450, 550, 550, 550, 550, 3000, 4000]
  expect(actual).toEqual(expected);
});

test("totalProgramExp - without yearOneOverride", () => {
  const programList = ["A", "B"];
  const programTimeline = [
    ["Discovery", "Discovery", "Discovery", "Discovery", "Discovery", "Discovery", "Discovery", "Discovery", "Preclinical", "Preclinical", "Preclinical", "Preclinical", "Phase 1", "Phase 1"],
    ["Discovery", "Discovery", "Discovery", "Discovery", "Preclinical", "Preclinical", "Preclinical", "Preclinical", "Phase 1", "Phase 1", "Phase 1", "Phase 1", "Phase 2", "Phase 3"]
  ];
  const costPhaseLines = [
    {
      item: 'Standard Discovery Cost',
      amount: 800,
      type: 'Spread',
      phase: 'Discovery',
      program: 'All Programs'
    },
    {
      item: 'Standard Preclinical Cost',
      amount: 1200,
      type: 'Spread',
      phase: 'Preclinical',
      program: 'All Programs'
    },
    {
      item: 'Standard Phase 1 Cost',
      amount: 3000,
      type: 'Spread',
      phase: 'Phase 1',
      program: 'All Programs'
    },
    {
      item: 'Standard Phase 2 Cost',
      amount: 6000,
      type: 'Spread',
      phase: 'Phase 2',
      program: 'All Programs'
    },
    {
      item: 'Standard Phase 3 Cost',
      amount: 9000,
      type: 'Spread',
      phase: 'Phase 3',
      program: 'All Programs'
    },
    {
      item: 'Discovery added cost 2',
      amount: 100,
      type: 'Start',
      phase: 'Discovery',
      program: 'All Programs'
    },
    {
      item: 'Discovery added cost 4',
      amount: 50,
      type: 'End',
      phase: 'Discovery',
      program: 'A'
    },
    {
      item: 'Preclinical added cost 5',
      amount: 40,
      type: 'Start',
      phase: 'Preclinical',
      program: 'B'
    }, 
  ];
  const devPhases = [ 
    {
      name: "Discovery",
      defaultPeriods: 8,
    },
    {
      name: "Preclinical",
      defaultPeriods: 4,
    },
    {
      name: "Phase 1",
      defaultPeriods: 12,
    },
    {
      name: "Phase 2",
      defaultPeriods: 12,
    },
    {
      name: "Phase 3",
      defaultPeriods: 12,
    }
  ];
  const yearOneOverrideYN = "No";
  const yearOneAmounts = [
    {
      dept: 'Research',
      program: 'Program A',
      expenseType: 'Program Cost',
      amount: [10, 20, 30, 40]
    },
    {
      dept: 'Research',
      program: 'Program A',
      expenseType: 'Other Cost',
      amount: [100, 200, 300, 400]
    },
    {
      dept: 'Research',
      program: 'Program A',
      expenseType: 'Headcount Cost',
      amount: [1000, 2000, 3000, 4000]
    }
  ];
  const actual = model.totalProgramExp(programList, programTimeline, costPhaseLines, devPhases, yearOneOverrideYN, yearOneAmounts);
  const expected = [400, 200, 200, 200, 440, 400, 400, 450, 550, 550, 550, 550, 3000, 4000]
  expect(actual).toEqual(expected);
});

test("departmentTotalOtherExp", () => {
  const array = [
    {
      item: 'Rent and Facilities',
      dept: 'Research',
      amount: [100000, 100000, 100000, 100000, 105000, 105000, 105000, 105000, 110000, 110000, 110000, 110000, 440000, 475000] 
    },
    {
      item: 'Capital Expenditures',
      dept: 'Research',
      amount: [40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000] 
    },
    {
      item: 'Legal and IP costs',
      dept: 'Research',
      amount: [40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000]
    }
  ];
  const actual = model.departmentTotalOtherExp(array);
  const expected = [180000, 180000, 180000, 180000, 185000, 185000, 185000, 185000, 190000, 190000, 190000, 190000, 520000, 555000];
  expect(actual).toEqual(expected);
});

      
  

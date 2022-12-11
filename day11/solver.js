let inspections = [0, 0, 0, 0, 0, 0, 0, 0];

const monkeyList = [
  {
    items: [78, 53, 89, 51, 52, 59, 58, 85],
    op: (item) => item * 3,
    test: (item) => Number.isInteger(item / 5),
    first: 2,
    second: 7,
  },
  {
    items: [64],
    op: (item) => item + 7,
    test: (item) => Number.isInteger(item / 2),
    first: 3,
    second: 6,
  },
  {
    items: [71, 93, 65, 82],
    op: (item) => item + 5,
    test: (item) => Number.isInteger(item / 13),
    first: 5,
    second: 4,
  },
  {
    items: [67, 73, 95, 75, 56, 74],
    op: (item) => item + 8,
    test: (item) => Number.isInteger(item / 19),
    first: 6,
    second: 0,
  },
  {
    items: [85, 91, 90],
    op: (item) => item + 4,
    test: (item) => Number.isInteger(item / 11),
    first: 3,
    second: 1,
  },
  {
    items: [67, 96, 69, 55, 70, 83, 62],
    op: (item) => item * 2,
    test: (item) => Number.isInteger(item / 3),
    first: 4,
    second: 1,
  },
  {
    items: [53, 86, 98, 70, 64],
    op: (item) => item + 6,
    test: (item) => Number.isInteger(item / 7),
    first: 7,
    second: 0,
  },
  {
    items: [88, 64],
    op: (item) => item * item,
    test: (item) => Number.isInteger(item / 17),
    first: 2,
    second: 5,
  },
];

const monkeyLoop = () => {
  for (let monkeyIndex = 0; monkeyIndex < 8; monkeyIndex++) {
    for (let item of monkeyList[monkeyIndex].items) {
      inspections[monkeyIndex]++;
      const newItem = Math.floor(monkeyList[monkeyIndex].op(item) / 3);

      if (monkeyList[monkeyIndex].test(newItem) === true)
        monkeyList[monkeyList[monkeyIndex].first].items.push(newItem);
      else monkeyList[monkeyList[monkeyIndex].second].items.push(newItem);
    }
    monkeyList[monkeyIndex].items = [];
  }
};

for (let round = 0; round < 20; round++) {
  monkeyLoop();
}

inspections = inspections.sort((a, b) => b - a);
console.log(inspections[0] * inspections[1]);

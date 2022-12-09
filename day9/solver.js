const fs = require("fs");

const buff = fs.readFileSync("./input", "utf-8");

const lines = buff.split("\n");

const headPos = [0, 0];
const tailsPos = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];

const passedTailPos = [];

const moveHead = (direction) => {
  switch (direction) {
    case "U":
      headPos[0]++;
      break;
    case "R":
      headPos[1]++;
      break;
    case "D":
      headPos[0]--;
      break;
    case "L":
      headPos[1]--;
      break;
  }
};

const findLine = (tailItem, moveTo) => {
  if (tailItem[0] + 2 == moveTo[0] && tailItem[1] == moveTo[1]) {
    tailItem[0]++;
    return tailItem;
  }
  if (tailItem[0] == moveTo[0] && tailItem[1] + 2 == moveTo[1]) {
    tailItem[1]++;
    return tailItem;
  }
  if (tailItem[0] - 2 == moveTo[0] && tailItem[1] == moveTo[1]) {
    tailItem[0]--;
    return tailItem;
  }
  if (tailItem[0] == moveTo[0] && tailItem[1] - 2 == moveTo[1]) {
    tailItem[1]--;
    return tailItem;
  }
  return null;
};

const moveTail = (tailItem, moveTo, j) => {
  if (findLine(tailItem, moveTo) !== null) return tailItem;
  if (tailDist(tailItem, [moveTo[0] + 1, moveTo[1]]) === 1) {
    tailItem[0] = moveTo[0] + 1;
    tailItem[1] = moveTo[1];
    return tailItem;
  }
  if (tailDist(tailItem, [moveTo[0] - 1, moveTo[1]]) === 1) {
    tailItem[0] = moveTo[0] - 1;
    tailItem[1] = moveTo[1];
    return tailItem;
  }
  if (tailDist(tailItem, [moveTo[0], moveTo[1] + 1]) === 1) {
    tailItem[0] = moveTo[0];
    tailItem[1] = moveTo[1] + 1;
    return tailItem;
  }
  if (tailDist(tailItem, [moveTo[0], moveTo[1] - 1]) === 1) {
    tailItem[0] = moveTo[0];
    tailItem[1] = moveTo[1] - 1;
    return tailItem;
  }
  if (tailDist(tailItem, [moveTo[0] + 1, moveTo[1] + 1]) === 1) {
    tailItem[0] = moveTo[0] + 1;
    tailItem[1] = moveTo[1] + 1;
    return tailItem;
  }
  if (tailDist(tailItem, [moveTo[0] - 1, moveTo[1] - 1]) === 1) {
    tailItem[0] = moveTo[0] - 1;
    tailItem[1] = moveTo[1] - 1;
    return tailItem;
  }
  if (tailDist(tailItem, [moveTo[0] - 1, moveTo[1] + 1]) === 1) {
    tailItem[0] = moveTo[0] - 1;
    tailItem[1] = moveTo[1] + 1;
    return tailItem;
  }
  if (tailDist(tailItem, [moveTo[0] + 1, moveTo[1] - 1]) === 1) {
    tailItem[0] = moveTo[0] + 1;
    tailItem[1] = moveTo[1] - 1;
    return tailItem;
  }
  return tailItem;
};

const tailDist = (currentPos, currentHeadPos) => {
  if (
    currentPos[0] === currentHeadPos[0] &&
    currentPos[1] === currentHeadPos[1]
  )
    return 0;
  for (let i = currentPos[0] + 1; i != currentPos[0] - 2; i--) {
    for (let j = currentPos[1] + 1; j != currentPos[1] - 2; j--) {
      if (i === currentHeadPos[0] && j === currentHeadPos[1]) return 1;
    }
  }
  return 2;
};

const move = (splitedLine) => {
  for (let i = 0; i < parseInt(splitedLine[1]); i++) {
    moveHead(splitedLine[0]);
    for (let j = 0; tailsPos[j]; j++) {
      if (tailDist(tailsPos[j], j === 0 ? headPos : tailsPos[j - 1]) === 2) {
        moveTail(tailsPos[j], j === 0 ? headPos : tailsPos[j - 1], j);
      }
      if (j === 8 && !passedTailPos.includes(tailsPos[8] + " " + tailsPos[8]))
        passedTailPos.push(tailsPos[8] + " " + tailsPos[8]);
    }
  }
};

for (const line of lines) {
  const splitedLine = line.split(" ");
  move(splitedLine);
}

console.log(passedTailPos.length);

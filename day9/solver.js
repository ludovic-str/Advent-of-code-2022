const fs = require("fs");

const buff = fs.readFileSync("./input", "utf-8");

const lines = buff.split("\n");

const headPos = [0, 0];
const tailPos = [0, 0];

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

const findLine = () => {
  if (tailPos[0] + 2 == headPos[0] && tailPos[1] == headPos[1]) {
    tailPos[0]++;
    return 0;
  }
  if (tailPos[0] == headPos[0] && tailPos[1] + 2 == headPos[1]) {
    tailPos[1]++;
    return 0;
  }
  if (tailPos[0] - 2 == headPos[0] && tailPos[1] == headPos[1]) {
    tailPos[0]--;
    return 0;
  }
  if (tailPos[0] == headPos[0] && tailPos[1] - 2 == headPos[1]) {
    tailPos[1]--;
    return 0;
  }
  return 1;
};

const moveTail = () => {
  if (findLine() === 0) return;
  if (tailDist(tailPos, [headPos[0] + 1, headPos[1]]) === 1) {
    tailPos[0] = headPos[0] + 1;
    tailPos[1] = headPos[1];
    return 0;
  }
  if (tailDist(tailPos, [headPos[0] - 1, headPos[1]]) === 1) {
    tailPos[0] = headPos[0] - 1;
    tailPos[1] = headPos[1];
    return 0;
  }
  if (tailDist(tailPos, [headPos[0], headPos[1] + 1]) === 1) {
    tailPos[0] = headPos[0];
    tailPos[1] = headPos[1] + 1;
    return 0;
  }
  if (tailDist(tailPos, [headPos[0], headPos[1] - 1]) === 1) {
    tailPos[0] = headPos[0];
    tailPos[1] = headPos[1] - 1;
    return 0;
  }
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
    if (tailDist(tailPos, headPos) === 2) moveTail();
    if (!passedTailPos.includes(tailPos[0] + " " + tailPos[1]))
      passedTailPos.push(tailPos[0] + " " + tailPos[1]);
  }
};

for (const line of lines) {
  const splitedLine = line.split(" ");
  move(splitedLine);
}

//console.log(passedTailPos);
console.log(passedTailPos.length);

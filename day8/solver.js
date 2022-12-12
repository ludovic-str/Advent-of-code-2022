const fs = require("fs");

const buff = fs.readFileSync("./input", "utf-8");

const lines = buff.split("\n");

let total = 0;

const isTop = (posI, posJ) => {
  let high = parseInt(lines[posI][posJ]);
  let up = 0;
  let total = 0;
  for (let i = posI + 1; i <= lines.length - 1; i++) {
    total++;
    if (high <= parseInt(lines[i][posJ])) {
      up = 1;
      break;
    }
  }
  return total;
};

const isBottom = (posI, posJ) => {
  let high = parseInt(lines[posI][posJ]);
  let down = 0;
  let total = 0;
  for (let i = posI - 1; i >= 0; i--) {
    total++;
    if (high <= parseInt(lines[i][posJ])) {
      down = 1;
      break;
    }
  }
  return total;
};

const isLeft = (posI, posJ) => {
  let high = parseInt(lines[posI][posJ]);
  let down = 0;
  let total = 0;
  for (let j = posJ - 1; j >= 0; j--) {
    total++;
    if (high <= parseInt(lines[posI][j])) {
      down = 1;
      break;
    }
  }
  return total;
};

const isRight = (posI, posJ) => {
  let high = parseInt(lines[posI][posJ]);
  let up = 0;
  let total = 0;
  for (let j = posJ + 1; j <= lines.length - 1; j++) {
    total++;
    if (high <= parseInt(lines[posI][j])) {
      up = 1;
      break;
    }
  }
  return total;
};

for (let i = 0; lines[i]; i++) {
  for (let j = 0; lines[i][j]; j++) {
    if (
      i === 0 ||
      j === 0 ||
      j === lines[i].length - 1 ||
      i === lines.length - 1
    )
      continue;
    const tree = [isTop(i, j), isBottom(i, j), isLeft(i, j), isRight(i, j)];
    if (tree[0] * tree[1] * tree[2] * tree[3] > total) {
      total = tree[0] * tree[1] * tree[2] * tree[3];
    }
  }
}
console.log(total);

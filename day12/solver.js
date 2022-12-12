const fs = require("fs");
const { exit } = require("process");

const buff = fs.readFileSync("./input", "utf-8");

const lines = buff.split("\n");

let start = { x: 0, y: 0, value: 0 };
let end = { x: 0, y: 0, value: 26 };
const map = [];
let x = 0;

for (const line of lines) {
  map.push(
    line.split("").map((item, index) => {
      if (item === "S") {
        start = { x, y: index, value: 0 };
        return 0;
      }
      if (item === "E") {
        end = { x, y: index, value: 26 };
        return 26;
      }
      return item.charCodeAt(0) - 97;
    })
  ),
    x++;
}

let count = 1;

const checkTop = (pos, newPos) => {
  if (pos.x <= 0) return;
  if (
    pos.x - 1 === end.x &&
    pos.y === end.y &&
    (pos.value === 26 || pos.value === 25)
  ) {
    console.log(count);
    exit(0);
  }
  if (map[pos.x - 1][pos.y] !== -1 && map[pos.x - 1][pos.y] <= pos.value + 1) {
    newPos.push({
      x: pos.x - 1,
      y: pos.y,
      value: map[pos.x - 1][pos.y],
    });
    map[pos.x - 1][pos.y] = -1;
  }
};

const checkRight = (pos, newPos) => {
  if (pos.y >= map[0].length - 1) return;
  if (
    pos.x === end.x &&
    pos.y + 1 === end.y &&
    (pos.value === 26 || pos.value === 25)
  ) {
    console.log(count);
    exit(0);
  }
  if (map[pos.x][pos.y + 1] !== -1 && map[pos.x][pos.y + 1] <= pos.value + 1) {
    newPos.push({
      x: pos.x,
      y: pos.y + 1,
      value: map[pos.x][pos.y + 1],
    });
    map[pos.x][pos.y + 1] = -1;
  }
};

const checkDown = (pos, newPos) => {
  if (pos.x >= map.length - 1) return;
  if (
    pos.x + 1 === end.x &&
    pos.y === end.y &&
    (pos.value === 26 || pos.value === 25)
  ) {
    console.log(count);
    exit(0);
  }
  if (map[pos.x + 1][pos.y] !== -1 && map[pos.x + 1][pos.y] <= pos.value + 1) {
    newPos.push({
      x: pos.x + 1,
      y: pos.y,
      value: map[pos.x + 1][pos.y],
    });
    map[pos.x + 1][pos.y] = -1;
  }
};

const checkLeft = (pos, newPos) => {
  if (pos.y <= 0) return;
  if (
    pos.x === end.x &&
    pos.y - 1 === end.y &&
    (pos.value === 26 || pos.value === 25)
  ) {
    console.log(count);
    exit(0);
  }
  if (map[pos.x][pos.y - 1] !== -1 && map[pos.x][pos.y - 1] <= pos.value + 1) {
    newPos.push({
      x: pos.x,
      y: pos.y - 1,
      value: map[pos.x][pos.y - 1],
    });
    map[pos.x][pos.y - 1] = -1;
  }
};

const dumpMap = () => {
  for (const lines of map) {
    console.log(lines.join());
  }
};

const checkAtPos = (pos) => {
  let newPos = [];
  checkTop(pos, newPos);
  checkRight(pos, newPos);
  checkDown(pos, newPos);
  checkLeft(pos, newPos);
  return newPos;
};

const searchE = () => {
  let nextPos = checkAtPos(start);
  while (nextPos.length != 0) {
    count++;
    let size = nextPos.length;
    for (let i = 0; i < size; i++)
      nextPos = [...nextPos, ...checkAtPos(nextPos[i])];
    for (let i = 0; i < size; i++) nextPos.shift();
  }

  console.log(count);
};

searchE();

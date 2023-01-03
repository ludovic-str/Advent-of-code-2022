const fs = require("fs");

const buff = fs.readFileSync("./input", "utf-8");

const lines = buff.split("\n");
const rockPaths = [];
let smallestX = 1000;
let biggestX = 0;
let maxY = 0;

const map = [];

for (const line of lines) {
  let tmp = line.split("->");
  tmp = tmp.map((item) =>
    item.split(",").map((formatedItem) => parseInt(formatedItem.trim()))
  );
  for (const item of tmp) {
    if (item[0] < smallestX) smallestX = item[0];
    if (item[0] > biggestX) biggestX = item[0];
    if (item[1] > maxY) maxY = item[1];
  }
  rockPaths.push(tmp);
}

const dumpMap = () => {
  for (const line of map) {
    console.log(line.join().replaceAll(",", ""));
  }
  console.log();
};

const lenX = biggestX - smallestX;
const begin = 500;

for (let i = 0; i <= maxY + 2; i++) {
  const tmp = [];
  for (let j = 0; j <= lenX + begin * 2; j++) {
    if (i === maxY + 2) tmp.push("#");
    else tmp.push(".");
  }
  map.push(tmp);
}

map[0][begin + (500 - smallestX)] = "+";
for (const path of rockPaths) {
  for (let i = 1; i < path.length; i++) {
    let increment = path[i - 1][0] < path[i][0] ? 1 : -1;
    for (let j = path[i - 1][0]; j != path[i][0] + increment; j += increment)
      map[path[i][1]][begin + (j - smallestX)] = "#";
    increment = path[i - 1][1] < path[i][1] ? 1 : -1;
    for (let j = path[i - 1][1]; j != path[i][1] + increment; j += increment)
      map[j][begin + (path[i][0] - smallestX)] = "#";
  }
}

let count = 0;

while (1) {
  count++;
  let sand = [0, begin + (500 - smallestX)];
  while (1) {
    if (map[sand[0] + 1][sand[1]] === ".") {
      sand[0]++;
      continue;
    }
    if (map[sand[0] + 1][sand[1] - 1] === ".") {
      sand[0]++;
      sand[1]--;
      continue;
    }
    if (map[sand[0] + 1][sand[1] + 1] === ".") {
      sand[0]++;
      sand[1]++;
      continue;
    }
    break;
  }
  if (sand[0] === 0 && sand[1] === begin + (500 - smallestX)) break;
  map[sand[0]][sand[1]] = "o";
}
dumpMap();
console.log(count);

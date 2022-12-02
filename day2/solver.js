const fs = require("fs");

const buff = fs.readFileSync("./input", "utf-8");

const lines = buff.split("\n");

let score = 0;

for (const line of lines) {
  const items = line.split(" ");
  console.log(items);
  if (items.length) {
    if (items[0] === "A") {
      if (items[1] === "X") score += 3;
      if (items[1] === "Y") score += 4;
      if (items[1] === "Z") score += 8;
    }
    if (items[0] === "B") {
      if (items[1] === "X") score += 1;
      if (items[1] === "Y") score += 5;
      if (items[1] === "Z") score += 9;
    }
    if (items[0] === "C") {
      if (items[1] === "X") score += 2;
      if (items[1] === "Y") score += 6;
      if (items[1] === "Z") score += 7;
    }
  }
}

console.log(score);

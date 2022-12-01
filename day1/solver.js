const fs = require("fs");

const buff = fs.readFileSync("./input", "utf-8");

const lines = buff.split("\n");

const elvesFood = [];
let tmp = 0;

for (const elem of lines) {
  if (elem.length !== 0) {
    tmp += parseInt(elem);
  } else {
    elvesFood.push(tmp);
    tmp = 0;
  }
}

elvesFood.sort((a, b) => b - a);

console.log(elvesFood[0] + elvesFood[1] + elvesFood[2]);

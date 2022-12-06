const fs = require("fs");

const buff = fs.readFileSync("./input", "utf-8");

const areDifferent = (str) => {
  const tmp = [];

  for (const char of str) {
    if (tmp.includes(char)) return 0;
    tmp.push(char);
  }
  return 1;
};

const lines = buff.split("\n");

const line = lines[0];
console.log(line);
let tmp = [];
let i = 0;

for (const char of line) {
  i++;
  if (areDifferent(tmp) == 1 && tmp.length === 14) break;
  tmp.push(char);
  if (tmp.length >= 15) tmp.shift();
}
console.log(i - 1);

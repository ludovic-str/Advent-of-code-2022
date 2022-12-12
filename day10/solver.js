const fs = require("fs");

const buff = fs.readFileSync("./input", "utf-8");

const lines = buff.split("\n");
let cicles = 0;
let x = 1;
let i = 0;
let queue = [];
let sum = 0;
const mainCicles = [20, 60, 100, 140, 180, 220];
let crt = "";
const crtTab = [];

while (i < lines.length) {
  cicles++;
  crt += crt.length >= x - 1 && crt.length <= x + 1 ? "#" : ".";
  if (crt.length === 40) {
    crtTab.push(crt);
    crt = "";
  }
  if (mainCicles.includes(cicles)) {
    sum += x * cicles;
  }
  if (queue.length !== 0) {
    x += queue[0];
    queue.pop();
    i++;
    continue;
  }
  const splitedLine = lines[i].split(" ");
  if (splitedLine[0] === "noop") i++;
  else if (splitedLine[0] === "addx") queue.push(parseInt(splitedLine[1]));
}

console.log(crtTab);
console.log(sum);

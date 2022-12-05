const fs = require("fs");

const buff = fs.readFileSync("./input.txt", "utf-8");

const lines = buff.split("\n");

const stacks = [
  ["S", "T", "H", "F", "W", "R"],
  ["S", "G", "D", "Q", "W"],
  ["B", "T", "W"],
  ["D", "R", "W", "T", "N", "Q", "Z", "J"],
  ["F", "B", "H", "G", "L", "V", "T", "Z"],
  ["L", "P", "T", "C", "V", "B", "S", "G"],
  ["Z", "B", "R", "T", "W", "G", "P"],
  ["N", "G", "M", "T", "C", "J", "R"],
  ["L", "G", "B", "W"],
];

for (const line of lines) {
  const splitedLine = line.split(" ");
  const max = parseInt(splitedLine[1]);
  const popedItems = [];
  for (let i = 0; i < max; i++) {
    const item = stacks[parseInt(splitedLine[3]) - 1].pop();
    if (!item) continue;
    popedItems.push(item);
  }
  popedItems.reverse();
  stacks[parseInt(splitedLine[5]) - 1] =
    stacks[parseInt(splitedLine[5]) - 1].concat(popedItems);
}

let final = "";

for (const stack of stacks) {
  final += stack.pop();
}

console.log(final);

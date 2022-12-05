const fs = require("fs");

const buff = fs.readFileSync("./input", "utf-8");

const lines = buff.split("\n");

const p = parseInt;

let total = 0;

const range = (begin, end) => {
  const tab = [];
  let first = parseInt(begin);
  let second = parseInt(end);

  for (; first <= second; first++) tab.push(first);
  return tab;
};

for (const item of lines) {
  const elve = item.split(",");
  const first = elve[0].split("-");
  const second = elve[1].split("-");
  const fstRange = range(first[0], first[1]);
  const sndRange = range(second[0], second[1]);

  for (const nb of fstRange) {
    if (sndRange.includes(nb)) {
      total += 1;
      break;
    }
  }
}

console.log(total);

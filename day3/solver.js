const fs = require("fs");

const buff = fs.readFileSync("./input", "utf-8");

const lines = buff.split("\n");

const ex1 = () => {
  let total = 0;

  for (const item of lines) {
    const middle = item.length / 2;
    const s1 = item.slice(0, middle).split("");
    const s2 = item.slice(middle).split("");
    for (const char of s1) {
      if (s2.includes(char)) {
        total +=
          char === char.toLocaleUpperCase()
            ? char.charCodeAt(0) - 65 + 27
            : char.charCodeAt(0) - 96;
        break;
      }
    }
  }

  return total;
};

const ex2 = () => {
  let total = 0;
  let groups = [];
  let tmp = [];
  for (const item of lines) {
    tmp.push(item);
    if (tmp.length === 3) {
      groups.push(tmp);
      tmp = [];
    }
  }

  for (const group of groups) {
    for (const char of group[0]) {
      if (group[1].includes(char) && group[2].includes(char)) {
        total +=
          char === char.toLocaleUpperCase()
            ? char.charCodeAt(0) - 65 + 27
            : char.charCodeAt(0) - 96;
        break;
      }
    }
  }
  console.log(total);
};

ex2();

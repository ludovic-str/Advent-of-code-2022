const fs = require("fs");

const buff = fs.readFileSync("./input", "utf-8");

const lines = buff.split("\n");
const formatedLines = [];
const balise1 = [[2]];
const balise2 = [[6]];

for (const line of lines) {
  if (line.length === 0) continue;
  formatedLines.push(JSON.parse(line));
}

formatedLines.push(balise1);
formatedLines.push(balise2);

const compareTwo = (pair) => {
  const len = Math.min(pair[0].length, pair[1].length);
  const fst = pair[0];
  const snd = pair[1];
  //console.log(pair, len);
  for (let i = 0; i < len; i++) {
    let ret = null;
    if (Number.isInteger(fst[i]) && Number.isInteger(snd[i])) {
      if (fst[i] < snd[i]) return 1;
      if (fst[i] > snd[i]) return 0;
    }
    if (!Number.isInteger(fst[i]) && !Number.isInteger(snd[i])) {
      ret = compareTwo([fst[i], snd[i]]);
    }
    if (!Number.isInteger(fst[i]) && Number.isInteger(snd[i])) {
      ret = compareTwo([fst[i], [snd[i]]]);
    }
    if (Number.isInteger(fst[i]) && !Number.isInteger(snd[i])) {
      ret = compareTwo([[fst[i]], snd[i]]);
    }

    if (ret == 1) return 1;
    if (ret == 0) return 0;
  }
  if (fst.length < snd.length) return 1;
  else if (fst.length > snd.length) return 0;
  else return 2;
};

formatedLines.sort((a, b) => (compareTwo([a, b]) === 1 ? -1 : 1));

console.log(
  (formatedLines.indexOf(balise1) + 1) * (formatedLines.indexOf(balise2) + 1)
);

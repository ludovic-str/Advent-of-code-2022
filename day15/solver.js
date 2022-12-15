const fs = require("fs");

const buff = fs.readFileSync("./input", "utf-8");

const lines = buff.split("\n");

let sensorInfos = [];

let minX = 2000000;
let maxX = -2000000;

for (const line of lines) {
  const parseLine = line.split(" ");
  const infos = [
    parseInt(parseLine[2].split("=")[1]),
    parseInt(parseLine[3].split("=")[1].replace(":", "")),
    parseInt(parseLine[8].split("=")[1]),
    parseInt(parseLine[9].split("=")[1]),
  ];
  minX = Math.min(minX, infos[0], infos[2]);
  maxX = Math.max(maxX, infos[0], infos[2]);
  sensorInfos.push(infos);
}

let y = 2000000;
const maxRange = Math.max(
  ...sensorInfos.map((s) => Math.abs(s[0] - s[2]) + Math.abs(s[1] - s[3]))
);

let total = 0;

for (let x = minX - maxRange; x <= maxX + maxRange; x++) {
  let isSensor = 0;
  for (const sensor of sensorInfos) {
    if (x === sensor[2] && y === sensor[3]) {
      isSensor = 1;
      break;
    }
  }
  if (isSensor === 1) continue;

  for (const sensor of sensorInfos) {
    if (
      Math.abs(x - sensor[0]) + Math.abs(y - sensor[1]) <=
      Math.abs(sensor[0] - sensor[2]) + Math.abs(sensor[1] - sensor[3])
    ) {
      total++;
      break;
    }
  }
}

console.log(total);

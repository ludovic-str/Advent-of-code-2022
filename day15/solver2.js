const fs = require("fs");

const buff = fs.readFileSync("./input", "utf-8");

const lines = buff.split("\n");
Infinity;
let sensorInfos = [];
for (const line of lines) {
  const parseLine = line.split(" ");
  const infos = [
    parseInt(parseLine[2].split("=")[1]),
    parseInt(parseLine[3].split("=")[1].replace(":", "")),
    parseInt(parseLine[8].split("=")[1]),
    parseInt(parseLine[9].split("=")[1]),
  ];
  sensorInfos.push(infos);
}

const maxY = 4000000;

for (let row = 0; row <= maxY; row++) {
  const fillX = [];
  for (const sensorInfo of sensorInfos) {
    const distanceRow = Math.abs(sensorInfo[1] - row);
    const delta =
      Math.abs(sensorInfo[0] - sensorInfo[2]) +
      Math.abs(sensorInfo[1] - sensorInfo[3]) -
      distanceRow;

    if (delta <= 0) continue;

    fillX.push([
      Math.max(sensorInfo[0] - delta, 0),
      Math.min(sensorInfo[0] + delta, maxY),
    ]);
  }
  const str = ".".repeat(maxY).split("");
  for (const pos of fillX) {
    for (let i = pos[0]; i <= pos[1]; i++) str[i] = "#";
  }
  const index = str.indexOf(".");
  if (index != -1) {
    console.log(index * 4000000 + row);
    break;
  }
  console.log(row);
}

// for (let i = 0; i < fillX.length; i++) {
//   for (let j = 0; j < fillX.length; j++) {
//     if (i === j) continue;
//     if (fillX[i][1] >= fillX[j][0] && fillX[i][1] < fillX[j][1]) {
//       fillX[i][1] = fillX[j][1];
//       toPop.push(j);
//       continue;
//     }
//     if (fillX[i][0] >= fillX[j][1] && fillX[i][0] > fillX[j][0]) {
//       fillX[i][0] = fillX[j][0];
//       toPop.push(j);
//       continue;
//     }
//   }
// }
// console.log(fillX);
// break;

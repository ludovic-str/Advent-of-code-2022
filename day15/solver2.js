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

  let final = 0;

  while (1) {
    const range = fillX.find((item) => {
      if (item[0] <= final && final < item[1]) {
        final = item[1];
        return true;
      }
      return false;
    });

    if (range === undefined) break;
  }
  if (final !== maxY) {
    console.log(row + (final + 1) * 4000000);
    break;
  }
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

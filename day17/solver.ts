import fs from "fs";

const initMap = () => {
  const map: string[][] = [];

  for (let i = 0; i < 4; i++)
    map.push(["|", ".", ".", ".", ".", ".", ".", ".", "|"]);
  map.push(["+", "-", "-", "-", "-", "-", "-", "-", "+"]);
  return map;
};

const dumpMap = (map: string[][]) => {
  for (const line of map) {
    console.log(line.join(""));
  }
};

const getPieces = () => {
  return [
    ["@@@@"],
    [".@.", "@@@", ".@."],
    ["..@", "..@", "@@@"],
    ["@", "@", "@", "@"],
    ["@@", "@@"],
  ];
};

const drawPieces = (
  map: string[][],
  pieces: string[][],
  piecesIndex: number,
  startY: number,
  startX: number
) => {
  let posX = startX;
  let posY = startY;

  for (let i = 0; i < pieces[piecesIndex].length; i++) {
    for (let j = 0; j < pieces[piecesIndex][i].length; j++) {
      if (pieces[piecesIndex][i][j] === "@")
        map[posY][posX] = pieces[piecesIndex][i][j];
      posX++;
    }
    posY++;
    posX = startX;
  }
  return 0;
};

const drawFinalPieces = (
  map: string[][],
  pieces: string[][],
  piecesIndex: number,
  startY: number,
  startX: number
) => {
  let posX = startX;
  let posY = startY;

  for (let i = 0; i < pieces[piecesIndex].length; i++) {
    for (let j = 0; j < pieces[piecesIndex][i].length; j++) {
      if (pieces[piecesIndex][i][j] === "@") map[posY][posX] = "#";
      posX++;
    }
    posY++;
    posX = startX;
  }
  return 0;
};

const checkNextLine = (
  map: string[][],
  pieces: string[][],
  piecesIndex: number,
  posY: number,
  posX: number
) => {
  const line = pieces[piecesIndex];
  for (let i = 0; i < line.length; i++) {
    for (let j = 0; j < line[i].length; j++) {
      if (line[i][j] === "@") {
        if (map[posY + 1][posX + j] === "#" || map[posY + 1][posX + j] === "-")
          return 1;
      }
    }
    posY++;
  }
  return 0;
};

const checkRight = (
  map: string[][],
  pieces: string[][],
  piecesIndex: number,
  posY: number,
  posX: number
) => {
  const line = pieces[piecesIndex];
  for (let i = 0; i < line.length; i++) {
    for (let j = 0; j < line[i].length; j++) {
      if (line[i][j] === "@") {
        if (map[posY][posX + j + 1] === "#" || map[posY][posX + j + 1] === "-")
          return 1;
      }
    }
    posY++;
  }
  return 0;
};

const checkLeft = (
  map: string[][],
  pieces: string[][],
  piecesIndex: number,
  posY: number,
  posX: number
) => {
  const line = pieces[piecesIndex];
  for (let i = 0; i < line.length; i++) {
    for (let j = 0; j < line[i].length; j++) {
      if (line[i][j] === "@") {
        if (map[posY][posX + j - 1] === "#" || map[posY][posX + j - 1] === "-")
          return 1;
      }
    }
    posY++;
  }
  return 0;
};

const addLines = (map: string[][], pieces: string[][], piecesIndex: number) => {
  let i = 0;
  for (; i < map.length; i++) {
    if (map[i].includes("#")) break;
  }
  if (i < pieces[piecesIndex].length + 3) {
    for (; i < pieces[piecesIndex].length + 3; i++)
      map.unshift(["|", ".", ".", ".", ".", ".", ".", ".", "|"]);
  } else if (i > pieces[piecesIndex].length + 3) {
    for (; i > pieces[piecesIndex].length + 3; i--) map.shift();
  }
};

const playTurn = (
  buff: string,
  map: string[][],
  pieces: string[][],
  piecesIndex: number,
  actionIndex: number
) => {
  let posX = 3;
  let posY = 0;

  while (1) {
    if (actionIndex === buff.length) actionIndex = 0;
    if (
      buff[actionIndex] === ">" &&
      posX + pieces[piecesIndex][0].length <= 7 &&
      checkRight(map, pieces, piecesIndex, posY, posX) === 0
    )
      posX++;
    if (
      buff[actionIndex] === "<" &&
      posX > 1 &&
      checkLeft(map, pieces, piecesIndex, posY, posX) === 0
    )
      posX--;
    actionIndex++;
    if (checkNextLine(map, pieces, piecesIndex, posY, posX) === 1) break;
    posY++;
  }
  drawFinalPieces(map, pieces, piecesIndex, posY, posX);
  return actionIndex;
};

const play = (buff: string, map: string[][], pieces: string[][]) => {
  let piecesIndex = 0;
  let actionIndex = 0;

  for (let i = 0; i < 2020; i++) {
    actionIndex = playTurn(buff, map, pieces, piecesIndex, actionIndex);
    piecesIndex++;
    if (piecesIndex === 5) piecesIndex = 0;
    addLines(map, pieces, piecesIndex);
  }
  console.log(map.length - 2);
};

const main = () => {
  const buff = fs.readFileSync("./input", "utf-8");
  let map = initMap();
  const pieces = getPieces();

  play(buff, map, pieces);
};

main();

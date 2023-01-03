import fs from "fs";

const sides = [
  [0, 0, 1],
  [0, 0, -1],
  [0, 1, 0],
  [0, -1, 0],
  [1, 0, 0],
  [-1, 0, 0],
];

const arraysEqual = (a: number[], b: number[]) => {
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) if (a[i] !== b[i]) return false;
  return true;
};

const parseBuffer = (buff: string): number[][] => {
  const lineBuffer = buff.split("\n");
  const intBuffer: number[][] = [];

  for (const line of lineBuffer) intBuffer.push(line.split(",").map(Number));
  return intBuffer;
};

const algo = (formatedBuffer: number[][]) => {
  let total = 0;
  for (const item of formatedBuffer) {
    const toCheck = item;
    const edgePos = sides.map((item) => [
      toCheck[0] + item[0],
      toCheck[1] + item[1],
      toCheck[2] + item[2],
    ]);

    const res = formatedBuffer.filter((item) => {
      for (const edge of edgePos)
        if (arraysEqual(edge, item) === true) return true;
      return false;
    });

    total += 6 - res.length;
  }

  console.log(total);
};

const main = () => {
  const buff = fs.readFileSync("./input", "utf-8");
  const formatedBuffer = parseBuffer(buff);

  algo(formatedBuffer);
};

main();

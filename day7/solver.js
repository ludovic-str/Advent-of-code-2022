const fs = require("fs");

const buff = fs.readFileSync("./input", "utf-8");

let lines = buff.split("\n");

const removeUntilLastDir = (str) => {
  let lastDirPos = 0;
  let index = 0;
  for (const char of str) {
    index += 1;
    if (char === "/") lastDirPos = index;
  }
  return str.slice(0, lastDirPos - 1).length === 0
    ? "/"
    : str.slice(0, lastDirPos - 1);
};

let path = "/";
let files = [];
let total = 0;
let size = 0;

while (1) {
  for (const line of lines) {
    if (line[0] === "$") {
      files.push([path, total]);
      total = 0;
      break;
    }
    size += 1;
    const parsedLine = line.split(" ");
    if (parsedLine[0] === "dir") continue;
    total += parseInt(parsedLine[0]);
  }
  lines = lines.slice(size);
  size = 0;

  for (const line of lines) {
    size += 1;
    if (line[0] !== "$") break;
    const parsedLine = line.split(" ");
    if (parsedLine[1] === "cd") {
      if (parsedLine[2] === "..") path = removeUntilLastDir(path);
      else
        path +=
          path[path.length - 1] === "/" ? parsedLine[2] : "/" + parsedLine[2];
    }
  }

  lines = lines.slice(size - 1);
  size = 0;
  if (lines.length === 0) break;
}
files.push([path, total]);

let slashSize = 0;

for (const subfolder of files) {
  if (subfolder[0] !== "/" && subfolder[0].includes("/"))
    slashSize += subfolder[1];
}

let toFree = 30000000 - (70000000 - slashSize);
let folderSize = [];
let closest = 0;

for (const folder of files) {
  let totalFileSize = folder[1];
  for (const subfolder of files) {
    if (subfolder[0] !== folder[0] && subfolder[0].includes(folder[0]))
      totalFileSize += subfolder[1];
  }
  folderSize.push(totalFileSize);
  if (totalFileSize < toFree) continue;
  if (Math.abs(toFree - closest) > Math.abs(toFree - totalFileSize))
    closest = totalFileSize;
}

console.log(closest);

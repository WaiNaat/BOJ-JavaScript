/*
그림의 폭은 항상 짝수
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [info, ...drawing] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const [height, width] = info.split(' ').map(Number);

const result = drawing.map((line) => Array.from(line));

for (let h = 0; h < height; h += 1) {
  for (let w = 0; w < width; w += 1) {
    if (drawing[h][w] === '.') continue;

    const half = (width - 1) / 2;

    if (w < half) result[h][width - 1 - w] = drawing[h][w];
    else result[h][Math.floor(half) - (w - Math.ceil(half))] = drawing[h][w];
  }
}

console.log(result.map((row) => row.join('')).join('\n'));

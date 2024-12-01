/*
그리디
젤 무거운거+가벼운거 조합으로 최대한 무게제한 안넘게
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[, weightLimit], cats] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

cats.sort((a, b) => a - b);

let sol = 0;
let left = 0;
let right = cats.length - 1;

while (left < right) {
  if (cats[left] + cats[right] > weightLimit) {
    right -= 1;
  } else {
    left += 1;
    right -= 1;
    sol += 1;
  }
}

console.log(sol);

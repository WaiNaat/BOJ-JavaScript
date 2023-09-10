/*
앞에서부터 M명이 전부 민규씨의 친구면 됨
임의의 두 명을 바꿀 수 있으므로
앞에서 M명 중 민규씨의 친구가 아닌사람들을 쳐내면 끝
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[, friendCount], waitings, friendNumbers] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const friendWaitingNumbers = new Set(friendNumbers);

let sol = 0;
for (let i = 0; i < friendCount; i += 1) {
  if (!friendWaitingNumbers.has(waitings[i])) sol += 1;
}

console.log(sol);

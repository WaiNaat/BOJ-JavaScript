/*
열려있는걸 조절할 수 있나? 아마도
닫혀있는것도 조절은 할 수 있음

자스기준 아슬아슬하게 빅인트 필없을듯
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[tapCount], waters, , ...actions] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

let wpm = waters.reduce((prev, cur) => prev + cur, 0); // water per minute
const isOpen = new Array(tapCount).fill(true);
const sol = [wpm];

actions.forEach(([action, targetInput, water]) => {
  const target = targetInput - 1;
  if (action === 1) {
    if (isOpen[target]) wpm += -waters[target] + water;
    waters[target] = water;
  } else if (isOpen[target]) {
    isOpen[target] = false;
    wpm -= waters[target];
  } else {
    isOpen[target] = true;
    wpm += waters[target];
  }

  sol.push(wpm);
});

console.log(sol.join('\n'));

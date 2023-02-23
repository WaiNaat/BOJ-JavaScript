/*
1. +- 버튼만으로 이동하는 경우
2. 목표 채널 또는 그 근처의 채널로 바꾸고 +-로 이동하는 경우
*/
const canMoveByNumberButtons = (target, brokenButtons) => (
  target.split('').every((number) => !brokenButtons.has(number))
);

const findClosestMovableChannel = (target, brokenButtons) => {
  let result = Infinity;
  for (let channel = 0; channel <= 999_999; channel += 1) {
    if (canMoveByNumberButtons(channel.toString(), brokenButtons)) {
      result = Math.min(result, channel.toString().length + Math.abs(target - channel));
    }
  }
  return result;
};

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [target, _, ...brokenButtons] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(/\s/);

const moveCountByPlusMinusButtons = Math.abs(100 - Number(target));

const moveCountByNumberButtons = (
  findClosestMovableChannel(Number(target), new Set(brokenButtons))
);

console.log(Math.min(moveCountByNumberButtons, moveCountByPlusMinusButtons));

// 틀렸습니다 잡기술 쓰지마

/*
1끼리 0끼리 묶기
*/

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [info, data] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const [useThreshold, doneThreshold] = info.split(' ').map(Number);

const stack = [];
Array.from(data)
  .map(Number)
  .forEach((isStanding) => {
    if (stack.length && stack[stack.length - 1].isStanding === isStanding) {
      const { count } = stack.pop();
      stack.push({ isStanding, count: count + 1 });
    } else {
      stack.push({ isStanding, count: 1 });
    }
  });

if (stack[stack.length - 1].isStanding === 1) {
  stack.push({ isStanding: 0, count: doneThreshold });
} else {
  stack[stack.length - 1].count = doneThreshold;
}

const sol = [];
let isUsing = false;
let time = 0;

stack.forEach(({ isStanding, count }) => {
  if (!isUsing && isStanding && count >= useThreshold) {
    isUsing = true;
  }

  if (isUsing && !isStanding && count >= doneThreshold) {
    isUsing = false;
    sol.push(time + Math.min(count, doneThreshold));
  }

  time += count;
});

console.log(sol.join('\n'));

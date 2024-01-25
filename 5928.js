/*
0일 0시 0분부터 시간을 잰다 치고 시작시간이랑 끝시간 차이 구하기
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [day, hour, minute] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const toMinutes = (d, h, m) => {
  return d * 24 * 60 + h * 60 + m;
};

const gap = toMinutes(day, hour, minute) - toMinutes(11, 11, 11);

console.log(gap >= 0 ? gap : -1);

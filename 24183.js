/*
종이의 크기 X m^2
종이의 무게 Y g/m^2
무게 XY
봉투는 종이 2장
포스터도 종이 2장
안내지는 1장
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [c4, a3, a4] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const toMeters = (mm) => Number((mm / 10 / 100).toFixed(3));
const envelope = toMeters(229) * toMeters(324) * c4 * 2;
const posters = toMeters(297) * toMeters(420) * a3 * 2;
const info = toMeters(210) * toMeters(297) * a4;

console.log((envelope + posters + info).toFixed(4));

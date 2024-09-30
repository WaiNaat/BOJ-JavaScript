/*
총 세 번의 정렬을 하면 되는데
각 정렬마다 '버릴 과목' 하나를 정하고 나머지 두개의 합을 기준으로 정렬
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[, listenCount], ...lectures] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const getMaxStatus = (dropIndex) => {
  return lectures
    .map((lecture) => {
      return lecture.reduce((sum, value, index) => sum + (index === dropIndex ? 0 : value), 0);
    })
    .sort((a, b) => b - a)
    .slice(0, listenCount)
    .reduce((sum, value) => sum + value, 0);
};

const sol = Math.max(...Array.from({ length: 3 }, (_, idx) => getMaxStatus(idx)));

console.log(sol);

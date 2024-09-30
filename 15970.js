/*
그냥 분류해서 정렬하는 문제.
 */
const [, ...points] = require('fs')
  .readFileSync(0, 'utf-8')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

points.sort((a, b) => a[0] - b[0]);
const colorPoints = Array.from({ length: points.length + 1 }, () => []);
for (let i = 0; i < points.length; i += 1) {
  colorPoints[points[i][1]].push(points[i][0]);
}

const sol = colorPoints
  .map((pointList) => {
    return pointList.reduce((prev, cur, idx) => {
      return (
        prev +
        Math.min(cur - (pointList[idx - 1] ?? -Infinity), (pointList[idx + 1] ?? Infinity) - cur)
      );
    }, 0);
  })
  .reduce((prev, cur) => prev + cur);

console.log(sol);

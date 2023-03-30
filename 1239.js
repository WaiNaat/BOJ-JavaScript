/*
max(N)=8이니까 순열 가능

원의 중심을 지나는 선의 개수 세는 법:
12시 선을 0도라 하고 한 바퀴 돌았을 때 3600도라 하면 1% = 36도
도는 방향은 시계방향
각 부채꼴의 끝점 각도를 Set에 넣는 방향으로 계산 가능
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [_, ...dogNumbers] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(/\s/)
  .map(Number);

const allPermutations = (array) => {
  if (array.length === 1) return [array];

  const results = [];
  array.forEach((value, index) => {
    const remainderArray = [...array.slice(0, index), ...array.slice(index + 1)];
    results.push(
      ...(allPermutations(remainderArray).map((permutations) => [value, ...permutations])),
    );
  });

  return results;
};

const computeCrossLineCount = (ratios) => {
  let currentAngle = 0;
  let result = 0;
  const sectorEndAngles = new Set();

  ratios.forEach((ratio) => {
    currentAngle += ratio * 36;
    sectorEndAngles.add(currentAngle);
    if (sectorEndAngles.has(currentAngle - 1800)) result += 1;
  });

  return result;
};

const maxCrossLines = allPermutations(dogNumbers).map((ratios) => computeCrossLineCount(ratios));
const sol = Math.max(...maxCrossLines);

console.log(sol);

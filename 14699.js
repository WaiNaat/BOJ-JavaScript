/*
high(i) := i번 쉼터보다 높은 쉼터들
opt(i) := i번 쉼터에서 출발했을 때 최대로 방문할 수 있는 쉼터 수

opt(i) = max(opt(j))    단, j는 high(i)의 쉼터

높은 쉼터부터 탐색
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[shelterCount], heights, ...roads] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const higherShelters = Array.from(new Array(shelterCount), () => new Set());

roads.forEach(([a, b]) => {
  const one = a - 1;
  const another = b - 1;

  if (heights[one] < heights[another]) {
    higherShelters[one].add(another);
  } else if (heights[one] > heights[another]) {
    higherShelters[another].add(one);
  }
});

const shelterHeights = heights.map((height, index) => [index, height]);
const sortedShelter = shelterHeights
  .sort((one, another) => another[1] - one[1])
  .map(([shelter]) => shelter);

const maxShelterCounts = new Array(shelterCount).fill(1);

sortedShelter.forEach((shelter) => {
  const maxHigherShelterCount = [...higherShelters[shelter]].reduce(
    (prev, high) => Math.max(prev, maxShelterCounts[high]),
    0,
  );

  maxShelterCounts[shelter] = maxHigherShelterCount + 1;
});

console.log(maxShelterCounts.join('\n'));

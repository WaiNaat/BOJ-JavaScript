/*
어차피 엘베는 항상 1층에 있음
>> 각 층에서의 이동 순서만 알면 됨
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const testCases = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .slice(1);

const makeGetNextFloorsFunction = (tests) => {
  let i = 0;

  return () => {
    if (i >= tests.length) return [];

    const [height] = tests[i].split(' ').map(Number);
    const floors = tests.slice(i + 1, i + 1 + height).map((floor) => floor.split(' ').map(Number));
    i += height + 1;

    return floors;
  };
};

const getSortedIndexByCarOutOrder = (floor) => (
  floor.map((outOrder, index) => ({ outOrder, index }))
    .filter(({ outOrder }) => outOrder > 0)
    .sort((a, b) => a.outOrder - b.outOrder)
    .map(({ index }) => index)
);

const getMinDistance = (index1, index2, arrayLength) => {
  const smaller = Math.min(index1, index2);
  const larger = Math.max(index1, index2);

  return Math.min(larger - smaller, smaller + arrayLength - larger);
};

const getMovingTimeAtSingleFloor = (floor, height) => {
  const { time } = getSortedIndexByCarOutOrder(floor).reduce(
    ({ time, elevatorIndex }, carIndex) => ({
      time: time + height * 20 + getMinDistance(elevatorIndex, carIndex, floor.length) * 5,
      elevatorIndex: carIndex,
    }),
    { time: 0, elevatorIndex: 0 },
  );

  return time;
};

const getNextTestCase = makeGetNextFloorsFunction(testCases);
const sol = [];

for (
  let floors = getNextTestCase();
  floors.length > 0;
  floors = getNextTestCase()
) {
  const totalTime = floors.reduce((prev, floor, index) => (
    prev + getMovingTimeAtSingleFloor(floor, index)
  ), 0);

  sol.push(totalTime);
}

console.log(sol.join('\n'));

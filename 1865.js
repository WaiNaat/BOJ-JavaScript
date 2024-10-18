/*
아 파싱하기싫어!!!!!!!!!!!!

음수 사이클이 하나라도 있는지 찾으면 끝나는 문제
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...inputs] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const getTestCaseParser = () => {
  let i = 0;

  return () => {
    if (inputs.length <= i) {
      return undefined;
    }

    const [, roadCount, wormholeCount] = inputs[i];
    const size = roadCount + wormholeCount;
    const testCase = inputs.slice(i, i + size + 1);

    i += size + 1;

    return testCase;
  };
};
const getNextTestCase = getTestCaseParser();
const canGoToPast = (testCase) => {
  const [[vertexCount, roadCount], ...roads] = testCase;
  const times = Array.from({ length: vertexCount + 1 }, () => Number.MAX_SAFE_INTEGER - 10_000);
  const edges = [];
  roads.forEach(([start, end, time], index) => {
    const isWormhole = index >= roadCount;
    if (isWormhole) {
      edges.push([start, end, -time]);
    } else {
      edges.push([start, end, time]);
      edges.push([end, start, time]);
    }
  });

  times[1] = 0;

  for (let moveCount = 0; moveCount < vertexCount - 1; moveCount += 1) {
    edges.forEach(([start, end, time]) => {
      times[end] = Math.min(times[start] + time, times[end]);
    });
  }

  return edges.some(([start, end, time]) => {
    return times[start] + time < times[end];
  });
};

const sol = [];
for (let testCase = getNextTestCase(); testCase !== undefined; testCase = getNextTestCase()) {
  sol.push(canGoToPast(testCase) ? 'YES' : 'NO');
}

console.log(sol.join('\n'));

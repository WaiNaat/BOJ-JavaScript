/*
교차점은 무조건 지나야 함
교차점을 제외한 구간들의 합을 모아놓고 더 큰쪽으로 이동
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const inputs = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

inputs.pop();

const findCrosses = (one, another) => {
  const oneCrossIndices = [];
  const anotherCrossIndices = [];

  for (
    let oneIndex = oneCrossIndices.length > 0 ? oneCrossIndices[oneCrossIndices.length - 1] + 1 : 1;
    oneIndex < one.length;
    oneIndex += 1
  ) {
    for (
      let anotherIndex =
        anotherCrossIndices.length > 0 ? anotherCrossIndices[oneCrossIndices.length - 1] + 1 : 1;
      anotherIndex < another.length;
      anotherIndex += 1
    ) {
      if (one[oneIndex] === another[anotherIndex]) {
        oneCrossIndices.push(oneIndex);
        anotherCrossIndices.push(anotherIndex);
      }
    }
  }

  return [new Set(oneCrossIndices), new Set(anotherCrossIndices)];
};

const solve = (one, another) => {
  const [oneCrossIndices, anotherCrossIndices] = findCrosses(one, another);
  let result = 0;
  let oneIndex = 1;
  let anotherIndex = 1;

  while (oneIndex < one.length || anotherIndex < another.length) {
    let oneSectionSum = 0;
    let anotherSectionSum = 0;

    while (oneIndex < one.length && !oneCrossIndices.has(oneIndex)) {
      // console.log(oneIndex);
      oneSectionSum += one[oneIndex];
      // console.log(`${oneIndex} in section`);
      oneIndex += 1;
    }

    while (anotherIndex < another.length && !anotherCrossIndices.has(anotherIndex)) {
      anotherSectionSum += another[anotherIndex];
      anotherIndex += 1;
    }

    // console.log(oneSectionSum, anotherSectionSum);
    result += Math.max(oneSectionSum, anotherSectionSum);

    if (
      oneIndex < one.length &&
      anotherIndex < another.length &&
      oneCrossIndices.has(oneIndex) &&
      anotherCrossIndices.has(anotherIndex)
    ) {
      // console.log(one[oneIndex], another[anotherIndex], { oneIndex, anotherIndex });
      // console.log(`${oneIndex} in cross`);
      // console.log();
      result += one[oneIndex];
      oneIndex += 1;
      anotherIndex += 1;
    }
  }
  // console.log();
  // console.log(oneIndex, anotherIndex);
  // console.log();
  return result;
};

const sol = [];

for (let i = 0; i < inputs.length; i += 2) {
  sol.push(solve(inputs[i], inputs[i + 1]));
}

console.log(sol.join('\n'));

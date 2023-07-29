/*
같은 MBTI가 세 명이 나오면 무조건 0
48명 이상인 집단에서는 비둘기집 원리에 의해 같은 MBTI 세 명이 보장됨
48명 미만은 세명 뽑는 조합 하나씩 계산해보면 됨
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const tests = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const calcMbtiDiff = (one, another) => {
  let diff = 0;
  for (let i = 0; i < 4; i += 1) {
    if (one[i] !== another[i]) diff += 1;
  }
  return diff;
};

const calcMinDistance = (mbtiList) => {
  if (mbtiList.length >= 48) return 0;

  let minDistance = Infinity;

  for (let i = 0; i < mbtiList.length; i += 1) {
    for (let j = i + 1; j < mbtiList.length; j += 1) {
      for (let k = j + 1; k < mbtiList.length; k += 1) {
        const distance =
          calcMbtiDiff(mbtiList[i], mbtiList[j]) +
          calcMbtiDiff(mbtiList[i], mbtiList[k]) +
          calcMbtiDiff(mbtiList[j], mbtiList[k]);

        if (distance < minDistance) minDistance = distance;
      }
    }
  }

  return minDistance;
};

const sol = [];

for (let i = 2; i < tests.length; i += 2) {
  const mbtiList = tests[i].split(' ');
  sol.push(calcMinDistance(mbtiList));
}

console.log(sol.join('\n'));

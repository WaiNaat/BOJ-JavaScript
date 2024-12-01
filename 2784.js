/*
6개중에 3개를 골라서 가로줄로 사용 -> 순열
세로줄이 나머지 3개를 커버하는지 확인하면 끝

사전순으로 먼저 완성된 게 답 -> 정렬
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const words = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

function* generatePermutations() {
  for (let i = 0; i < 6; i += 1) {
    for (let j = 0; j < 6; j += 1) {
      if (i === j) continue;
      for (let k = 0; k < 6; k += 1) {
        if (i === k || j === k) continue;
        yield [i, j, k];
      }
    }
  }
}

const isValid = (permutation) => {
  const remainingIndices = new Set(Array.from({ length: 6 }, (_, idx) => idx));
  const result = [];

  permutation.forEach((idx) => {
    result.push(words[idx]);
    remainingIndices.delete(idx);
  });

  for (let i = 0; i < 3; i += 1) {
    const target = `${result[0][i]}${result[1][i]}${result[2][i]}`;
    const targetIndex = Array.from(remainingIndices).find((idx) => words[idx] === target);
    remainingIndices.delete(targetIndex);
  }

  return remainingIndices.size === 0;
};

const sol = Array.from(generatePermutations())
  .filter(isValid)
  .map((indices) => indices.map((i) => words[i]))
  .sort((a, b) => (a.join('') <= b.join('') ? -1 : 1))
  .at(0)
  ?.join('\n');

console.log(sol ?? 0);

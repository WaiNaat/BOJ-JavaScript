/*
각 숫자는 i 또는 N-i+1 두 가지 형태를 취할 수 있음

그리디
뒤에서부터 진행
i번 숫자에 대해
  변형된 값이 더 크고 이 때에도 i번부터 오름차순이라면 변형
  변형된 값이 더 크지만 i번부터 오름차순이 깨진다면 변형X
  변형도 해보고 그냥도 했는데 오름차순이 깨지면 실패
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const inputs = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const canMakeNonDecreasingSequence = (sequence) => {
  const result = [...sequence, Infinity];

  for (let i = result.length - 2; i >= 0; i -= 1) {
    const original = result[i];
    const modified = sequence.length - original + 1;

    if (original < modified && modified <= result[i + 1]) {
      result[i] = modified;
    } else if (original > result[i + 1] && modified <= result[i + 1]) {
      result[i] = modified;
    } else if (original > result[i + 1]) {
      return false;
    }
  }

  return true;
};

const sol = [];

for (let i = 2; i < inputs.length; i += 2) {
  sol.push(canMakeNonDecreasingSequence(inputs[i]) ? 'YES' : 'NO');
}

console.log(sol.join('\n'));

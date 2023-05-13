/*
슬라이딩 윈도우
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [pieCount, eatCount, ...tastyScores] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(/\s/)
  .map(Number);

let currentTastyScore = 0;
let right;

for (right = 0; right < eatCount; right += 1) {
  currentTastyScore += tastyScores[right];
}

let maxTastyScore = currentTastyScore;
let left = 1;

while (left !== 0) {
  currentTastyScore -= tastyScores[left - 1];
  currentTastyScore += tastyScores[right];

  if (currentTastyScore > maxTastyScore) maxTastyScore = currentTastyScore;

  left = (left + 1) % pieCount;
  right = (right + 1) % pieCount;
}

console.log(maxTastyScore);

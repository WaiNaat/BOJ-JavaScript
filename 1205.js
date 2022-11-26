/*
현재 랭킹리스트에서 태수보다 점수가 낮은애들 다 제거
넣을 수 있으면 태수점수 넣고 등수계산
없으면 -1
*/
// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [N, newScore, maxRankingLength, ...ranking] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(/\s/)
  .map(Number);

// process
while (ranking[ranking.length - 1] < newScore) ranking.pop();

let sol = -1;
if (ranking.length < maxRankingLength) {
  ranking.push(newScore);

  let currentRank = 0;
  let currentRankScore = -1;
  ranking.forEach((score, index) => {
    if (score !== currentRankScore) {
      currentRank = index + 1;
      currentRankScore = score;
    }
  });
  sol = currentRank;
}

// output
console.log(sol);

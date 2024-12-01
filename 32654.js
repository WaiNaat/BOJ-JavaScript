/*
그래프 탐색
한번 돌릴 때마다 지목당한 사람들을 set 으로 관리
돌린 횟수가 10 이상일때 지목당한 사람들 목록에 형진이가 없으면 성공
99번까지 돌렸는데 다 형진이가 있으면 실패
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const hands = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const solve = () => {
  let losers = new Set([1]);

  for (let i = 1; i <= 99; i += 1) {
    const next = new Set();

    losers.forEach((person) => {
      hands[person].forEach((target) => {
        next.add(target);
      });
    });

    if (i >= 10 && !next.has(1)) {
      return i;
    }

    losers = next;
  }

  return -1;
};

console.log(solve());

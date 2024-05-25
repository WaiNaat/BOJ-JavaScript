/*
2 x y: 정후의 당선 '가능성'을 보기 때문에 분산투표를 가정해야 함
  -> 정후보다 약한 후보들이 표를 나눠받는 게 유리

1번 연산은 그냥 하면됨
2번 연산은
  정후가 이기려면
  1. 정후 + x 이상의 표를 가진 후보가 애초에 있으면 안 됨
  2. 나머지 후보들이 받은 모든 표의 합 + y <= (정후+x-1) * N
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[candidateCount], ...events] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const votes = new Array(candidateCount + 1).fill(0);
let myVote = 0;
let maxVote = 0;
let voteSum = 0;

const sol = [];
events.forEach(([type, x, y]) => {
  switch (type) {
    case 1: {
      const isMe = y === candidateCount + 1;
      if (isMe) {
        myVote += x;
      } else {
        votes[y] += x;
        voteSum += x;
        maxVote = Math.max(maxVote, votes[y]);
      }
      break;
    }
    case 2: {
      if (myVote + x <= maxVote) {
        sol.push('NO');
        break;
      }
      const canWin = voteSum + y <= (myVote + x - 1) * candidateCount;
      sol.push(canWin ? 'YES' : 'NO');
      break;
    }
    default:
  }
});

console.log(sol.join('\n'));

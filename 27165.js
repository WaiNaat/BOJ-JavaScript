/*
완전탐색

1개인 칸의 개수가
  0개 -> 안전한 칸끼리 이동이 안 되면 실패
  1개 -> 1개의 뒤쪽에서 오거나 1개가 앞으로 갈 수 없으면 실패
  2개 -> 두 개를 합칠 수 없으면 실패
  3개 이상 -> 무조건 실패
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, board, [dice]] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const findFirstSolution = () => {
  const safe = [];
  const unsafe = [];

  board.forEach((value, idx) => {
    if (value >= 2) {
      safe.push(idx);
    } else if (value === 1) {
      unsafe.push(idx);
    }
  });

  switch (unsafe.length) {
    case 0:
      return safe.find((pos) => board[pos] >= 3 && board[pos + dice] >= 1);
    case 1: {
      if (board[unsafe[0] - dice] >= 3) {
        return unsafe[0] - dice;
      }
      if (board[unsafe[0] + dice] >= 1) {
        return unsafe[0];
      }
      return undefined;
    }
    case 2:
      return unsafe[0] + dice === unsafe[1] ? unsafe[0] : undefined;
    default:
      return undefined;
  }
};

const start = findFirstSolution();
const hasSolution = start !== undefined;

console.log(hasSolution ? 'YES' : 'NO');
if (hasSolution) {
  console.log(start, start + dice);
}

/*
당첨은?
  임의의 직사각형 칸에서 절반을 초과하는 칸이 같은 이름이면 당첨
같은 이름이 연속되어 있다
  -> 2*1 또는 1*2 천으로 덮으면 당첨
연속되어 있진 않은데 당첨인 경우
OXO
이게 끝인가?
그러면 그냥 완탐되는데
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[rowString, colString], ...board] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' '));

const row = Number(rowString);
const col = Number(colString);
const winners = new Set();

for (let r = 0; r < row; r += 1) {
  for (let c = 0; c < col; c += 1) {
    const target = board[r][c];
    if (winners.has(target)) {
      continue;
    }

    // 2개가 연속으로 같은 경우
    if (
      target === board[r - 1]?.[c] ||
      target === board[r][c - 1] ||
      target === board[r + 1]?.[c] ||
      target === board[r][c + 1]
    ) {
      winners.add(target);
      continue;
    }

    // 1*3 직사각형을 한 칸 띄우고 채우는 경우
    if (board[r][c + 2] === target) {
      winners.add(target);
      continue;
    }

    // 3*1 직사각형을 한 칸씩 띄워서 채우는 경우
    if (board[r + 2]?.[c] === target) {
      winners.add(target);
    }
  }
}

const winnerList = Array.from(winners).sort();

console.log(winnerList.length > 0 ? winnerList.join('\n') : 'MANIPULATED');

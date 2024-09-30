/*
R: 본인 아래쪽 두개가 R인지 확인
B: 본인 오른쪽이랑 아래쪽이 B인지 확인
하나라도 틀리면 실패
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...board] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(''));

const isValid = () => {
  for (let r = 0; r < board.length; r += 1) {
    for (let c = 0; c < r + 1; c += 1) {
      switch (board[r][c]) {
        case 'R': {
          const left = board[r + 1]?.[c] ?? null;
          const right = board[r + 1]?.[c + 1] ?? null;
          if (left !== 'R' || right !== 'R') {
            return false;
          }
          board[r][c] = '';
          board[r + 1][c] = '';
          board[r + 1][c + 1] = '';
          break;
        }
        case 'B': {
          const right = board[r]?.[c + 1] ?? null;
          const bottom = board[r + 1]?.[c + 1] ?? null;
          if (right !== 'B' || bottom !== 'B') {
            return false;
          }
          board[r][c] = '';
          board[r][c + 1] = '';
          board[r + 1][c + 1] = '';
          break;
        }
        default:
          break;
      }
    }
  }
  return true;
};

console.log(isValid() ? 1 : 0);

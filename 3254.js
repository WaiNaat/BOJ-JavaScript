/*
순수 구현
아래로 떨어지는건 만들기 귀찮으니까 90도 돌려서 배열 맨 끝에 넣는 방식으로 관리
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const inputs = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const TUNA = 0;
const KIMCHI = 1;
const board = Array.from({ length: 8 }, () => []);
const isWinner = (target) => {
  for (let r = 0; r < 8; r += 1) {
    for (let c = 0; c < 8; c += 1) {
      const horizontal =
        board[r][c] === target &&
        board[r][c + 1] === target &&
        board[r][c + 2] === target &&
        board[r][c + 3] === target;
      const vertical =
        board[r][c] === target &&
        board[r + 1]?.[c] === target &&
        board[r + 2]?.[c] === target &&
        board[r + 3]?.[c] === target;
      const diagonal1 =
        board[r][c] === target &&
        board[r + 1]?.[c - 1] === target &&
        board[r + 2]?.[c - 2] === target &&
        board[r + 3]?.[c - 3] === target;
      const diagonal2 =
        board[r][c] === target &&
        board[r + 1]?.[c + 1] === target &&
        board[r + 2]?.[c + 2] === target &&
        board[r + 3]?.[c + 3] === target;

      if (vertical || horizontal || diagonal1 || diagonal2) {
        return true;
      }
    }
  }
  return false;
};
const getGameResult = () => {
  for (let i = 0; i < inputs.length; i += 1) {
    const [sk, ji] = inputs[i];

    board[sk].push(TUNA);
    if (isWinner(TUNA)) {
      return `sk ${i + 1}`;
    }

    board[ji].push(KIMCHI);
    if (isWinner(KIMCHI)) {
      return `ji ${i + 1}`;
    }
  }
  return 'ss';
};

console.log(getGameResult());

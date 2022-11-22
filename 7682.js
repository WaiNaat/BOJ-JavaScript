/*
invalid 조건들
1. O가 X보다 많을 경우 또는 개수 차이가 2개 이상 날 경우
2. O가 이겼을 때 O개수 != X개수 인 경우
3. X가 이겼을 때 X개수 != O개수+1 인 경우
4. 승자가 없는데 빈칸이 있을 경우
*/
const countOX = (board) => {
  let XCount = 0;
  let OCount = 0;
  board.forEach((value) => {
    if (value === 'O') OCount += 1;
    if (value === 'X') XCount += 1;
  });

  if (OCount === XCount || OCount + 1 === XCount) return { OCount, XCount };
  throw new Error('CountError');
};

const winHorizontal = (player, board) => {
  for (let i = 0; i <= 6; i += 3) {
    if (board[i] === player && board[i] === board[i + 1] && board[i + 1] === board[i + 2]) {
      return true;
    }
  }
  return false;
};

const winVertical = (player, board) => {
  for (let i = 0; i <= 2; i += 1) {
    if (board[i] === player && board[i] === board[i + 3] && board[i + 3] === board[i + 6]) {
      return true;
    }
  }
  return false;
};

const winDiagonal = (player, board) => {
  if (board[0] === player && board[0] === board[4] && board[4] === board[8]) {
    return true;
  }
  if (board[2] === player && board[2] === board[4] && board[4] === board[6]) {
    return true;
  }
  return false;
};

const playerWins = (player, board) => (
  winHorizontal(player, board)
  || winVertical(player, board)
  || winDiagonal(player, board)
);

const validateWinner = (OCount, XCount, OWin, XWin) => {
  if (OWin && XWin) throw new Error('DoubleWinnerError');
  if (OWin && OCount === XCount) return;
  if (XWin && OCount + 1 === XCount) return;
  throw new Error('WinnerTurnError');
};

const validateEmpty = (board, someoneWin) => {
  if (someoneWin) return;
  if (board.includes('.')) throw new Error('GameNotEndError');
};

const validate = (board) => {
  try {
    const { OCount, XCount } = countOX(board);
    const OWin = playerWins('O', board);
    const XWin = playerWins('X', board);
    if (OWin || XWin) validateWinner(OCount, XCount, OWin, XWin);
    validateEmpty(board, (OWin || XWin));
    return 'valid';
  } catch {
    return 'invalid';
  }
};

// input
const inputFile = process.platform === 'linux' ? 'dev/stdin' : './input';
const testCases = require('fs').readFileSync(inputFile).toString().trim()
  .split('\n')
  .map((testCase) => testCase.split(''));

testCases.pop();

// process
const sol = [];
testCases.forEach((board) => { sol.push(validate(board)); });

// output
console.log(sol.join('\n'));

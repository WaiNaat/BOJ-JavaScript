const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const input = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

const inputParser = (inputs) => {
  let lineIndex = 0;

  return () => {
    if (lineIndex >= inputs.length) return [];

    const [R] = inputs[lineIndex].split(' ').map(Number);
    lineIndex += 1;

    const board = inputs.slice(lineIndex, lineIndex + R).map((row) => row.split(''));
    lineIndex += R;

    return board;
  };
};

const DIRECTIONS = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];

const countAdjacentMines = (board, r, c) => {
  const R = board.length;
  const C = board[0].length;

  let count = 0;
  DIRECTIONS.forEach(([dr, dc]) => {
    const r2 = r + dr;
    const c2 = c + dc;

    if (r2 < 0 || r2 >= R || c2 < 0 || c2 >= C) return;

    if (board[r2][c2] === '*') count += 1;
  });

  return count;
};

const countMines = (board) => {
  const R = board.length;
  const C = board[0].length;
  const answer = Array.from(new Array(R), () => new Array(C));

  board.forEach((row, r) => {
    row.forEach((value, c) => {
      if (value === '*') answer[r][c] = value;
      else answer[r][c] = countAdjacentMines(board, r, c);
    });
  });

  return answer;
};

const parseAnswerBoard = (board) => board.map((row) => row.join('')).join('\n');

const sol = [];
const getNextBoard = inputParser(input);

for (let board = getNextBoard(); board.length > 0; board = getNextBoard()) {
  sol.push(parseAnswerBoard(countMines(board)));
}

console.log(sol.join('\n'));

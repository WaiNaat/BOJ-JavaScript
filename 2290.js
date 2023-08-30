/*
그냥 구현
각 숫자의 가로 길이: s+2 (간격 고려하면 s+3)
각 숫자의 세로 길이: 2s+3
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [s, value] = require('fs').readFileSync(INPUT_FILE).toString().trim().split(' ');

const size = Number(s);
const board = Array.from(new Array(2 * size + 3), () =>
  new Array(value.length * (size + 3)).fill(' '),
);

const drawHorizontalLine = (col, position) => {
  let offset;

  if (position === 'top') offset = 0;
  else if (position === 'middle') offset = size + 1;
  else if (position === 'bottom') offset = 2 * size + 2;

  for (let i = 0; i < size; i += 1) board[offset][col + 1 + i] = '-';
};

const drawVerticalLine = (col, position) => {
  let rowOffset;
  let colOffset;

  if (position.includes('left')) colOffset = 0;
  else if (position.includes('right')) colOffset = size + 1;

  if (position.includes('top')) rowOffset = 1;
  else if (position.includes('bottom')) rowOffset = size + 2;

  for (let i = 0; i < size; i += 1) board[rowOffset + i][col + colOffset] = '|';
};

const drawOne = (startCol) => {
  drawVerticalLine(startCol, 'top right');
  drawVerticalLine(startCol, 'bottom right');
};

const drawTwo = (startCol) => {
  drawHorizontalLine(startCol, 'top');
  drawHorizontalLine(startCol, 'middle');
  drawHorizontalLine(startCol, 'bottom');
  drawVerticalLine(startCol, 'top right');
  drawVerticalLine(startCol, 'bottom left');
};

const drawThree = (startCol) => {
  drawHorizontalLine(startCol, 'top');
  drawHorizontalLine(startCol, 'middle');
  drawHorizontalLine(startCol, 'bottom');
  drawVerticalLine(startCol, 'top right');
  drawVerticalLine(startCol, 'bottom right');
};

const drawFour = (startCol) => {
  drawVerticalLine(startCol, 'top left');
  drawVerticalLine(startCol, 'top right');
  drawVerticalLine(startCol, 'bottom right');
  drawHorizontalLine(startCol, 'middle');
};

const drawFive = (startCol) => {
  drawHorizontalLine(startCol, 'top');
  drawHorizontalLine(startCol, 'middle');
  drawHorizontalLine(startCol, 'bottom');
  drawVerticalLine(startCol, 'top left');
  drawVerticalLine(startCol, 'bottom right');
};

const drawSix = (startCol) => {
  drawHorizontalLine(startCol, 'top');
  drawHorizontalLine(startCol, 'middle');
  drawHorizontalLine(startCol, 'bottom');
  drawVerticalLine(startCol, 'top left');
  drawVerticalLine(startCol, 'bottom right');
  drawVerticalLine(startCol, 'bottom left');
};

const drawSeven = (startCol) => {
  drawHorizontalLine(startCol, 'top');
  drawVerticalLine(startCol, 'top right');
  drawVerticalLine(startCol, 'bottom right');
};

const drawEight = (startCol) => {
  drawHorizontalLine(startCol, 'top');
  drawHorizontalLine(startCol, 'middle');
  drawHorizontalLine(startCol, 'bottom');
  drawVerticalLine(startCol, 'top right');
  drawVerticalLine(startCol, 'top left');
  drawVerticalLine(startCol, 'bottom right');
  drawVerticalLine(startCol, 'bottom left');
};

const drawNine = (startCol) => {
  drawHorizontalLine(startCol, 'top');
  drawHorizontalLine(startCol, 'middle');
  drawHorizontalLine(startCol, 'bottom');
  drawVerticalLine(startCol, 'top right');
  drawVerticalLine(startCol, 'top left');
  drawVerticalLine(startCol, 'bottom right');
};

const drawZero = (startCol) => {
  drawHorizontalLine(startCol, 'top');
  drawHorizontalLine(startCol, 'bottom');
  drawVerticalLine(startCol, 'top right');
  drawVerticalLine(startCol, 'top left');
  drawVerticalLine(startCol, 'bottom right');
  drawVerticalLine(startCol, 'bottom left');
};

for (let i = 0; i < value.length; i += 1) {
  const target = value[i];
  const startCol = i * (size + 3);

  if (target === '1') drawOne(startCol);
  if (target === '2') drawTwo(startCol);
  if (target === '3') drawThree(startCol);
  if (target === '4') drawFour(startCol);
  if (target === '5') drawFive(startCol);
  if (target === '6') drawSix(startCol);
  if (target === '7') drawSeven(startCol);
  if (target === '8') drawEight(startCol);
  if (target === '9') drawNine(startCol);
  if (target === '0') drawZero(startCol);
}

console.log(board.map((row) => row.join('')).join('\n'));

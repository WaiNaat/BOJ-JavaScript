const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [info, ...apt] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

const [row, col] = info.split(' ').map(Number);

const getWindowStatus = (startRow, startCol) => {
  for (let i = 0; i < 4; i += 1) {
    if (apt[startRow + i][startCol] === '.') return i;
  }

  return 4;
};

const statusCounts = [0, 0, 0, 0, 0];

for (let r = 0; r < row; r += 1) {
  for (let c = 0; c < col; c += 1) {
    statusCounts[getWindowStatus(r * 5 + 1, c * 5 + 1)] += 1;
  }
}

console.log(statusCounts.join(' '));

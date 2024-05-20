/*
1. 좌표를 배열의 위치로 바꿀 수 있어야 함
2. 꼬리를 무는 참조인지 판단해야 함
  이건 dfs를 써야할듯
*/
const A_CODE = 'A'.charCodeAt(0);
const posToCoordinates = (pos) => {
  const row = pos.charCodeAt(0) - A_CODE;
  const col = Number(pos[1]) - 1;
  return [row, col];
};
const parseCellValue = (value) => {
  if (!Number.isNaN(Number(value))) return Number(value);
  const references = value.split('+').map(posToCoordinates);
  return references;
};

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const spreadsheet = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((row) => row.split(' ').map(parseCellValue));

const visited = Array.from({ length: 10 }).map(() => Array.from({ length: 9 }));
const getValueAt = (row, col) => {
  let value = 0;

  if (Number.isInteger(spreadsheet[row][col])) {
    return spreadsheet[row][col];
  }

  if (visited[row][col]) {
    spreadsheet[row][col] = '*';
    return spreadsheet[row][col];
  }

  visited[row][col] = true;

  spreadsheet[row][col].forEach(([r2, c2]) => {
    value += getValueAt(r2, c2);
  });

  if (Number.isNaN(Number(value))) {
    spreadsheet[row][col] = '*';
    return spreadsheet[row][col];
  }

  spreadsheet[row][col] = value;
  return spreadsheet[row][col];
};

for (let r = 0; r < 10; r += 1) {
  for (let c = 0; c < 9; c += 1) {
    getValueAt(r, c);
  }
}

console.log(spreadsheet.map((row) => row.join(' ')).join('\n'));

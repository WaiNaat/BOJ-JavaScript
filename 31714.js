/*
행별로 키순 정렬
열별로 가능한지 비교

본인이 행에서 제일 키가 작은데 앞줄의 키가 제일 큰 사람이랑 비교하면 안보일 확률이 높음
그냥 비슷한 애들끼리 비교하는게 나음
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[row, col, heightDiff], ...rows] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const sortedRows = rows.map((row) => row.sort((a, b) => a - b));
let isSuccess = true;

for (let c = 0; c < col && isSuccess; c += 1) {
  for (let r = 1; r < row && isSuccess; r += 1) {
    if (sortedRows[r][c] + heightDiff <= sortedRows[r - 1][c]) {
      isSuccess = false;
    }
  }
}

console.log(isSuccess ? 'YES' : 'NO');

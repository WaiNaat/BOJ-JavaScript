/*
개수가 작긴함
등차수열 간격 고르는게 총 100가지
시작 행과 열 고르는게 100가지
끝 행과 열 고르는것도 100가지
  -> 이건 등차수열의 길이로 대체
완탐 될지도
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...matrix] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((row) => row.split('').map(Number));

const isSquareNumber = (value) => Math.sqrt(value) % 1 === 0;

const makeValue = (rowStart, colStart, rowSeqLength, colSeqLength, rowGap, colGap) => {
  const result = [];

  let r = rowStart;
  let c = colStart;
  let rowCount = 0;
  let colCount = 0;

  while (
    rowCount < rowSeqLength &&
    colCount < colSeqLength &&
    r >= 0 &&
    r < matrix.length &&
    c >= 0 &&
    c < matrix[0].length
  ) {
    result.push(matrix[r][c]);

    r += rowGap;
    c += colGap;
    rowCount += 1;
    colCount += 1;

    if (rowGap === 0 && colGap === 0) break;
  }

  return Number(result.join(''));
};

let sol = -1;

for (let r = 0; r < matrix.length; r += 1) {
  for (let c = 0; c < matrix[0].length; c += 1) {
    for (let rowGap = -matrix.length; rowGap < matrix.length; rowGap += 1) {
      for (let colGap = -matrix[0].length; colGap < matrix[0].length; colGap += 1) {
        for (let rowSeqLength = 1; rowSeqLength < 10; rowSeqLength += 1) {
          for (let colSeqLength = 1; colSeqLength < 10; colSeqLength += 1) {
            const value = makeValue(r, c, rowSeqLength, colSeqLength, rowGap, colGap);
            if (isSquareNumber(value)) {
              sol = Math.max(value, sol);
            }
          }
        }
      }
    }
  }
}

console.log(sol);

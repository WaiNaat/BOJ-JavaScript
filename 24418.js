/*
코드2: 이중for문 안에있으므로 n^2
코드1: 이건 해봐야겠는데
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [n] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n').map(Number);

let count = 0;
const matrixPathRec = (i, j) => {
  if (i === 0 || j === 0) {
    count += 1;
  } else {
    matrixPathRec(i - 1, j);
    matrixPathRec(i, j - 1);
  }
};
matrixPathRec(n, n);

console.log(count, n ** 2);

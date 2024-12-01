/*
3^0, 3^1, 3^2, 3^3 ...
이 값들을 절반으로 나눠서 반은 x, 반은 y를 만드는 데 쓸 수 있으면 성공
  경우의 수로 가면 숫자가 너무 큼
삼진법
  x와 y를 삼진법으로 나타냈을 때 0과 1로만 이루어져 있어야 함
  x에서 1인 부분은 y에서 0이어야 하고, x에서 0인 부분은 y에서 1이어야 함
  x와 y를 삼진법으로 나타내고 더했을 때 1111111.....1 이렇게 나오면 성공
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [x, y] = require('fs').readFileSync(INPUT_FILE).toString().trim().split(' ').map(Number);

const canMove = (x, y) => {
  if (x === 0 && y === 0) return true;

  const first = x.toString(3);
  const second = y.toString(3);
  const longer = first.length >= second.length ? first : second;
  const shorter = (first.length < second.length ? first : second).padStart(longer.length, '0');

  for (let i = 0; i < longer.length; i += 1) {
    const isValid =
      (longer[i] === '0' && shorter[i] === '1') || (longer[i] === '1' && shorter[i] === '0');
    if (!isValid) {
      return false;
    }
  }

  return true;
};

console.log(canMove(x, y) ? 1 : 0);

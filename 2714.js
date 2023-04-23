/*
달팽이 모양 탐색을 어떻게 수행할 것인가?

이동방향 순서: 오른쪽 아래쪽 왼쪽 위쪽

탐색하면서 이동
탐색한 공간은 값을 null로 변경
null을 만나면 방향 전환
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const testCases = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .slice(1)
  .map((testCase) => testCase.split(' '));

const DIRECTIONS = [[0, 1], [1, 0], [0, -1], [-1, 0]];

const getSnailDirectionMessage = (row, col, message) => {
  const result = [message[0]];

  const array = new Array(row).fill(null).map((value, index) => (
    message.slice(index * col, (index + 1) * col).split('')
  ));

  let r = 0;
  let c = 0;
  let direction = 0;
  let noMoveCount = 0;

  while (noMoveCount < 2) {
    const [dr, dc] = DIRECTIONS[direction];
    const r2 = r + dr;
    const c2 = c + dc;

    if (r2 < 0 || r2 >= row || c2 < 0 || c2 >= col || array[r2][c2] === null) {
      noMoveCount += 1;
      direction = (direction + 1) % 4;
    } else {
      noMoveCount = 0;

      result.push(array[r2][c2]);

      array[r][c] = null;
      r = r2;
      c = c2;
    }
  }

  return result.join('');
};

const decryptMessage = (message) => {
  const result = [];

  for (let i = 0; i < message.length; i += 5) {
    const binary = message.slice(i, i + 5);
    const alphabetIndex = parseInt(binary, 2);

    if (alphabetIndex === 0) result.push(' ');
    else result.push(String.fromCharCode(alphabetIndex - 1 + 'A'.charCodeAt(0)));
  }

  return result.join('').trimEnd();
};

const sol = [];

testCases.forEach(([row, col, message]) => {
  const parsedMessage = getSnailDirectionMessage(Number(row), Number(col), message);
  sol.push(decryptMessage(parsedMessage));
});

console.log(sol.join('\n'));

/*
1번 밟을 때는 무조건 통과

1*1칸은 2번 이상 밟아야 하면 무조건 실패

1*2 칸을 생각해보면
1-2-1-2... 이런식으로 원하는 횟수를 맞추고 다음 칸으로 이동 가능
  -> 칸이 짝수개면 무조건 가능

그럼 홀수개면?
  1 1 1 1 0
  1 1 1 1 0
  1 1 1 1 0
  1 1 1 1 0
  0 0 0 0 0
  이런식으로 짝수개 먼저 칠하는거 생각해봤는데 안됨
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [row, col, count] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

if (count === 1) console.log(1);
else if ((row * col) % 2 === 0) console.log(1);
else console.log(0);

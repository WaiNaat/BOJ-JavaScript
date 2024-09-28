/*
일단 정상적인 상황에서는 어디까지 올라갈 수 있는지를 알아야 함
그 이후를 이변으로 극복하는거임

토너먼트 방식은 최후의 승자가 무조건 강함
시은이를 위한 접대게임을 만들려면 본인보다 낮은애들을 묶어서 넣어줘야함

시은이가 6이면 12345로 접대 그룹을 만들어서 무조건 올릴 수 있는데
참가자가 2의 거듭제곱이니까 2^2 < 6 < 2^3 이라 무조건 2번 이기는 접대를 할수있음
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [total, magic, resistance] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const rounds = Math.floor(Math.log2(total));
const canWinCount = Math.floor(Math.log2(resistance));
const sol = Math.min(rounds, canWinCount + magic);

console.log(sol);

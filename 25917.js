/*
서로 다른 소수
  >> 각 행의 가중치가 서로 같은(겹치는) 일이 절대 없음

i번째 행의 가중치가 P_i번째에 위치...
  >> 그냥 각 행의 가중치를 구한다음에 순서만 바꿔주면 되므로 의미없음

결국 정답은 총 R개 행의 가중치를 만드는 경우의 수
  R*C개중 C개를 순서대로 배치
  R*C-C개중 C개를 순서대로 배치
  R*C-C-C개중 C개를 순서대로 배치
  ... 를 모두 곱한 값
  여기에 각 행의 순서는 의미가 없으므로 R!개로 나눠줌
  === (R*C)! / R!
*/
const DIVISOR = 998_244_353;

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[R, C], ...trash] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

// process
let sol = 1;
for (let i = R + 1; i <= R * C; i += 1) sol = (sol * i) % DIVISOR;

// output
console.log(sol);

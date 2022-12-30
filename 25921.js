/*
소수가 아닌 사람은 본인을 소인수분해했을 때 나오는 가장 작은 소인수랑 먹으면 됨
이러면 1번과 소수끼리만 아는 사이가 되면 된다
  2번은 1번이랑, 3번은 2번이랑, 5번은 3번이랑, 7번은 5번이랑, ... 이렇게해서 본인과 본인 직전 소수랑 먹으면
  기차놀이처럼 서로 연결 가능
  >> 결국 모든 소수는 자기 자신만큼의 비용을 지불하고 먹으면 됨

결국 해야 할 건?
에라토스테네스의 체를 돌면서 본인을 죽인 가장 작은 소수를 기억
*/
// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const N = Number(require('fs').readFileSync(INPUT_FILE).toString());

// process
const sieve = new Array(N + 1);
let sol = 0;

const killMultiple = (number) => {
  for (let victim = number; victim <= N; victim += number) {
    if (!sieve[victim]) {
      sieve[victim] = true;
      sol += number;
    }
  }
};

for (let number = 2; number <= N; number += 1) {
  if (!sieve[number]) killMultiple(number);
}

// output
console.log(sol);

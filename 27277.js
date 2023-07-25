// 틀렸습니다

/*
고수가 본인의 실력을 가장 많이 발휘할 수 있는 환경
-> 고수 앞에는 제일 못하는 사람

못하는 사람은 실력합을 애초에 벌기 힘듦
-> 못하는 사람 앞에 고수 둬서 버림패로

첫 사람은 제 실력 발휘 가능
-> 초고수를 맨 앞에
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...abilities] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

abilities.sort((a, b) => a - b);

let left = 0;
let flag = true;
const orders = [0];

while (left < abilities.length) {
  if (flag) {
    orders.push(abilities.pop());
  } else {
    orders.push(abilities[left]);
    left += 1;
  }

  flag = !flag;
}

const { sum } = orders.reduce(
  ({ prevValue, sum }, cur) => ({
    prevValue: cur,
    sum: sum + Math.max(0, cur - prevValue),
  }),
  { prevValue: 0, sum: 0 },
);

console.log(sum);

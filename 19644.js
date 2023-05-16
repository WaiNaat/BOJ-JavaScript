/*
구현?

앞에서부터 계산

각 좀비는 언제부터 기관총 범위 내로 들어오는가?
  - 현재시간이 t라고 하면 t부터 t+범위-1까지 총맞음
  - 좀비 한명은 t-범위 부터 t까지 총맞음

좀비가 올때까지 기관총으로 얼마만큼의 딜이 가능한가?
  - 좀비가 총맞는 시간 * dps

못죽이면 1m앞에서 지뢰

앞에서 사용한 지뢰 개수를 세야 함
사격범위 내 좀비의 기관총딜에서 빼야 함
--> 지뢰를 큐로 세야하나?
  - t-범위 부터 t까지 쓴 지뢰 개수만큼 빠짐
*/
// 야매 큐 구현
const queue = {
  list: [],
  start: 0,
  end: -1,
  length: 0,

  peek: function peek() {
    if (!this.length) throw new Error('Empty Queue');
    return this.list[this.start];
  },

  enqueue: function enqueue(value) {
    this.end += 1;
    this.length += 1;

    this.list.push(value);
  },

  dequeue: function dequeue() {
    if (!this.length) throw new Error('Empty Queue');
    this.start += 1;
    this.length -= 1;

    return this.list[this.start - 1];
  },
};

// 문제풀이
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [roadLength, range, power, mineCount, ...zombies] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(/\s/)
  .map(Number);

let result = true;
let remainingMineCount = mineCount;

for (let time = 1; time <= roadLength; time += 1) {
  const currentZombieHealth = zombies[time - 1];

  const damageTime = time < range ? time : range;

  while (queue.length && queue.peek() < time - range) {
    queue.dequeue();
  }
  const mineTime = queue.length;

  const damage = Math.max((damageTime - mineTime) * power, 0);

  if (currentZombieHealth - damage > 0) {
    if (remainingMineCount) {
      remainingMineCount -= 1;
      queue.enqueue(time);
    } else {
      result = false;
      break;
    }
  }
}

console.log(result ? 'YES' : 'NO');

/*
로봇은 컨테이너를 옮길 때마다 컨테이너의 무게만큼 비용을 발생
1에 가까울 수록 높은 우선순위
우선순위가 낮은 컨테이너를 먼저 적재
높은 우선순위의 컨테이너가 온다면 레일의 처음으로
  무게만큼 비용
우선순위가 같을 땐, 무게가 무거운 컨테이너를 아래에
우선순위가 같으면서 무게도 같은 경우는 어느 것이 위에 있어도 상관없다
우선순위는 같으나, 무게가 가벼운 컨테이너가 먼저 적재돼 있을 경우
  가벼운 컨테이너가 무거운 컨테이너 위로 갈 수 있도록 컨테이너를 빼내고 다시 적재
  뺄 때와 적재될 때 컨테이너의 무게만큼 비용이 발생

컨테이너 많아야 100개

낮은 우선순위부터 O(M)
  컨테이너 찾기 O(N)
  적재 O(N)
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[, maxPriority], ...containers] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const rail = {
  list: [],
  first: 0,
  length: 0,

  initialize(list) {
    this.list = list;
    this.length = list.length;
    this.first = 0;
  },

  push(value) {
    this.list.push(value);
    this.length += 1;
  },

  pop() {
    if (!this.list.length) return null;
    const value = this.list[this.first];
    this.first += 1;
    this.length -= 1;
    return value;
  },

  hasContainer(target) {
    return this.list.slice(this.first).filter(([priority]) => priority === target).length > 0;
  },

  peek() {
    return this.list[this.first];
  },
};

rail.initialize(containers);
const stack = [];
let cost = 0;

for (let priority = maxPriority; priority > 0; priority -= 1) {
  while (rail.hasContainer(priority)) {
    while (rail.length && rail.peek()[0] !== priority) {
      const container = rail.pop();
      rail.push(container);
      cost += container[1];
    }
    const container = rail.pop();
    const temp = [];

    while (stack.length && stack.at(-1)[0] === container[0] && stack.at(-1)[1] < container[1]) {
      const moving = stack.pop();
      temp.push(moving);
      cost += moving[1] * 2;
    }

    stack.push(container);
    cost += container[1];

    while (temp.length) {
      stack.push(temp.pop());
    }
  }
}

console.log(cost);

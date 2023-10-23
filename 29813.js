/*
가장 앞에 선 학생부터 자신의 최애의 팀원을 한 명씩 찾아간다
현재 팀원을 찾고 있는 학생과 가장 가까운 학생이 자신의 팀원이면 둘이 손을 잡고 떠난다
"패스"를 외치면 팀원 후보 중 가장 앞 사람은 한 바퀴 돌아서 다시 줄의 맨 끝에 서면 된다.
가장 앞에 선 친구의 학번이 X면 팀원은 X-1명을 패스하고 만난 그 다음 사람
마지막으로 남은 사람이 김한양의 최애의 팀원이 된다

큐
1000명이면 시뮬레이션 될듯?
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...students] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => {
    const [name, id] = line.split(' ');
    return [name, Number(id)];
  });

const queue = {
  first: 0,
  list: [],
  length: 0,

  initialize(list) {
    this.list = list;
    this.length = list.length;
  },

  enqueue(value) {
    this.list.push(value);
    this.length += 1;
  },

  dequeue() {
    if (!this.length) return null;
    const value = this.list[this.first];
    this.first += 1;
    this.length -= 1;
    return value;
  },
};

queue.initialize(students);

while (queue.length > 1) {
  const [, count] = queue.dequeue();
  for (let i = 0; i < count - 1; i += 1) {
    queue.enqueue(queue.dequeue());
  }
  queue.dequeue();
}

const [pair] = queue.dequeue();

console.log(pair);

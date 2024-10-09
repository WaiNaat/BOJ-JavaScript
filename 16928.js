/*
bfs
제약이 크지 않으므로 가짜 큐 사용
다음 이동지가 뱀 또는 사다리 출발점이면 이동횟수가 동일하므로 해당 값들을 큐에 먼저 넣도록 해야 함
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...ladderSnakes] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const next = Object.fromEntries(ladderSnakes);
const dice = Array.from({ length: 6 }, (_, idx) => idx + 1);
const visited = Array.from({ length: 101 }, () => false);
const q = {
  list: [],
  left: 0,
  length: 0,
  enqueue(val) {
    this.list.push(val);
    this.length += 1;
  },
  dequeue() {
    if (this.length === 0) return undefined;
    this.left += 1;
    this.length -= 1;
    return this.list[this.left - 1];
  },
};

q.enqueue({ position: 1, count: 0 });

let sol = Infinity;
while (q.length > 0) {
  const { position: cur, count } = q.dequeue();

  if (cur === 100) {
    sol = count;
    break;
  }

  if (visited[cur]) {
    continue;
  }
  visited[cur] = true;

  // 굴렸을 때 뱀사다리 먼저
  dice.forEach((spot) => {
    const nextPos = cur + spot;

    if (nextPos > 100 || visited[cur + spot]) {
      return;
    }

    if (next[nextPos]) {
      q.enqueue({ position: next[nextPos], count: count + 1 });
    }
  });

  // 일반 주사위 이동
  dice.forEach((spot) => {
    const nextPos = cur + spot;

    if (nextPos > 100 || visited[cur + spot]) {
      return;
    }

    if (!next[nextPos]) {
      q.enqueue({ position: nextPos, count: count + 1 });
    }
  });
}

console.log(sol);

/*
간선의 수가 대략 1백만 개인 그래프
중간급유가 가능할 경우 무조건 급유(방문하되 급유하지 않는건 손해)

현재 연료통의 크기가 X일 때 두 지점 사이의 거리가 X 이하면 이동 가능
최대 k번까지 이동해서 도착지까지 갈 수 있는지 판단
-> bfs

이분탐색
움직이는 값: 연료통의 크기
기준: 최대 k번의 이동으로 도착지까지 가는지
갈 수 없으면 연료통을 늘림
갈 수 있으면 연료통을 줄임
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[, maxStopoverCount], ...airports] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

airports.push([0, 0]);
airports.push([10000, 10000]);

const makeNode = (airport, stopoverCount) => ({ airport, stopoverCount, next: null });

class Queue {
  length = 0;
  start = null;
  end = null;

  enqueue(airport, stopoverCount) {
    const newNode = makeNode(airport, stopoverCount);

    if (this.length === 0) {
      this.start = newNode;
    } else {
      this.end.next = newNode;
    }

    this.end = newNode;
    this.length += 1;
  }

  dequeue() {
    if (this.length === 0) throw new Error('Queue Empty');

    const { airport, stopoverCount } = this.start;

    this.start = this.start.next;
    this.length -= 1;

    if (this.length === 0) {
      this.end = null;
    }

    return { airport, stopoverCount };
  }
}

const getFuel = (startX, startY, endX, endY) => {
  const distance = Math.sqrt((startX - endX) ** 2 + (startY - endY) ** 2);
  return Math.floor(distance / 10) + (distance % 10 === 0 ? 0 : 1);
};

const canGoToDestination = (fuel) => {
  const q = new Queue();
  const visited = new Array(airports.length);

  q.enqueue(airports.length - 2, 0);

  while (q.length > 0) {
    const { airport, stopoverCount } = q.dequeue();

    if (airport === airports.length - 1) return true;

    if (visited[airport]) continue;
    visited[airport] = true;

    const [x, y] = airports[airport];
    airports.forEach(([nextX, nextY], nextAirport) => {
      if (stopoverCount === maxStopoverCount && nextAirport !== airports.length - 1) {
        return;
      }

      if (!visited[nextAirport] && getFuel(x, y, nextX, nextY) <= fuel) {
        q.enqueue(nextAirport, stopoverCount + 1);
      }
    });
  }

  return false;
};

let left = 0;
let right = getFuel(0, 0, 10000, 10000) + 1;

while (left < right) {
  const mid = Math.floor((left + right) / 2);
  if (canGoToDestination(mid)) right = mid;
  else left = mid + 1;
}

console.log(left);

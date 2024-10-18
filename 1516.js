/*
시간이 있는 위상 정렬
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[buildingCount], ...buildings] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const next = Array.from({ length: buildingCount + 1 }, () => []);
const times = Array.from({ length: buildingCount + 1 }, () => 0);
const prerequisiteCounts = Array.from({ length: buildingCount + 1 }, () => 0);

buildings.forEach(([time, ...needed], index) => {
  needed.pop();
  prerequisiteCounts[index + 1] = needed.length;
  times[index + 1] = time;

  needed.forEach((building) => {
    next[building].push(index + 1);
  });
});

const finishTimes = Array.from({ length: buildingCount + 1 }, () => 0);
const q = {
  list: [],
  length: 0,
  first: 0,
  enqueue(val) {
    this.list.push(val);
    this.length += 1;
  },
  dequeue() {
    if (this.length === 0) return undefined;
    this.first += 1;
    this.length -= 1;
    return this.list[this.first - 1];
  },
};

for (let i = 1; i <= buildingCount; i += 1) {
  if (prerequisiteCounts[i] === 0) {
    q.enqueue(i);
    finishTimes[i] = 0;
  }
}

while (q.length > 0) {
  const building = q.dequeue();

  finishTimes[building] += times[building];

  next[building].forEach((nextBuilding) => {
    prerequisiteCounts[nextBuilding] -= 1;
    finishTimes[nextBuilding] = Math.max(finishTimes[nextBuilding], finishTimes[building]);

    if (prerequisiteCounts[nextBuilding] === 0) {
      q.enqueue(nextBuilding);
    }
  });
}

console.log(finishTimes.slice(1).join('\n'));

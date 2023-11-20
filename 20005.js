/*
최대한 빠른 경로로 이동: bfs
각 플레이어별로 몇 초부터 보스를 때리는지 계산
보스가 언제 죽는지 계산
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [info, ...inputs] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const [row, col] = info.split(' ').map(Number);
const board = inputs.slice(0, row).map((row) => [...row]);
const dpsInfo = inputs.slice(row).map((line) => line.split(' '));
const bossHp = Number(dpsInfo.pop());

const dps = new Map();
dpsInfo.forEach(([player, value]) => {
  dps.set(player, Number(value));
});

const q = {
  list: [],
  left: 0,
  length: 0,

  enqueue(value) {
    this.list.push(value);
    this.length += 1;
  },

  dequeue() {
    if (!this.length) return null;
    this.left += 1;
    this.length -= 1;
    return this.list[this.left - 1];
  },
};

for (let r = 0; r < row; r += 1) {
  for (let c = 0; c < col; c += 1) {
    if (board[r][c] === 'B') {
      q.enqueue([r, c, 0]);
      board[r][c] = '.';
    }
  }
}

const DIRECTIONS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
const arriveTime = new Map();

while (q.length) {
  const [r, c, d] = q.dequeue();

  if (board[r][c] === 'X') continue;

  if (board[r][c] !== '.') {
    arriveTime.set(board[r][c], d);
  }

  board[r][c] = 'X';

  DIRECTIONS.forEach(([dr, dc]) => {
    const r2 = r + dr;
    const c2 = c + dc;

    if (r2 < 0 || c2 < 0 || r2 >= row || c2 >= col || board[r2][c2] === 'X') return;

    q.enqueue([r2, c2, d + 1]);
  });
}

let remainingHp = bossHp;
let curTime = 0;
let totalDps = 0;
let sol = 0;

Array.from(arriveTime.entries())
  .sort((one, another) => one[1] - another[1])
  .forEach(([player, arrivedAt]) => {
    remainingHp -= (arrivedAt - curTime) * totalDps;
    curTime = arrivedAt;

    if (remainingHp > 0) {
      totalDps += dps.get(player);
      sol += 1;
    }
  });

console.log(sol);

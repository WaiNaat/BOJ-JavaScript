/*
시뮬레이션 + bfs
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[R, C], ...board] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const [ahriHp, ahriAtk, bossHp, bossAtk] = board.pop();

const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

class Queue {
  list = [];
  left = 0;
  right = -1;

  getLength() {
    return this.right - this.left + 1;
  }

  isEmpty() {
    return this.getLength() === 0;
  }

  enqueue(value) {
    this.right += 1;
    this.list.push(value);
  }

  dequeue() {
    if (this.isEmpty()) return null;
    const value = this.list[this.left];
    this.left += 1;
    return value;
  }
}

const ahri = {
  hp: ahriHp,
  atk: ahriAtk,
  direction: null,
  position: null,
  prevPosition: null,

  isDead() {
    return this.hp <= 0;
  },

  attacked(damage) {
    this.hp -= damage;
  },

  rotate() {
    this.hp -= 1;
    this.direction = (this.direction + 1) % 4;
  },

  move() {
    const [r, c] = this.position;
    const [dr, dc] = DIRECTIONS[this.direction];
    const r2 = r + dr;
    const c2 = c + dc;

    if (r2 < 0 || r2 >= R || c2 < 0 || c2 >= C || board[r2][c2] !== 0) {
      this.rotate();
      return false;
    }

    board[r][c] = 0;
    board[r2][c2] = 2;
    this.prevPosition = this.position;
    this.position = [r2, c2];

    return true;
  },
};

const boss = {
  hp: bossHp,
  atk: bossAtk,
  position: null,

  isDead() {
    return this.hp <= 0;
  },

  attacked(damage) {
    this.hp -= damage;
  },

  move(position) {
    const [r, c] = this.position;
    const [r2, c2] = position;

    board[r][c] = 0;
    board[r2][c2] = 3;

    this.position = position;
  },

  summon(initialDirection) {
    let direction = initialDirection;
    let distance = 1;
    let gridCount = 0;
    let [r, c] = this.position;

    while (gridCount < R * C - 1) {
      let [dr, dc] = DIRECTIONS[direction];

      for (let i = 0; i < distance; i += 1) {
        r += dr;
        c += dc;

        if (r < 0 || r >= R || c < 0 || c >= C) continue;
        if (board[r][c] === 1) return [r, c];
        if (typeof board[r][c] === 'number') gridCount += 1;
      }

      direction = (direction + 1) % 4;
      [dr, dc] = DIRECTIONS[direction];

      for (let i = 0; i < distance; i += 1) {
        r += dr;
        c += dc;

        if (r < 0 || r >= R || c < 0 || c >= C) continue;
        if (board[r][c] === 1) return [r, c];
        if (typeof board[r][c] === 'number') gridCount += 1;
      }

      direction = (direction + 1) % 4;
      [dr, dc] = DIRECTIONS[direction];
      distance += 1;
    }

    return null;
  },

  getAttackDamage(direction) {
    const position = this.summon(direction);
    if (position === null) return 0;

    const visited = Array.from({ length: R }, () => new Array(C).fill(false));
    const q = new Queue();
    q.enqueue([...position, 0]);

    while (!q.isEmpty()) {
      const [r, c, distance] = q.dequeue();

      if (visited[r][c]) continue;
      visited[r][c] = true;

      if (board[r][c] === 2) {
        return Math.max(this.atk - distance, 0);
      }

      DIRECTIONS.forEach(([dr, dc]) => {
        const r2 = r + dr;
        const c2 = c + dc;

        if (
          r2 < 0 ||
          r2 >= R ||
          c2 < 0 ||
          c2 >= C ||
          board[r2][c2] === 1 ||
          board[r2][c2] === 3 ||
          visited[r2][c2]
        ) {
          return;
        }

        q.enqueue([r2, c2, distance + 1]);
      });
    }

    return 0;
  },
};

// 초기화
for (let r = 0; r < R; r += 1) {
  for (let c = 0; c < C; c += 1) {
    if (board[r][c] === 2) ahri.position = [r, c];
    if (board[r][c] === 3) {
      boss.position = [r, c];
      ahri.prevPosition = [r, c];
    }
  }
}

const initialDirectionValue = [
  ahri.position[0] - boss.position[0],
  ahri.position[1] - boss.position[1],
];

const initialDirection = DIRECTIONS.findIndex(
  ([dr, dc]) => dr === initialDirectionValue[0] && dc === initialDirectionValue[1],
);

ahri.direction = initialDirection;

// 게임 진행
let canWin = false;

while (!(boss.isDead() || ahri.isDead())) {
  boss.attacked(ahri.atk);
  if (boss.isDead()) {
    canWin = true;
    break;
  }

  for (let moveCount = 0; moveCount < 4; moveCount += 1) {
    if (ahri.move()) break;
  }

  const bossAttackDamage = boss.getAttackDamage(ahri.direction);
  ahri.attacked(bossAttackDamage);

  boss.move(ahri.prevPosition);
}

console.log(canWin ? 'VICTORY!' : 'CAVELIFE...');

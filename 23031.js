/*
스위치
  스위치 칸에 좀비가 있어도 무시하고 불 켬
  켜지면 3*3 밝힘
  안꺼짐

좀비
  아리 이동 후 좀비가 보는 방향으로 이동
  벽에 박으면 뒤돌기

아리
  불이 켜져 있으면 좀비와 만나도 ㄱㅊ
  꺼져있는데 만나면 끝
  벽에 박으면 아무일도 안일어남

시작점에선 다같이 아래보고있음

명령 50 * 지도 15 * 15 = 11250
  -> 그냥 풀면 됨

굳이 보드 그려서 움직일 필요 있나?
아리 위치, 방향
좀비 위치, 방향들
불 켜진 곳 위치들

아리 위치 변경
좀비 위치 변경
아리가 불 켜진 곳에 없으면 좀비랑 같이있는지 검사
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [info, commands, ...map] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n');

const size = Number(info);
const DIRECTIONS = [
  [1, 0],
  [0, -1],
  [-1, 0],
  [0, 1],
];

class Ahri {
  constructor() {
    this.r = 0;
    this.c = 0;
    this.look = 0;
  }

  forward() {
    const [dr, dc] = DIRECTIONS[this.look];
    const r2 = this.r + dr;
    const c2 = this.c + dc;

    if (r2 >= 0 && r2 < size && c2 >= 0 && c2 < size) {
      this.r = r2;
      this.c = c2;
    }
  }

  turnLeft() {
    this.look = (this.look + 3) % 4;
  }

  turnRight() {
    this.look = (this.look + 1) % 4;
  }
}

class Zombie {
  constructor(r, c) {
    this.r = r;
    this.c = c;
    this.look = 0;
  }

  forward() {
    const [dr, dc] = DIRECTIONS[this.look];
    const r2 = this.r + dr;
    const c2 = this.c + dc;

    if (r2 < 0 || r2 >= size) {
      this.look = (this.look + 2) % 4;
      return;
    }

    this.r = r2;
    this.c = c2;
  }
}

const ahri = new Ahri();
const zombies = [];
const switches = new Set();
const lights = new Set();

for (let r = 0; r < size; r += 1) {
  for (let c = 0; c < size; c += 1) {
    if (map[r][c] === 'Z') zombies.push(new Zombie(r, c));
    else if (map[r][c] === 'S') switches.add(`${r} ${c}`);
  }
}

let isSafe = true;

for (let i = 0; i < commands.length; i += 1) {
  // 아리 이동
  const command = commands[i];
  if (command === 'F') ahri.forward();
  else if (command === 'L') ahri.turnLeft();
  else ahri.turnRight();

  const r = ahri.r;
  const c = ahri.c;

  // 전등 켜기
  if (switches.has(`${r} ${c}`)) {
    for (let rOffset = -1; rOffset <= 1; rOffset += 1) {
      for (let cOffset = -1; cOffset <= 1; cOffset += 1) {
        lights.add(`${r + rOffset} ${c + cOffset}`);
      }
    }
  }

  // 좀비랑 만남
  if (!lights.has(`${r} ${c}`)) {
    const meet = zombies.findIndex((zombie) => zombie.r === r && zombie.c === c);

    if (meet !== -1) {
      isSafe = false;
      break;
    }
  }

  // 좀비 이동
  zombies.forEach((zombie) => zombie.forward());

  // 좀비랑 만남
  if (!lights.has(`${r} ${c}`)) {
    const meet = zombies.findIndex((zombie) => zombie.r === r && zombie.c === c);

    if (meet !== -1) {
      isSafe = false;
      break;
    }
  }
}

console.log(isSafe ? 'Phew...' : 'Aaaaaah!');

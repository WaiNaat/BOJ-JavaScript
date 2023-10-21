/*
x번 지역에서는 x번 소재 아이템을 획득
한 플레이어가 같은 아이템을 여러 번 획득할 수 있다.
서로 다른 종류의 두 소재 아이템을 1개씩 사용해 장비를 만든다.
부정행위로 조합 시 가지고 있는 소재 아이템만이 사용된다.
같은 지역에 있는 플레이어만 공격할 수 있다.

현재 위치한 지역에서 얻을 수 없는 소재 아이템을 획득한 경우
가지고 있지 않은 소재 아이템을 사용해 조합하는 경우
다른 지역에 있는 상대 플레이어를 공격하는 경우

플레이어별로
  현재 위치
  갖고 있는 아이템
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [info, ...logs] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' '));

class Player {
  position = 1;
  items = {};

  move(position) {
    this.position = position;
    return true;
  }

  farm(item) {
    if (!this.items[item]) this.items[item] = 0;
    this.items[item] += 1;

    if (item !== this.position) return false;
    return true;
  }

  create(item1, item2) {
    const isCheater = this.items[item1] && this.items[item2];
    if (this.items[item1]) this.items[item1] -= 1;
    if (this.items[item2]) this.items[item2] -= 1;
    return isCheater;
  }

  attack(another) {
    return this.position === another.position;
  }
}

const [, playerCount] = info.map(Number);
const players = Array.from({ length: playerCount + 1 }).map(() => new Player());
const cheatLogs = [];
const bannedPlayers = new Set();

logs.forEach(([logId, player, action, param1, param2]) => {
  switch (action) {
    case 'M':
      if (!players[Number(player)].move(Number(param1))) {
        cheatLogs.push(Number(logId));
      }
      break;
    case 'F':
      if (!players[Number(player)].farm(Number(param1))) {
        cheatLogs.push(Number(logId));
      }
      break;
    case 'C':
      if (!players[Number(player)].create(Number(param1), Number(param2))) {
        cheatLogs.push(Number(logId));
      }
      break;
    default:
      if (!players[Number(player)].attack(players[Number(param1)])) {
        cheatLogs.push(Number(logId));
        bannedPlayers.add(Number(player));
      }
  }
});

console.log(cheatLogs.length);
if (cheatLogs.length) console.log(cheatLogs.join(' '));
console.log(bannedPlayers.size);
if (bannedPlayers.size)
  console.log(
    Array.from(bannedPlayers)
      .sort((a, b) => a - b)
      .join(' '),
  );

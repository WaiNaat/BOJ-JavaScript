/*
union-find인데 root가 중요한 문제

1. 종주국이 자신의 속국이 아닌 다른 왕국을 공격
  패배 국가 묶음은 전부 승자의 속국이 됨
2. 속국이 자신의 종주국을 공격
  속국 승리시 본인이 종주국이 됨

문제 조건에 따라 성립할 수 있는 전쟁만이 입력으로 주어짐
*/
class KingdomRelation {
  constructor(kingdomCount) {
    this.parent = new Array(kingdomCount).fill(0).map((value, index) => index);
  }

  findBoss(kingdom) {
    if (this.parent[kingdom] === kingdom) return kingdom;
    this.parent[kingdom] = this.findBoss(this.parent[kingdom]);
    return this.parent[kingdom];
  }

  war(winner, loser) {
    const winnerBoss = this.findBoss(winner);
    const loserBoss = this.findBoss(loser);
    if (winnerBoss === loserBoss) {
      this.parent[winner] = winner;
    }
    this.parent[loserBoss] = winner;
  }

  getBossKingdoms() {
    const result = [];
    this.parent.forEach((value, index) => {
      if (value === index) result.push(index);
    });
    return result;
  }
}

const NAME_FORMAT = /^Kingdom of ([A-Za-z ]+)$/g;
const WAR_FORMAT = /^Kingdom of ([A-Za-z ]+),Kingdom of ([A-Za-z ]+),([12])$/g;

const parseInput = (input) => {
  const [kingdomCount] = input[0].split(' ').map(Number);

  const kingdoms = input.slice(1, 1 + kingdomCount).map(
    (line) => [...line.matchAll(NAME_FORMAT)][0][1],
  );

  let wars = input.slice(1 + kingdomCount).map(
    (line) => [...line.matchAll(WAR_FORMAT)][0],
  );
  wars = wars.map((match) => {
    const [A, B, result] = match.slice(1, 4);
    if (result === '1') return [A, B];
    return [B, A];
  });

  return { kingdoms, wars };
};

const makeKingdomId = (kingdoms) => {
  const nameToId = new Map();
  const idToName = new Map();
  kingdoms.forEach((kingdom, index) => {
    nameToId.set(kingdom, index);
    idToName.set(index, kingdom);
  });
  return { nameToId, idToName };
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const input = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

// process
const { kingdoms, wars } = parseInput(input);
const { nameToId, idToName } = makeKingdomId(kingdoms);
const recorder = new KingdomRelation(kingdoms.length);

wars.forEach(([winner, loser]) => {
  recorder.war(nameToId.get(winner), nameToId.get(loser));
});

let result = recorder.getBossKingdoms().map((kingdom) => idToName.get(kingdom));
result.sort();
result = result.map((kingdom) => `Kingdom of ${kingdom}`);

// output
console.log(`${result.length}\n${result.join('\n')}`);

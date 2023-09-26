/*
캐릭터별로 본인의 한계를 알아야 함
  -> 캐릭별로 보스잡는데 걸리는 시간 계산
15분동안 벌 수 있는 최대 메소?
  -> 배낭 문제: 무게가 900인 가방

opt(i, time) := i번째 보스들 중에서 딱 time시간 내에 잡을 때 최대 메소
bossTime(i) := i번째 보스를 잡는 데 걸리는 시간
meso(i) := i번째 보스를 잡고 얻을 수 있는 메소
opt(i, time) =
  opt(i-1, time-bossTime(i)) + 
  opt(i-1, time)
  opt(i, time-1)
  셋 중 최댓값
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const input = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const [characterCount, usingCharacterCount, bossCount] = input[0].split(' ').map(Number);
const dpsList = input.slice(1, 1 + characterCount).map(Number);
const bossList = input.slice(1 + characterCount).map((line) => line.split(' ').map(Number));

const TIME = 900;
const getMaxMeso = (dps) => {
  const bossTime = bossList.map(([hp]) => Math.ceil(hp / dps));

  let cur = new Array(TIME + 1).fill(0);
  for (let b = 0; b < bossCount; b += 1) {
    const next = new Array(TIME + 1);

    for (let t = 0; t <= TIME; t += 1) {
      next[t] = Math.max(t - bossTime[b] >= 0 ? cur[t - bossTime[b]] + bossList[b][1] : 0, cur[t]);
    }

    cur = next;
  }

  return cur[TIME];
};

const mesoList = dpsList.map((dps) => getMaxMeso(dps)).sort((one, another) => another - one);

let sol = 0;
for (let i = 0; i < usingCharacterCount; i += 1) {
  sol += mesoList[i];
}

console.log(sol);

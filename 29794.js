/*
결국 답지봄..

탑 200층, 용사 62만 명, 날짜 200일
탑 내려갈수록 몬스터게 세지는건 아님

용사 일과
  1층~본인렙 이하몹중 가장 센놈들 있는층으로 이동 (1층당 시간 1)
  레벨1업
  마귀 사용
마법석
  딱 두 층 사이를 연결 (시간 0)
  1층-10층 마법석일때 9층가려면 1-10-9 이게 더 빠름ㅋㅋ;;

각 용사별로 어느 사냥터에 얼마나 머무르는지 계산
  이건 시간초과남
각 층별로 몇렙까지 여기 있을 수 있는지 계산
  정렬 한번하면 해결
  다시 정렬하면 몇렙은 몇층가야하는지 나옴
  -> 정렬안해도 되네ㅋㅋ;;

각 층에서 사냥하는 인원들을 셈
  -> 답지보니까 누적합쓰면 이걸 O(용사수+층수) 으로 처리 가능하다는데

각 용사의 시작레벨을 기록
  이걸 누적합
x레벨을 거쳐가는 용사 = y층에서 사냥하는 총 인원수
  x-(총날짜) 레벨부터 x레벨까지의 인원의 합!

이러면 각 층마다 몇명이 지나가는지 나옴

임의의 두 층을 골라서 마법석으로 연결 O(층수^2)
각 층별로 이동시간 계산 가능
  마법석이 없으면 층수-1 시간
  마법석을 타면 (마법석a-1)+|(마법석b-층수)|
    단, 마법석a는 층수보다 낮은데있음
  이거 둘중에 더 작은값
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[, towerHeight, totalDays], levels, monsters] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const levelingFloors = new Array(200);

monsters.forEach((monster, floor) => {
  levelingFloors[monster] = floor;
});

for (let level = 1; level < 200; level += 1) {
  if (levelingFloors[level] === undefined) {
    levelingFloors[level] = levelingFloors[level - 1];
  }
}

const startLevelCounts = new Array(200).fill(0);

levels.forEach((level) => {
  startLevelCounts[level] += 1;
});

const levelPrefixSum = new Array(200).fill(0);
const levelCounts = new Array(200);
const floorVisitorCounts = new Array(towerHeight).fill(0);

for (let level = 1; level < 200; level += 1) {
  levelPrefixSum[level] = levelPrefixSum[level - 1] + startLevelCounts[level];
  levelCounts[level] = levelPrefixSum[level] - (levelPrefixSum[level - totalDays] ?? 0);
  floorVisitorCounts[levelingFloors[level]] += levelCounts[level];
}

let sol = {
  stone1: null,
  stone2: null,
  time: Infinity,
};

const totalTime = floorVisitorCounts.reduce((prev, count, floor) => prev + count * floor, 0);

for (let stone1 = 0; stone1 < towerHeight; stone1 += 1) {
  for (let stone2 = stone1 + 1; stone2 < towerHeight; stone2 += 1) {
    const newTime = floorVisitorCounts.reduce(
      (prev, count, floor) => prev + count * Math.min(floor, stone1 + Math.abs(floor - stone2)),
      0,
    );

    if (newTime < sol.time) {
      sol = { stone1, stone2, time: newTime };
    }
  }
}

console.log(`${sol.stone1 + 1} ${sol.stone2 + 1}\n${totalTime - sol.time}`);

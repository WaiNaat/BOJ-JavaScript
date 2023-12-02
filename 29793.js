/*
토지령
  전 구역 통틀어 해,강,바람 각각 최대 1개씩 존재 가능
  소환된놈을 또 소환하면 기존게 사라지고 현위치에 새로 생김
  소환된 위치에 지속적으로 데미지
용맥 분출
  용맥을 '소모'하여 토지령 소환
  용맥의 종류도 해,강,바람 세종류임
용맥 변환
  원하는 위치의 용맥 하나를 다른걸로 바꿈

무조건 이동->소환 반복인데
체력이 4 이상이면 잡을 방법이 있나?
아무리 잘해봤자 SRWSRW...이거면 3딜아님?
  맵 크기가 3 이하면 체력이 4 이상이라도 잡을 수 있음

맵 크기가 1
  무조건 0
맵 크기가 2, 체력이 1
  무조건 0
맵 크기가 2, 체력이 2 이상
  두 용맥을 서로 다른 값으로
맵 크기가 3, 체력이 1
  무조건 0
맵 크기가 3, 체력이 2
  서로 다른 두 용맥이 번갈아서 나타나게끔
맵 크기가 3, 체력이 3 이상
  서로 다른 세 용맥
맵 크기가 4 이상, 체력이 1
  무조건 0
맵 크기가 4 이상, 체력이 2
  임의의 한 용맥은 본인 직전 용맥과 색이 달라야 함
맵 크기가 4 이상, 체력이 3
  SRW로 만들수있는 순열중 하나 골라서 반복
맵 크기가 4 이상, 체력이 4 이상
  불가
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [info, dragonVeins] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const [mapSize, hp] = info.split(' ').map(Number);

const setDragonVeinsForHp2 = () => {
  const newDragonVeins = [...dragonVeins];
  let conversionCount = 0;

  for (let i = 1; i < mapSize; i += 1) {
    if (newDragonVeins[i] === newDragonVeins[i - 1]) {
      conversionCount += 1;
      newDragonVeins[i] = 'X';
    }
  }

  return conversionCount;
};

const setDragonVeinsForHp3 = () => {
  const cases = ['SRW', 'SWR', 'RSW', 'RWS', 'WSR', 'WRS'];
  const results = cases.map((sample) => {
    let conversionCount = 0;

    for (let i = 0; i < mapSize; i += 1) {
      if (dragonVeins[i] !== sample[i % 3]) {
        conversionCount += 1;
      }
    }

    return conversionCount;
  });

  return Math.min(...results);
};

let sol = 0;

if (mapSize > 1 && hp === 2) {
  sol = setDragonVeinsForHp2();
} else if (mapSize === 2 && hp >= 2) {
  sol = setDragonVeinsForHp2();
} else if (mapSize === 3 && hp >= 3) {
  sol = setDragonVeinsForHp3();
} else if (mapSize >= 4 && hp === 2) {
  sol = setDragonVeinsForHp2();
} else if (mapSize >= 4 && hp === 3) {
  sol = setDragonVeinsForHp3();
} else if (mapSize >= 4 && hp >= 4) {
  sol = -1;
}

console.log(sol);

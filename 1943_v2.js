/// 시간 초과

/*
dp
주어진 동전 총액 절반만큼의 금액을 만들수 있는 경우의 수가 있으면 성공 없으면 실패

opt(money, coinIndex) := coinIndex번까지의 동전으로 money를 만들 수 있는 경우의 수
coin(coinIndex) := coinIndex번째 동전의 가치
opt(money, coinIndex) =
  opt(money - k * coin(coinIndex), coinIndex - 1), k는 해당 동전의 개수(0일수도있음)
  얘네들 중 단 하나라도 true면 true

opt(?, coinIndex) 계산에 opt(?, coinIndex - 1) 만 쓰니까
전체 opt 말고 prev, cur 두 개만 유지해서 메모리 절약 가능
*/
const canDivide = (targetMoney, coinInfo) => {
  let prev = Array.from(new Array(targetMoney + 1));
  let [coinValue, coinCount] = coinInfo[0];
  prev[0] = true;

  for (let coinIndex = 0; coinIndex < coinInfo.length; coinIndex += 1) {
    const cur = Array.from(new Array(targetMoney + 1));
    [coinValue, coinCount] = coinInfo[coinIndex];

    for (let money = 0; money <= targetMoney; money += 1) {
      for (let count = 0; count <= coinCount; count += 1) {
        const prevMoney = money - count * coinValue;
        if (prevMoney >= 0) cur[money] = cur[money] || prev[prevMoney];
      }
    }

    prev = cur;
  }

  return prev[targetMoney] ? 1 : 0;
};

const solve = (coinInfo) => {
  const totalMoney = coinInfo.reduce(
    (sum, [coinValue, coinCount]) => sum + coinValue * coinCount,
    0,
  );

  if (totalMoney % 2 === 1) return 0;
  const targetMoney = totalMoney / 2;

  return canDivide(targetMoney, coinInfo);
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const input = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

// process
const sol = [];
let index = 0;
for (let testCase = 0; testCase < 3; testCase += 1) {
  const coinCount = input[index];
  index += 1;
  const coinInfo = [];
  for (let i = 0; i < coinCount; i += 1) {
    coinInfo.push(input[index].trim().split(' ').map(Number));
    index += 1;
  }

  sol.push(solve(coinInfo));
}

// output
console.log(sol.join('\n'));

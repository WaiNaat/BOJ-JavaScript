// 메모리 초과

/*
dp?
주어진 동전 총액 절반만큼의 금액을 만들수 있는 경우의 수가 있으면 성공 없으면 실패

possibleMoney(coinIndex) := coinIndex번까지의 동전으로 만들 수 있는 금액들의 집합
coin(coinIndex) := coinIndex번째 동전의 가치
possibleMoney(coinIndex) =
  possibleMoney(coinIndex - 1) 값들에 coin(coinIndex) * k 를 더한 값들
  k는 해당 동전의 개수(0일수도있음)
*/
const update = (set, coinValue, coinCount, maxMoney) => {
  const newSet = new Set(set);

  for (let count = 0; count <= coinCount; count += 1) {
    set.forEach((value) => {
      const money = value + count * coinValue;
      if (money <= maxMoney) newSet.add(money);
    });
  }

  return newSet;
};

const canDivide = (targetMoney, coinInfo) => {
  let possibleMoney = new Set([0]);

  for (let coinIndex = 0; coinIndex < coinInfo.length; coinIndex += 1) {
    possibleMoney = update(possibleMoney, ...coinInfo[coinIndex], targetMoney);
    if (possibleMoney.has(targetMoney)) return 1;
  }
  return 0;
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

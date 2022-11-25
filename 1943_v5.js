/*
dp?
주어진 동전 총액 절반만큼의 금액을 만들수 있는 경우의 수가 있으면 성공 없으면 실패

possible(money, coinIndex) := coinIndex번 동전까지 써서 money원 만들 수 있는지 여부
value(coinIndex) := coinIndex번 동전의 가치
count(coinIndex) := counIndex번 동전의 개수

possible(money-value(coinIndex), coinIndex-1)=true면
possible(money + k*value(coinIndex), coinIndex)
  1 <= k <= count(coinIndex)인 자연수
얘네도 true

possible(?, coinIndex-1)로 possible(?, coinIndex)를 계산하므로
배열 2개로 처리가능.

근데 돈을 거꾸로 계산하면 하나로 배열 하나로 우려먹기 가능.
  정방향은 0 1 2 -> 1 2 3 -> 2 3 4 -> ... 이런식으로 돈이 복사되지만
  역방향은 49999 50000 -> 49998 49999 50000 -> 49997 49996 49995 -> ... 이런식으로
  기존값 덮어쓰기에 지나지 않아서 돈복사 문제 X
*/
const update = (possibleArray, coinValue, coinCount, targetMoney) => {
  const possible = possibleArray;

  for (let money = targetMoney; money > 0; money -= 1) {
    if (possible[money - coinValue]) {
      for (let count = 0; count < coinCount; count += 1) {
        possible[money + count * coinValue] = true;
      }
    }
  }
};

const canDivide = (targetMoney, coinInfo) => {
  const possible = new Array(targetMoney + 1);
  possible[0] = true;

  for (let coinIndex = 0; coinIndex < coinInfo.length; coinIndex += 1) {
    update(possible, ...coinInfo[coinIndex], targetMoney);
    if (possible[targetMoney]) return 1;
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

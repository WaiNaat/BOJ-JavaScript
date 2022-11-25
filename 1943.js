/// 미제출 코드입니다. 정답보장 ㄴㄴ

/*
dp를 사용하면
주어진 동전 총액 절반만큼의 금액을 만들수 있는 경우의 수는 쉽게 구함.

opt(money, coinIndex) := coinIndex번까지의 동전으로 money를 만들 수 있는 경우의 수
coin(coinIndex) := coinIndex번째 동전의 가치
opt(money, coinIndex) = sum(
  opt(money - k * coin(coinIndex), coinIndex - 1), k는 해당 동전의 개수(0일수도있음)
)

우리에게 필요한 건 이렇게 해서 남은 동전들로 똑같은 금액을 하나 더 만들 수 있느냐의 여부.
결국 어떤 동전을 몇 개 썼는지 기억해야 하는 것 아닌가?

역추적
opt(money, coinIndex)에 경우의 수를 저장하는 게 아니라 남은 돈을 저장함
예를 들어
opt(money, coinIndex) = [20, 30] 이라 하면 coinIndex번까지 코인을 쓰고 남은 돈이 20원, 30원인 경우가 있다는 뜻
이렇게 쌓아나가면 결국 마지막에 원하는 금액만큼 남는 경우가 있는지를 알 수 있음

메모리초과 안나나?
opt(money, coinIndex) 계산에 opt(?, coinIndex-1)만 쓰이므로
전체 dp표 유지할 필요 없이 prev, cur 두 개로 처리 가능.

님뭐함??????????????????????
선생님이 준 돈이 총 10만원이 있다고 치자.
상식적으로 얘네들 조합해서 5만원 만들 수 있으면 5만원 만들고
나머지들 모으면 당연히 5만원되는거아님?
*/
const updateRemainderSet = (prevSet, curSet, remainder) => {
  const target = curSet;
  prevSet.forEach((value) => {
    target.add(value + remainder);
  });
};

const canDivide = (targetMoney, coinInfo) => {
  let prev = Array.from(new Array(targetMoney + 1), () => new Set());
  let [coinValue, coinCount] = coinInfo[0];
  let coinMaxValue = coinValue * coinCount;

  for (let count = 0; count <= coinCount; count += 1) {
    const money = count * coinValue;
    if (money <= targetMoney) prev[money].add(coinMaxValue - money);
  }

  for (let coinIndex = 1; coinIndex < coinInfo.length; coinIndex += 1) {
    const cur = Array.from(new Array(targetMoney + 1), () => new Set());
    [coinValue, coinCount] = coinInfo[coinIndex];
    coinMaxValue = coinValue * coinCount;

    for (let money = 0; money <= targetMoney; money += 1) {
      for (let count = 0; count <= coinCount; count += 1) {
        const prevMoney = money - count * coinValue;
        if (prevMoney >= 0) {
          updateRemainderSet(prev[prevMoney], cur[money], coinMaxValue - count * coinValue);
        }
      }
    }

    prev = cur;
  }
  console.log(targetMoney, prev[targetMoney]);
  if (prev[targetMoney].has(targetMoney)) return 1;
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

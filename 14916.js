/*
opt(i) := 거스름돈 i원을 주는 데 필요한 최소 동전 개수

opt(i) = min(opt(i-2), opt(i-5)) + 1
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const money = Number(require('fs').readFileSync(INPUT_FILE).toString());

const coinCount = [0];

for (let i = 1; i <= money; i += 1) {
  coinCount.push(1 + Math.min(
    i < 2 ? Infinity : coinCount[i - 2],
    i < 5 ? Infinity : coinCount[i - 5],
  ));
}

console.log(coinCount[money] === Infinity ? -1 : coinCount[money]);

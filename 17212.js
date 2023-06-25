/*
opt(i) = i원을 지불하는 데 필요한 최소 동전 개수
opt(i) =
  opt(i-1)
  opt(i-2)
  opt(i-5)
  opt(i-7)
  넷 중 최솟값 + 1
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const price = Number(require('fs').readFileSync(INPUT_FILE).toString());

const minCoinCount = [0, 1, 1];

for (let money = 3; money <= price; money += 1) {
  minCoinCount.push(1 + Math.min(
    money >= 1 ? minCoinCount[money - 1] : Infinity,
    money >= 2 ? minCoinCount[money - 2] : Infinity,
    money >= 5 ? minCoinCount[money - 5] : Infinity,
    money >= 7 ? minCoinCount[money - 7] : Infinity,
  ));
}

console.log(minCoinCount[price]);

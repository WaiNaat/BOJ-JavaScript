/*
1. 남은 미래를 봤을 때 오늘이 최고점이다? 판다
2. 최고점은 아닌데 미래에 고점이 있다? 산다

먼 미래부터 역행하면서 고점을 기억
만약 본인보다 더 고점인 날을 x일이라 하면
x+1일 ~ 본인 전날까지는 다 사서 본인 날에 팔면 됨.
*/

// input
const inputFile = process.platform === 'linux' ? 'dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim()
  .split('\n');

// process
const sol = [];

for (let i = 1; i < input.length; i += 2) {
  const N = Number(input[i]) - 1;
  const insight = input[i + 1].trim().split(' ').map(Number);

  let highestPrice = 0;
  let investment = 0;
  let salePrice = 0;
  let benefit = 0;

  for (let day = N; day >= 0; day -= 1) {
    if (insight[day] < highestPrice) {
      salePrice += highestPrice;
      investment += insight[day];
    } else {
      benefit += salePrice - investment;
      highestPrice = insight[day];
      salePrice = 0;
      investment = 0;
    }
  }
  benefit += salePrice - investment;

  sol.push(benefit);
}

// output
console.log(sol.join('\n'));

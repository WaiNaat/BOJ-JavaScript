/*
물이 고이지 않도록 하려면 U자형으로 지붕을 만들면 안된다.
높이 1 단위로 잘라서 본다고 했을 때 해당 높이에 지붕 뭉탱이가 두 개 이상 있다?
  >> 아래 높이 하나의 뭉탱이랑 이어지면 U자형이 되어서 물이 고임.
즉 각 높이별로 뭉탱이가 1개가 되도록 가장 왼쪽 기둥 ~ 가장 오른쪽 기둥을 이어야 함.
*/

// input
const inputFile = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[N], ...pillars] = require('fs').readFileSync(inputFile).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

// process
let sol = 0;
for (let curHeight = 1; curHeight < 1000; curHeight += 1) {
  let left = 1001;
  let right = 0;

  pillars.forEach(([pos, pillarHeight]) => {
    if (pillarHeight >= curHeight) {
      left = Math.min(pos, left);
      right = Math.max(pos, right);
    }
  });

  if (left === 1001) break;

  sol += right - left + 1;
}

// output
console.log(sol);

/*
큰 숫자부터 배열에 배치한다.
본인 앞에 본인보다 큰 i명이 있다고 치면 배열[i] 에 넣으면 된다.
max(N)=10이라 배열에 넣을 때의 시간 복잡도 최적화할 필요 X
*/
// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [N, ...tallerThanMe] = require('fs').readFileSync(inputFile).toString().trim()
  .split(/\s/)
  .map(Number);

// process
const order = tallerThanMe.reduceRight(
  (prevArray, number, index) => (
    [...prevArray.slice(0, number), index + 1, ...prevArray.slice(number)]
  ),
  [undefined],
);
order.pop();

// output
console.log(order.join(' '));

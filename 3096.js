/*
아 국어이슈 진짜!!!!!!
  네 마을이 전부 한 세트로 연결되어 있어서,
  한 마을에서 출발했으면 네 마을 모두를 방문할 수 있어야 함

왼쪽에서 임의의 두 마을을 뽑는다
연결된 오른쪽 마을들의 교집합에서 두 개를 뽑는 경우의 수를 구한다.
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[townCount], ...ships] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const next = Array.from({ length: townCount + 1 }, () => new Set());
ships.forEach(([left, right]) => {
  next[left].add(right);
});

const getIntersectionSize = (setA, setB) => {
  const small = setA.size < setB.size ? setA : setB;
  const big = setA.size >= setB.size ? setA : setB;
  let count = 0;
  small.forEach((val) => {
    if (big.has(val)) {
      count += 1;
    }
  });
  return count;
};

let sol = 0;
for (let i = 1; i <= townCount; i += 1) {
  for (let j = i + 1; j <= townCount; j += 1) {
    const intersection = getIntersectionSize(next[i], next[j]);
    sol += (intersection * (intersection - 1)) / 2;
  }
}

console.log(sol);

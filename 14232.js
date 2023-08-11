/*
모든 보석을 곱했을 때 무게가 나와야 한다?
  -> 소인수분해
"그 체"를 쓰기에는 배열이 너무 큼
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const weight = Number(require('fs').readFileSync(INPUT_FILE).toString());

const findFirstDivisor = (value) => {
  const root = Math.round(Math.sqrt(value));
  for (let i = 2; i <= root; i += 1) {
    if (value % i === 0) return i;
  }
  return value;
};

let remainingWeight = weight;
const gems = [];

while (remainingWeight > 1) {
  const gem = findFirstDivisor(remainingWeight);

  while (remainingWeight > 1 && remainingWeight % gem === 0) {
    gems.push(gem);
    remainingWeight /= gem;
  }
}

console.log(`${gems.length}\n${gems.join(' ')}`);

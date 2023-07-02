const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const n = Number(require('fs').readFileSync(INPUT_FILE).toString());

const fiboLike = [0, 1, 1, 1, 2, 3, 4, 6, 9, 13, 19].map(BigInt);

for (let i = fiboLike.length; i <= n; i += 1) {
  fiboLike.push(fiboLike[i - 1] + fiboLike[i - 3]);
}

console.log(fiboLike[n].toString());

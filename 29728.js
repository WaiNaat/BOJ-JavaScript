/*
하 뒤집기만 아니었어도 날먹인데
체 + 투포인터
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const N = Number(require('fs').readFileSync(INPUT_FILE).toString());

const isPrime = new Array(N + 1).fill(true);
isPrime[0] = false;
isPrime[1] = false;

for (let i = 2; i <= Math.sqrt(N); i += 1) {
  if (!isPrime[i]) continue;

  for (let notPrime = i * 2; notPrime <= N; notPrime += i) {
    isPrime[notPrime] = false;
  }
}

const A = {
  list: new Array(N * 2),
  bCount: 0,
  sCount: 0,
  left: N,
  right: N - 1,
  isReversed: false,

  addNotPrime() {
    if (!this.isReversed) {
      this.right += 1;
      this.list[this.right] = 'B';
    } else {
      this.left -= 1;
      this.list[this.left] = 'B';
    }

    this.bCount += 1;
  },

  addPrime() {
    if (!this.isReversed) {
      if (this.list[this.right] === 'B') {
        this.list[this.right] = 'S';
        this.bCount -= 1;
        this.sCount += 1;
      }
      this.right += 1;
      this.list[this.right] = 'S';
    } else {
      if (this.list[this.left] === 'B') {
        this.list[this.left] = 'S';
        this.bCount -= 1;
        this.sCount += 1;
      } else {
        this.left -= 1;
        this.list[this.left] = 'S';
      }
      this.isReversed = !this.isReversed;
    }
    this.sCount += 1;
  },
};

for (let i = 1; i <= N; i += 1) {
  if (isPrime[i]) A.addPrime();
  else A.addNotPrime();
}

console.log(A.bCount, A.sCount);

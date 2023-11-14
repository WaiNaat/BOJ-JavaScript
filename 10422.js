// 결국 답지봄.. 어떻게 이걸 생각하냐고

/*
dp

opt(i) := 길이가 i인 올바른 괄호문자열 개수

올바른괄호문자열 = (올바른괄호문자열)올바른괄호문자열
의 꼴로 표현할 수 있음

opt(i) = sum(opt(k) * opt(i-2-k))
opt(홀수) = 0
opt(0) = 1
opt(2) = 1
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...lengths] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map(Number);

const DIVISOR = 1_000_000_007n;
const opt = [1n, 0n, 1n];

const getValidParenStringCount = (length) => {
  if (length < opt.length) return opt[length];

  while (opt.length <= length) {
    const current = opt.length;

    if (current % 2 === 1) {
      opt.push(0n);
      continue;
    }

    let value = 0n;

    for (let k = 0; k <= current - 2; k += 2) {
      value += opt[k] * opt[current - 2 - k];
      value %= DIVISOR;
    }

    opt.push(value);
  }

  return opt[length];
};

const sol = lengths.map((length) => getValidParenStringCount(length));
console.log(sol.join('\n'));

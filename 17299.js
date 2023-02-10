/*
일단 F(A_i)를 구해야 함.
그다음에 배열을 역으로 순회하면서 스택을 이용해 오등큰수 계산
  스택 꼭대기의 숫자가 본인보다 등장횟수가 적은애들은 전부 pop
*/
const countAppearance = (sequence) => {
  const counts = {};
  sequence.forEach((number) => {
    if (!Object.prototype.hasOwnProperty.call(counts, number)) {
      counts[number] = 0;
    }
    counts[number] += 1;
  });
  return counts;
};

const calculateNGF = (value, appearanceCounts, stack) => {
  const count = appearanceCounts[value];
  while (stack.length > 0 && count >= appearanceCounts[stack[stack.length - 1]]) {
    stack.pop();
  }
  if (stack.length > 0) return stack[stack.length - 1];
  return -1;
};

const calculateNGFs = (sequence, appearanceCounts) => {
  const ngfList = [];
  const stack = [];
  while (sequence.length > 0) {
    const value = sequence.pop();
    ngfList.push(calculateNGF(value, appearanceCounts, stack));
    stack.push(value);
  }
  ngfList.reverse();
  return ngfList;
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [N, ...sequence] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(/\s/)
  .map(Number);

// process
const appearanceCounts = countAppearance(sequence);
const ngfList = calculateNGFs(sequence, appearanceCounts);

// output
console.log(ngfList.join(' '));

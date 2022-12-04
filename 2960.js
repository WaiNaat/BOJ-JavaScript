const eraseMultiple = (start, max, count, K, visitedArray) => {
  let cnt = count;
  const visited = visitedArray;
  for (let number = start; number <= max; number += start) {
    if (!visited[number]) {
      visited[number] = true;
      cnt += 1;
      if (cnt === K) return { number, count: cnt };
    }
  }
  return { number: -1, count: cnt };
};

const findKthErasedNumber = (max, K) => {
  const visited = new Array(max + 1);
  let count = 0;
  let number;
  for (let candidate = 2; candidate <= max; candidate += 1) {
    if (!visited[candidate]) {
      ({ count, number } = eraseMultiple(candidate, max, count, K, visited));
      if (count === K) break;
    }
  }
  return number;
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [N, K] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(' ')
  .map(Number);

// process & output
console.log(findKthErasedNumber(N, K));

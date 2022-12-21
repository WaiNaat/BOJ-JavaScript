/*
10!=약 300만
완전탐색 해도 될듯?
*/
const candidate = [];
const visited = new Array(10);
let answer = 0;

const compare = (target, value) => {
  if (Math.abs(value - target) < Math.abs(answer - target)) {
    answer = value;
  }
};

const findSimilar = (target) => {
  if (target.toString().length === candidate.length || candidate.length === 10) {
    compare(target, Number(candidate.join('')));
    return;
  }

  for (let number = 0; number < 10; number += 1) {
    if (!visited[number]) {
      candidate.push(number);
      visited[number] = true;
      findSimilar(target);
      visited[number] = false;
      candidate.pop();
    }
  }
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const question = Number(require('fs').readFileSync(INPUT_FILE).toString().trim());

// process
findSimilar(question);

// output
console.log(answer);

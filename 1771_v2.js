/*
어차피 언젠간 다 합쳐짐
스택으로 합칠 수 있으면 합치기
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...cards] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

class Partition {
  constructor(rightPos, max, min) {
    this.rightPos = rightPos;
    this.max = max;
    this.min = min;
  }

  canMergeWith(another) {
    if (!another) return false;
    return another.max + 1 === this.min || this.max + 1 === another.min;
  }

  merge(another) {
    const mergePos = Math.min(this.rightPos, another.rightPos);
    this.rightPos = Math.max(this.rightPos, another.rightPos);
    this.max = Math.max(this.max, another.max);
    this.min = Math.min(this.min, another.min);
    return mergePos;
  }
}

const sol = [];
const stack = [];
const push = (partition) => {
  if (partition.canMergeWith(stack.at(-1))) {
    const mergePos = partition.merge(stack.pop());
    sol.push(mergePos);
    push(partition);
  } else {
    stack.push(partition);
  }
};

cards.forEach((card, index) => {
  const partition = new Partition(index + 1, card, card);
  push(partition);
});

console.log(sol.join('\n'));

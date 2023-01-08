/*
우선순위 큐를 이용한 그래프 탐색
최소 힙
  본인의 선행문제들이 모두 풀렸을 경우에만 힙에 들어갈 수 있다.
  힙 내부에서는 문제 난이도(=문제 번호)를 기준으로 한다.
*/
class Heap {
  constructor() {
    this.list = [undefined];
    this.length = 0;
  }

  push(value) {
    this.list.push(undefined);
    this.length += 1;

    let i;
    for (
      i = this.length;
      i > 1 && value < this.list[Math.floor(i / 2)];
      i = Math.floor(i / 2)
    ) {
      this.list[i] = this.list[Math.floor(i / 2)];
    }
    this.list[i] = value;
  }

  pop() {
    if (this.length < 1) throw new Error('Empty Heap');
    const returnValue = this.list[1];
    const lastValue = this.list.pop();
    this.length -= 1;

    let i = 1;
    while (i <= this.length) {
      const smallerChild = this.findSmallerChild(i, lastValue);
      if (i === smallerChild) break;
      this.list[i] = this.list[smallerChild];
      i = smallerChild;
    }
    if (this.length > 0) this.list[i] = lastValue;
    return returnValue;
  }

  findSmallerChild(parent, value) {
    const leftChild = parent * 2 <= this.length ? this.list[parent * 2] : Infinity;
    const rightChild = (parent * 2 + 1) <= this.length ? this.list[parent * 2 + 1] : Infinity;
    if (value < leftChild && value < rightChild) return parent;
    if (leftChild < value && leftChild < rightChild) return parent * 2;
    return parent * 2 + 1;
  }
}

const FS = require('fs');

const getInput = () => {
  const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
  const [[problemCount, infoCount], ...informations] = FS.readFileSync(INPUT_FILE).toString().trim()
    .split('\n')
    .map((line) => line.split(' ').map(Number));

  return { problemCount, infoCount, informations };
};

const makeGraph = (problemCount, informations) => {
  const precedingCount = new Array(problemCount + 1).fill(0);
  const followingProblems = Array.from(new Array(problemCount + 1), () => []);
  precedingCount[0] = -1;
  informations.forEach(([preceding, following]) => {
    precedingCount[following] += 1;
    followingProblems[preceding].push(following);
  });
  return { precedingCount, followingProblems };
};

const initializeHeap = (precedingCount) => {
  const heap = new Heap();
  precedingCount.forEach((count, problemNumber) => {
    if (count === 0) heap.push(problemNumber);
  });
  return heap;
};

const updateHeap = (heap, followingProblems, precedingCount, solved) => {
  const precedingProblemCount = precedingCount;
  followingProblems.forEach((following) => {
    if (solved[following]) return;
    if (precedingProblemCount[following] > 0) precedingProblemCount[following] -= 1;
    if (precedingProblemCount[following] === 0) heap.push(following);
  });
};

const solveProblems = (precedingCount, followingProblems) => {
  const heap = initializeHeap(precedingCount);
  const solved = new Array(precedingCount.length);
  const solveOrder = [];

  while (heap.length > 0) {
    const problem = heap.pop();
    if (!solved[problem]) {
      solved[problem] = true;
      solveOrder.push(problem);
      updateHeap(heap, followingProblems[problem], precedingCount, solved);
    }
  }
  return solveOrder;
};

// input
const { problemCount, informations } = getInput();

// process
const { precedingCount, followingProblems } = makeGraph(problemCount, informations);
const sol = solveProblems(precedingCount, followingProblems);

// output
console.log(sol.join(' '));

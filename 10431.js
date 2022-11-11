/*
i번 학생: 처음~i-1번 학생들 중 본인보다 키가 큰애들을 밀어냄
단순히 초기상태에서 본인 앞에 본인보다 키큰애가 몇명인지 세는 문제.
O(N^2)이지만 max(N)=20이라 충분히 가능.
*/
// functions
const countMoves = function countTotalMovesCallback(prevMoves, curHeight, index, heights) {
  let moves = 0;

  for (let i = 0; i < index; i += 1) {
    if (heights[i] > curHeight) moves += 1;
  }

  return prevMoves + moves;
};

// input
const inputFile = process.platform === 'linux' ? '/dev/stdin' : './input';
const [P, ...tests] = require('fs').readFileSync(inputFile).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

// process
const sol = [];
tests.forEach((test) => {
  const [caseNo, ...heights] = test;
  const moveCnt = heights.reduce(countMoves, 0);
  sol.push(`${caseNo} ${moveCnt}`);
});

// output
console.log(sol.join('\n'));

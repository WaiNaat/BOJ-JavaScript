/*
내가 지금 보고 있는 건물 X의 오른쪽으로 몇 개가 보이는지 아는 법

일단 가장 가까운 건물 A를 본다.
X와 A 꼭대기를 잇는 선분의 기울기 prevGradient 를 구한다.
다음 건물 B을 본다.
X와 B 꼭대기를 잇는 선분의 기울기 curGradient 를 구한다.
prevGredient >= curGradient 면 안보인다.
다음 건물 C를 본다...
>> 점점 기울기가 커져야 함.

왼쪽으로 몇 개가 보이는지는 반대로 하면 됨.
*/
// constants
const RIGHT = 1;
const LEFT = -1;

// function
const look = (curHeight, startIndex, heights, direction) => {
  let prevGradient = -Infinity;
  let count = 0;

  for (let i = startIndex + direction; i >= 0 && i < heights.length; i += direction) {
    let curGradient = (heights[i] - curHeight) / (i - startIndex);
    curGradient *= direction;

    if (prevGradient < curGradient) {
      prevGradient = curGradient;
      count += 1;
    }
  }

  return count;
};

// input
const inputFile = process.platform === 'linux' ? '/dev/stdin' : './input';
const [N, ...heights] = require('fs').readFileSync(inputFile).toString().trim()
  .split(/\s/)
  .map(Number);

// process
let sol = 0;
heights.forEach((height, index, array) => {
  sol = Math.max(
    look(height, index, array, RIGHT) + look(height, index, array, LEFT),
    sol,
  );
});

// output
console.log(sol);

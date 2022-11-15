/*
스택

고도가 바뀌는 지점 하나씩 골라서 스택에 넣어본다.
고도가 높아진다?
  높아지면 무조건 새 건물이란 뜻
고도가 낮아진다?
  본인보다 높은애들을 전부 빼본다
  만약 스택에 본인보다 작은게 남아있으면 새로운 건물
  본인과 같은 높이가 남아있으면 그 건물의 연장선이라 생각
*/
// input
const inputFile = process.platform === 'linux' ? '/dev/stdin' : './input';
let [N, ...skyline] = require('fs').readFileSync(inputFile).toString().trim()
  .split('\n');

skyline = skyline.map((line) => {
  const coord = line.split(' ').map(Number);
  return coord[1];
});

// process
const stack = [0];
let sol = 0;

skyline.forEach((height) => {
  while (stack[stack.length - 1] > height) {
    stack.pop();
  }

  if (stack[stack.length - 1] < height) {
    sol += 1;
  }
  stack.push(height);
});

// output
console.log(sol);

// 메모리 초과

/*
"항상 가능한 입력"

3 2 1 5 4
321 54
32154
단순히 1부터 출발하기에는 중간에 끊어질 수 있음

스택을 써서 거꾸로 하는게 나을거같은데
-> 특정 구역에서 가장 큰 값을 기준으로 좌우로 분리해서 스택에 넣기

6732154
67 32154
67 321 54
67 321 5 4
67 3 21 5 4
67 3 2 1 5 4
6 7 3 2 1 5 4

그러면 핵심은 특정 구간에서 가장 큰 값이 뭔지를 어떻게 아느냐 <~~ 이건데
  구간 내 숫자는 모두 연속적으로 연결되어있음
  나눌때 왼쪽에 최댓값 8이 있었고, 왼쪽 크기가 3이라면 왼쪽엔 678이, 오른쪽엔 12345가 필연적으로 존재

3215476
32154 76

최댓값 기준으로 왼쪽으로 나눌건지 오른쪽으로 나눌건지는 누가 정함?
  최댓값이 그룹 맨앞 or 맨끝이라면 그냥 분리
  중간이면? 최댓값-1 위치 찾아서 거기부터 최댓값까지 오는 뱡향이 한 세트임

스택에는 작은 값이 나중에 들어가야 함 -> 거꾸로 조립할때 작은거부터 해야 안꼬임
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [cardCount, ...cards] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const positions = Object.fromEntries(cards.map((value, index) => [value, index]));
const stack = [{ left: 0, right: cardCount - 1, maxValue: cardCount }];
const sol = [];

while (stack.length > 0) {
  const { left, right, maxValue } = stack.pop();

  if (left >= right) continue;

  const maxPosition = positions[maxValue];

  // 그룹 왼쪽이 최댓값이면 그 친구만 분리
  if (maxPosition === left) {
    sol.push(maxPosition);
    stack.push({ left: left + 1, right, maxValue: maxValue - 1 });
    continue;
  }

  // 그룹 오른쪽이 최댓값이면 그 친구만 분리
  if (maxPosition === right) {
    sol.push(maxPosition - 1);
    stack.push({ left, right: right - 1, maxValue: maxValue - 1 });
    continue;
  }

  const secondMaxPosition = positions[maxValue - 1];

  if (maxPosition < secondMaxPosition) {
    // 최댓값 기준 오른쪽에 최댓값-1 숫자가 있어서 묶여야 함
    const rightPartitionSize = right - maxPosition + 1;
    const leftPartitionMax = maxValue - rightPartitionSize;
    sol.push(maxPosition - 1);
    stack.push({ left: maxPosition, right, maxValue });
    stack.push({ left, right: maxPosition - 1, maxValue: leftPartitionMax });
  } else {
    // 최댓값 기준 왼쪽에 최댓값-1 숫자가 있어서 묶어야 함
    const leftPartitionSize = maxPosition - left + 1;
    const rightPartitionMax = maxValue - leftPartitionSize;
    sol.push(maxPosition);
    stack.push({ left, right: maxPosition, maxValue });
    stack.push({ left: maxPosition + 1, right, maxValue: rightPartitionMax });
  }
}

console.log(
  sol
    .map((val) => val + 1)
    .reverse()
    .join('\n'),
);

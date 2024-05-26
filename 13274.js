// 메모리 초과라고?

/**
 * 아니왜완전똑같은로직파이썬으로하면통과되는데자바스크립트로하면안되는거냐고!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */

/*
다시 정렬하는게 압박
우순큐를 써도 정렬시간쓰는건 매한가지
매 쿼리마다 정렬을 하지 않는다면 시간에 맞출 수 있음

수열의 어떤 구간에
값을 더할 때
  그 구간 이전의 숫자들 위치는 불변
값을 뺄 때
  그 구간 이후의 숫자들 위치는 불변

투 포인터
포인터 하나는 쿼리 시작
다른 하나는 쿼리로 인해 위치가 변할 가능성이 있는 구역의 시작
둘중에 더 작은 숫자쪽의 포인터에서 하나 뽑아서 쿼리 결과물 배열에 넣고 포인터 이동
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, sequence, ...queries] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

sequence.sort((one, another) => one - another);

const sol = queries.reduce((prev, [left, right, value]) => {
  if (value === 0) return prev;

  const isLeftUneffectedByQuery = value > 0;
  if (isLeftUneffectedByQuery) {
    let queryPointer = left - 1;
    let effectedPointer = right;
    const next = prev.slice(0, left - 1);

    while (queryPointer < right && effectedPointer < sequence.length) {
      if (prev[queryPointer] + value < prev[effectedPointer]) {
        next.push(prev[queryPointer] + value);
        queryPointer += 1;
      } else {
        next.push(prev[effectedPointer]);
        effectedPointer += 1;
      }
    }

    while (queryPointer < right) {
      next.push(prev[queryPointer] + value);
      queryPointer += 1;
    }
    while (effectedPointer < sequence.length) {
      next.push(prev[effectedPointer]);
      effectedPointer += 1;
    }

    return next;
  }

  let queryPointer = left - 1;
  let effectedPointer = 0;
  const next = [];

  while (queryPointer < right && effectedPointer < left - 1) {
    if (prev[queryPointer] + value < prev[effectedPointer]) {
      next.push(prev[queryPointer] + value);
      queryPointer += 1;
    } else {
      next.push(prev[effectedPointer]);
      effectedPointer += 1;
    }
  }

  while (queryPointer < right) {
    next.push(prev[queryPointer] + value);
    queryPointer += 1;
  }
  while (effectedPointer < left - 1) {
    next.push(prev[effectedPointer]);
    effectedPointer += 1;
  }

  next.push(...prev.slice(right));

  return next;
}, sequence);

console.log(sol.join(' '));

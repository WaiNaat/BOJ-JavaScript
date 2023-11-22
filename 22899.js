/*
총 K문제 출제
출제자 한 명은 L개까지 가능
아 이게 각 사람이 어떤 문제를 낼수있는지가 정해져있구나

시간의 합이 최소
  -> 어차피 내야하는 문제수는 정해져있으니까 그냥 짧은거부터

시간 짧은순대로 정렬
시간 짧은거부터 보면서
  이 출제자가 이미 L개를 냈으면 패스
  아니면 출제

L이 1부터 N까지라고?
  100,000^2라서 위처럼 그냥하면 안됨

길이 K인 출제 우순큐: 가장 오래걸리는게 최우선
대기문제 우순큐: 가장 짧게걸리는게 최우선
본인문제 스택: 가장 짧게걸리는게 먼저 빠짐
  L=1 일 때
    본인문제 스택들에서 1개씩 뺴서 대기 우순큐에 넣기
    대기 우순큐에서 K개를 빼서 출제 우순큐에 넣기
    출제 우순큐 길이가 K가 아니면 실패
  L=2 일 때
    본인문제 스택들에서 1개씩 빼서 대기 우순큐에 넣기
    출제 우순큐 길이가 K가 아니라면
      될때까지 대기 우순큐에서 빼서 넣기
    K라면
      대기 우순큐에서 젤 짧은게 출제우순큐에서 젤 긴거보다 짧으면
      대기 우순큐와 출제 우순큐의 최우선값 서로 바꿔넣기

힙 구현
넣기
  배열 맨 뒤에 넣기
  부모 끌어내리기
빼기
  맨 앞 제거
  맨 뒤 제거후 기억
  자식 끌어올리기
  리프노드에 기억한거 넣기
  부모 끌어내리기
*/
class MaxHeap {
  list = [null];
  length = 0;

  push(value) {
    this.list.push(value);
    this.length += 1;
    this.pullParentDown(this.length);
  }

  pop() {
    if (!this.length) return null;

    const deleted = this.list[1];
    const last = this.list.pop();
    this.length -= 1;

    if (!this.length) return deleted;

    const leaf = this.fillEmpty();
    this.list[leaf] = last;
    this.pullParentDown(leaf);

    return deleted;
  }

  pullParentDown(start) {
    let me = start;
    const myValue = this.list[me];

    while (me > 1) {
      const parent = Math.floor(me / 2);
      if (myValue <= this.list[parent]) break;
      this.list[me] = this.list[parent];
      me = parent;
    }

    this.list[me] = myValue;
  }

  fillEmpty() {
    let empty = 1;

    while (empty * 2 <= this.length) {
      const left = empty * 2;
      const right = left + 1;
      const largerChild = right > this.length || this.list[left] >= this.list[right] ? left : right;

      this.list[empty] = this.list[largerChild];
      empty = largerChild;
    }

    return empty;
  }

  peek() {
    return this.length ? this.list[1] : null;
  }
}

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[problemCount, limit], makers, times] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const problems = {};

for (let i = 0; i < problemCount; i += 1) {
  if (!problems[makers[i]]) problems[makers[i]] = [];
  problems[[makers[i]]].push(times[i]);
}

Object.values(problems).forEach((myProblems) => myProblems.sort((one, another) => another - one));

const orangeCup = new MaxHeap();
const candidates = new MaxHeap();
const sol = [];
let timeSum = 0;

for (let L = 1; L <= problemCount; L += 1) {
  // 지금 가능한 문제들 대기열 추가
  Object.keys(problems).forEach((name) => {
    if (!problems[name].length) {
      delete problems[name];
      return;
    }

    const time = problems[name].pop();
    candidates.push(-time);
  });

  // 부족하면 다 넣기
  while (candidates.length && orangeCup.length < limit) {
    const time = -candidates.pop();
    orangeCup.push(time);
    timeSum += time;
  }

  while (orangeCup.length === limit && candidates.length && orangeCup.peek() > -candidates.peek()) {
    timeSum -= orangeCup.pop();
    const time = -candidates.pop();
    orangeCup.push(time);
    timeSum += time;
  }

  sol.push(orangeCup.length === limit ? timeSum : -1);
}

console.log(sol.join(' '));

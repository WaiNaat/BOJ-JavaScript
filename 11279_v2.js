/*
넣기
  1. 배열 맨 뒤에 추가
  2. 부모가 본인보다 우선순위가 낮다면 끌어내리기
빼기
  1. 맨 앞 요소 제거
  2. 맨 뒤 요소 제거 후 맨 앞자리에 삽입
  3. 맨 앞 요소부터 본인 자식들 중 본인보다 우선순위가 높은 게 있다면 끌어올리기
*/
class Heap {
  list = [null];
  length = 0;

  push(value) {
    this.list.push(value);
    this.length += 1;

    let me = this.length;

    while (me > 1) {
      const parent = Math.floor(me / 2);

      if (value <= this.list[parent]) break;

      this.list[me] = this.list[parent];
      me = parent;
    }

    this.list[me] = value;
  }

  pop() {
    if (!this.length) return 0;

    const deleted = this.list[1];
    const last = this.list.pop();
    this.length -= 1;

    if (!this.length) return deleted;

    let me = 1;

    while (me * 2 <= this.length) {
      const left = me * 2;
      const right = left + 1;

      const largerChild = right > this.length || this.list[left] >= this.list[right] ? left : right;

      if (last >= this.list[largerChild]) break;

      this.list[me] = this.list[largerChild];
      me = largerChild;
    }

    this.list[me] = last;

    return deleted;
  }
}

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...commands] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map(Number);

const h = new Heap();
const sol = [];

commands.forEach((value) => {
  if (value) {
    h.push(value);
    return;
  }

  sol.push(h.pop());
});

console.log(sol.join('\n'));

/*
덱 만드는 문제
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...commands] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' '));

class Game {
  first = 1_000_000;
  last = 1_000_001;
  list = new Array(2_000_002);
  order = [];

  pushFirst(value) {
    this.first -= 1;
    this.list[this.first] = value;
    this.order.push('first');
  }

  pushLast(value) {
    this.list[this.last] = value;
    this.last += 1;
    this.order.push('last');
  }

  pop() {
    if (this.last - this.first - 1 === 0) return;

    if (this.order.pop() === 'first') {
      this.first += 1;
    } else {
      this.last -= 1;
    }
  }

  toString() {
    return this.list.slice(this.first, this.last).join('');
  }
}

const game = new Game();

commands.forEach(([command, value]) => {
  if (command === '1') game.pushLast(value);
  else if (command === '2') game.pushFirst(value);
  else game.pop();
});

console.log(game.toString() || 0);

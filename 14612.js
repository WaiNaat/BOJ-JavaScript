const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...commands] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' '));

const memo = {
  list: [],

  order(table, time) {
    this.list.push({ table, time });
  },

  sort() {
    this.list.sort((one, another) => {
      if (one.time !== another.time) return one.time - another.time;
      return one.table - another.table;
    });
  },

  complete(target) {
    this.list = this.list.filter(({ table }) => table !== target);
  },

  print() {
    return this.list.map(({ table }) => table);
  },
};

const sol = [];

commands.forEach(([command, table, time]) => {
  switch (command) {
    case 'order':
      memo.order(Number(table), Number(time));
      break;
    case 'sort':
      memo.sort();
      break;
    default:
      memo.complete(Number(table));
  }

  const result = memo.print();
  sol.push(result.length ? result.join(' ') : 'sleep');
});

console.log(sol.join('\n'));

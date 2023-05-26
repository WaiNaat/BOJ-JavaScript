const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [x, y] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(' ')
  .map(Number);

const date = new Date(`2007-${x}-${y}`);
const day = date.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();

console.log(day);

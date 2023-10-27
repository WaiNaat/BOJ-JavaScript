const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [info, ...rest] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const [, extensionCount] = info.split(' ').map(Number);
const files = rest.slice(0, -extensionCount).map((line) => line.split('.'));
const extensions = new Set(rest.slice(-extensionCount));

files.sort((one, another) => {
  if (one[0] !== another[0]) return one[0] < another[0] ? -1 : 1;

  if (extensions.has(one[1]) && !extensions.has(another[1])) return -1;
  if (!extensions.has(one[1]) && extensions.has(another[1])) return 1;

  return one[1] < another[1] ? -1 : 1;
});

console.log(files.map((line) => line.join('.')).join('\n'));

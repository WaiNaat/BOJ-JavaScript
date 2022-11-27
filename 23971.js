const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [height, width, heightGap, widthGap] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(' ')
  .map(Number);

console.log(
  Math.ceil(height / (heightGap + 1)) * Math.ceil(width / (widthGap + 1)),
);

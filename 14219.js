/*
3*1짜리가 있으므로 가로나 세로 중 하나는 자유
나머지는 3의 배수여야함
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [width, height] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(' ')
  .map(Number);

console.log((width * height) % 3 === 0 ? 'YES' : 'NO');

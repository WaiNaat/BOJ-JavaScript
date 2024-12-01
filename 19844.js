/*
그냥 구현
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const sol = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/[ -]/)
  .map((word) => word.split(/^(?:[cjnmtsld]|qu)'[aeiouh]/))
  .flat().length;

console.log(sol);

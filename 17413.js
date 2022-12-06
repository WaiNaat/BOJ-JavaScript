/*
구현
단어인 부분은 따로 모아서 뒤집어야 함
현재 문자 또는 공백이 단어인지 태그인지 파악해야 함
*/
// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const S = require('fs').readFileSync(INPUT_FILE).toString().trim();

// process
const sol = [];
let word = [];
let isWord = false;
let isTag = false;

for (let i = 0; i < S.length; i += 1) {
  if (S[i] === ' ' && isWord) {
    sol.push(word.reverse().join(''));
    sol.push(' ');
    word = [];
    isWord = false;
  } else if (S[i] === ' ' && isTag) {
    sol.push(' ');
  } else if (S[i] === '<') {
    sol.push(word.reverse().join(''));
    sol.push('<');
    word = [];
    isWord = false;
    isTag = true;
  } else if (S[i] === '>') {
    sol.push('>');
    isTag = false;
  } else if (isTag) {
    sol.push(S[i]);
  } else if (isWord) {
    word.push(S[i]);
  } else {
    word.push(S[i]);
    isWord = true;
  }
}

sol.push(word.reverse().join(''));

// output
console.log(sol.join(''));

/*
'모든' 폭발 문자열이 '동시에' 터져야 하는가? ㄴㄴ
  어차피 서로 떨어져 있는 폭발 문자열은 서로에게 영향을 주지 않음
  폭발 문자열 안에 폭발 문자열이 있는 경우 애초에 동시에 터질 수 없음
스택을 써서 폭발 문자열이 완성되는 순간 터뜨림
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [target, bomb] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const stack = [];

Array.from(target).forEach((char) => {
  stack.push(char);

  const isBomb = stack.slice(-bomb.length).join('') === bomb;

  if (isBomb) {
    for (let i = 0; i < bomb.length; i += 1) {
      stack.pop();
    }
  }
});

const remainder = stack.join('');

console.log(remainder || 'FRULA');

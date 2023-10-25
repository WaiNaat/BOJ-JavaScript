/*
시간 널널
  -> 쌍 검사는 부담X

순서가 바뀌지 않음 << 이게 핵심
각 단어의 알파벳을 '숫자'로 치환
  알파벳 등장 순서대로 1, 2, ... 이렇게 바꿈
  이미 등장한 알파벳은 앞에서 만든 숫자로 치환
  -> 모든 단어를 수열로 바꿀 수 있음
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...words] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((word) => word.split(''));

const toSequence = (word) => {
  const dict = new Map();
  const sequence = [];

  word.forEach((char) => {
    if (!dict.has(char)) dict.set(char, dict.size);
    sequence.push(dict.get(char));
  });

  return sequence.join(' ');
};

const sequences = words.map(toSequence);
let count = 0;

for (let i = 0; i < sequences.length; i += 1) {
  for (let j = i + 1; j < sequences.length; j += 1) {
    if (sequences[i] === sequences[j]) count += 1;
  }
}

console.log(count);

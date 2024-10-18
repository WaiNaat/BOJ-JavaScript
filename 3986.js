/*
스택
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...words] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const isGoodWord = (word) => {
  const stack = [];

  Array.from(word).forEach((char) => {
    if (stack.at(-1) === char) {
      stack.pop();
    } else {
      stack.push(char);
    }
  });

  return stack.length === 0;
};

const sol = words.filter(isGoodWord).length;

console.log(sol);

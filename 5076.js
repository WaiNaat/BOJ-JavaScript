/*
문자열이라는 점만 빼면
스택을 이용한 올바른 괄호검사랑 같음
*/
const OPENING = 0;
const CLOSING = 1;
const VOID = 2;

const getTags = (code) => {
  const tagRegExp = /<([^<>]+)>/g;
  const matches = code.matchAll(tagRegExp);
  const tags = [...matches].map((match) => match[1]);
  return tags;
};

const getTagNameAndType = (tag) => {
  let name = tag.split(/\s/)[0];
  if (tag[0] === '/') {
    return { name: name.slice(1), type: CLOSING };
  }
  if (tag[tag.length - 1] === '/') {
    if (name[name.length - 1] === '/') name = name.slice(0, name.length - 1);
    return { name, type: VOID };
  }
  return { name, type: OPENING };
};

const isLegal = (code) => {
  const tags = getTags(code);
  const stack = [null];

  for (let index = 0; index < tags.length && stack.length > 0; index += 1) {
    const { name, type } = getTagNameAndType(tags[index]);

    if (type === OPENING) {
      stack.push(name);
    } else if (type === CLOSING) {
      if (stack.pop() !== name) return false;
    }
  }
  if (stack.length > 1) return false;
  return true;
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const inputs = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

inputs.pop();

// process
const results = [];
inputs.forEach((line) => {
  const result = isLegal(line) ? 'legal' : 'illegal';
  results.push(result);
});

// output
console.log(results.join('\n'));

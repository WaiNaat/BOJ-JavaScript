/*
h
| \
i ello

r
| \
un  erun
|
ning

이런식으로 트리를 구성
이파리 개수를 센다.
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [_, ...words] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

const tree = {};

const makeTree = (word) => {
  let root = tree;

  for (let i = 0; i < word.length; i += 1) {
    const char = word[i];

    if (!root[char]) root[char] = {};

    root = root[char];
  }
};

words.forEach((word) => makeTree(word));

let leafCount = 0;

const dfs = (root) => {
  if (Object.keys(root).length === 0) {
    leafCount += 1;
    return;
  }

  Object.values(root).forEach((child) => dfs(child));
};

Object.values(tree).forEach((root) => dfs(root));

console.log(leafCount);

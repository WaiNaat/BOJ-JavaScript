/*
유니온 파인드인데
부모 위치를 배열로 관리하는게 아님
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...inputs] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const sol = [];

let i = 0;
while (i < inputs.length) {
  const relationshipCount = Number(inputs[i]);
  i += 1;

  const parent = {};
  const size = {};

  const find = (name) => {
    if (!parent[name]) return null;
    if (parent[name] === name) return name;
    parent[name] = find(parent[name]);
    return parent[name];
  };

  const union = (one, another) => {
    const elder1 = find(one);
    const elder2 = find(another);

    if (elder1 === elder2 && elder1 && elder2) return;

    if (elder1 && elder2) {
      parent[elder2] = elder1;
      size[elder1] += size[elder2];
    } else if (elder1) {
      parent[another] = elder1;
      size[elder1] += 1;
      size[another] = 1;
    } else if (elder2) {
      parent[one] = elder2;
      size[elder2] += 1;
      size[one] = 1;
    } else {
      parent[one] = one;
      parent[another] = one;
      size[one] = 2;
      size[another] = 1;
    }
  };

  for (let j = 0; j < relationshipCount; j += 1, i += 1) {
    const [one, another] = inputs[i].split(' ');
    union(one, another);
    sol.push(size[find(one)]);
  }
}

console.log(sol.join('\n'));

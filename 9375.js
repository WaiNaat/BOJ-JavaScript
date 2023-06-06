/*
어떤 종류의 의상이 x개가 있다고 하면 선택지는 x+1개(안입는다 포함해서)
모두 안 입는 경우만 제외
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...inputs] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

const getNextTestCase = (() => {
  let i = 0;

  return () => {
    if (i >= inputs.length) return null;

    const clothesCount = Number(inputs[i]);
    i += 1;

    const clothes = [];
    for (let count = 0; count < clothesCount; count += 1) {
      clothes.push(inputs[i].split(' '));
      i += 1;
    }

    return clothes;
  };
})();

const countClothes = (clothes) => {
  if (!clothes.length) return { nothing: 1 };

  const counts = {};

  clothes.forEach(([, kind]) => {
    if (!counts[kind]) counts[kind] = 1;
    counts[kind] += 1;
  });

  return counts;
};

const sol = [];
for (
  let clothes = getNextTestCase();
  clothes !== null;
  clothes = getNextTestCase()
) {
  const counts = countClothes(clothes);
  sol.push(Object.values(counts).reduce((prev, cur) => prev * cur, 1) - 1);
}

console.log(sol.join('\n'));

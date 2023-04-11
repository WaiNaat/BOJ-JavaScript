const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const input = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

input.pop();

const parseInput = (inputs) => {
  let index = 0;

  return () => {
    if (index >= inputs.length) return null;

    const totalPages = Number(inputs[index]);
    index += 1;

    const pages = inputs[index].split(',');
    index += 1;

    return { totalPages, pages };
  };
};

const checkPrintPage = (totalPages, pages) => {
  const isPrintTarget = new Array(totalPages + 1);

  pages.forEach((pageInfo) => {
    const [start, end] = pageInfo.split('-').map(Number);

    if (start > totalPages) return;

    if (!end) isPrintTarget[start] = true;
    else {
      const properEnd = Math.min(end, totalPages);

      for (let page = start; page <= properEnd; page += 1) {
        isPrintTarget[page] = true;
      }
    }
  });

  return isPrintTarget;
};

const getNextTestCase = parseInput(input);

const sol = [];

for (let testCase = getNextTestCase(); testCase; testCase = getNextTestCase()) {
  const { totalPages, pages } = testCase;
  sol.push(checkPrintPage(totalPages, pages).filter((value) => value).length);
}

console.log(sol.join('\n'));

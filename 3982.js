/*
16강 8강 4강 결승 : 4번 이긴팀이 우승
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [_, ...inputs] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' '));

const makeGetNextTestCaseFunction = (input) => {
  let index = 0;

  return () => {
    if (index >= input.length) return [];

    const matches = input.slice(index, index + 16);
    index += 16;

    return matches;
  };
};

const findGameWinner = (teamA, teamB, scoreA, scoreB) => (
  scoreA < scoreB ? teamB : teamA
);

const analyze = (matches) => {
  const analysis = {};

  matches.forEach((match) => {
    const winner = findGameWinner(...match);

    if (!analysis[winner]) analysis[winner] = 0;

    analysis[winner] += 1;
  });

  return analysis;
};

const sol = [];
const getNextTestCase = makeGetNextTestCaseFunction(inputs);

for (
  let matches = getNextTestCase();
  matches.length;
  matches = getNextTestCase()
) {
  const analysis = analyze(matches);
  const finalWinner = Object.keys(analysis).find((team) => analysis[team] === 4);
  sol.push(finalWinner);
}

console.log(sol.join('\n'));

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const input = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

input.pop();

const inputParser = (inputs) => {
  let index = 0;

  return () => {
    if (index >= inputs.length) return { question: -1, answer: -1 };

    const question = Number(inputs[index]);
    index += 1;

    const answer = inputs[index];
    index += 1;

    return { question, answer };
  };
};

const testCaseParser = (inputs) => {
  const getNextQna = inputParser(inputs);

  return () => {
    const testCase = [];

    let question;
    let answer;

    while (answer !== 'right on') {
      ({ question, answer } = getNextQna());

      if (question === -1) return { solution: -1, testCase };

      testCase.push({ question, answer });
    }

    testCase.pop();

    return { solution: question, testCase };
  };
};

const isHonestQna = (solution, question, answer) => {
  if (answer === 'too high') return question > solution;
  return question < solution;
};

const getNextTestCase = testCaseParser(input);

const sol = [];

for (
  let { solution, testCase } = getNextTestCase();
  solution !== -1;
  { solution, testCase } = getNextTestCase()
) {
  const isHonest = testCase.every(
    ({ question, answer }) => isHonestQna(solution, question, answer),
  );

  sol.push(isHonest ? 'Stan may be honest' : 'Stan is dishonest');
}

console.log(sol.join('\n'));

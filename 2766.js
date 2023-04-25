/*
1. 오른쪽으로 절반 건네기
2. 홀수인 친구에게 한 개 주기
3. 모두 개수가 같은지 확인하기
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const inputs = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map(Number);

const getParseNextInputFunction = (inputs) => {
  let index = 0;

  return () => {
    const studentCount = inputs[index];

    if (!studentCount) return [];

    index += 1;
    const candies = inputs.slice(index, index + studentCount);
    index += studentCount;

    return candies;
  };
};

const giveHalf = (candies) => {
  const result = candies.map((value) => value / 2);

  candies.forEach((value, index) => {
    const next = index === candies.length - 1 ? 0 : index + 1;
    result[next] += value / 2;
  });

  return result;
};

const giveCandyToOdd = (candies) => (
  candies.map((value) => (value % 2 === 0 ? value : value + 1))
);

const isAllSame = (candies) => candies.every((value) => value === candies[0]);

const countRoundsAndCandy = (candies) => {
  let round;
  let array = candies;

  for (round = 0; !isAllSame(array); round += 1) {
    array = giveHalf(array);
    array = giveCandyToOdd(array);
  }

  return [round, array[0]];
};

const parseNextInput = getParseNextInputFunction(inputs);

const sol = [];

for (
  let candies = parseNextInput();
  candies.length > 0;
  candies = parseNextInput()
) {
  sol.push(countRoundsAndCandy(candies));
}

console.log(sol.map((answer) => answer.join(' ')).join('\n'));

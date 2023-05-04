// 틀렸습니다 (require('fs') 못쓰는 문제임)

/*
매일 먹는 사료가 세 배씩 늘어남
왜? 내가 먹은 만큼을 내 왼쪽 친구랑 오른쪽 친구가 더 먹음
-> 내가 먹은거의 세 배가 있어야 함
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [_, ...testCases] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

const makeGetNextTest = (tests) => {
  let i = 0;

  return () => {
    if (i >= tests.length) return { totalFeedAmount: -1, firstDayFeed: [] };

    const totalFeedAmount = Number(tests[i]);
    const firstDayFeed = tests[i + 1].split(' ').map(Number);

    i += 2;

    return { totalFeedAmount, firstDayFeed };
  };
};

const arraySum = (array) => array.reduce((sum, cur) => sum + cur, 0);

const computeFeedFailDay = (totalFeedAmount, firstDayFeed) => {
  const firstDayFeedSum = arraySum(firstDayFeed);

  let day = 0;
  while (firstDayFeedSum * (3 ** day) <= totalFeedAmount) day += 1;

  return day + 1;
};

const getNextTest = makeGetNextTest(testCases);
const sol = [];

for (
  let { totalFeedAmount, firstDayFeed } = getNextTest();
  firstDayFeed.length > 0;
  { totalFeedAmount, firstDayFeed } = getNextTest()
) {
  sol.push(computeFeedFailDay(totalFeedAmount, firstDayFeed));
}

console.log(sol.join('\n'));

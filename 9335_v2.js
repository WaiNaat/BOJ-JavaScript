/*
광고주는 어떤 사용자의 담벼락에 광고를 나타낼지 고르고 선택된 사용자의 광고비만 지불하면 된다
사용자의 친구들 모두와 자기 자신은 그 광고를 볼 수 있다

모든 친구를 타고타고 가는 건 아님
사용자 수 20명
  보내는 경우의 수 2^20 완전탐색 가능
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...tests] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const solve = (userInfo) => {
  let minAdCount = Infinity;

  for (let statusValue = 1; statusValue < 2 ** userInfo.length; statusValue += 1) {
    const status = statusValue.toString(2).padStart(userInfo.length, '0');
    const sendCount = Array.from(status).reduce((prev, cur) => prev + (cur === '1' ? 1 : 0), 0);

    if (sendCount >= minAdCount) continue;

    const received = new Set();
    userInfo.forEach((friends, index) => {
      if (status[index] === '0') return;
      received.add(index + 1);
      for (let i = 1; i < friends.length; i += 1) {
        received.add(friends[i]);
      }
    });

    if (received.size === userInfo.length) {
      minAdCount = sendCount;
    }
  }
  return minAdCount;
};

const sol = [];
let i = 0;

while (i < tests.length) {
  const [userCount] = tests[i];
  const userInfo = tests.slice(i + 1, i + 1 + userCount);
  sol.push(solve(userInfo));
  i += userCount + 1;
}

console.log(sol.join('\n'));

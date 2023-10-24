// 틀

/*
광고주는 어떤 사용자의 담벼락에 광고를 나타낼지 고르고 선택된 사용자의 광고비만 지불하면 된다
사용자의 친구들 모두와 자기 자신은 그 광고를 볼 수 있다
모든 친구를 타고타고 가는 건 아님

친구가 젤 많은애한테 보낸다
아직 안 받은 친구가 젤 많은애한테 보낸다
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...tests] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const solve = (userInfo) => {
  const received = new Set();
  let count = 0;

  while (received.size < userInfo.length) {
    const unreceivedCounts = userInfo.map(
      ([, ...friends], index) =>
        friends.filter((friend) => !received.has(friend)).length +
        (received.has(index + 1) ? 0 : 1),
    );
    const max = Math.max(...unreceivedCounts);
    const target = unreceivedCounts.findIndex((value) => value === max);

    received.add(target + 1);
    const [, ...friends] = userInfo[target];
    friends.forEach((friend) => received.add(friend));

    count += 1;
  }

  return count;
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

// 메모리 초과

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

const getNextCombinations = (lists, max) => {
  const result = [];
  lists.forEach((list) => {
    const last = list.at(-1) ?? 0;
    for (let i = last + 1; i <= max; i += 1) {
      result.push([...list, i]);
    }
  });
  return result;
};

const solve = (userInfo) => {
  let candidates = getNextCombinations([[]], userInfo.length);

  for (let count = 1; count < userInfo.length; count += 1) {
    for (let i = 0; i < candidates.length; i += 1) {
      const received = new Set();
      const candidate = candidates[i];

      userInfo.forEach(([, ...friends], index) => {
        if (!candidate.includes(index + 1)) return;
        received.add(index + 1);
        friends.forEach((friend) => received.add(friend));
      });

      if (received.size === userInfo.length) {
        return count;
      }
    }

    candidates = getNextCombinations(candidates, userInfo.length);
  }

  return userInfo.length;
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

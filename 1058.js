/*
a -> b
a -> x -> b
2-친구의 수: 2단까지만 보는 BFS로 계산 가능
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [peopleCountString, ...friendsMap] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n');

const peopleCount = Number(peopleCountString);
const isFriendMap = friendsMap.map((row) => row.split('').map((value) => value === 'Y'));

const countTwoFriends = (person) => {
  const twoFriends = new Set();
  const friends = [];

  isFriendMap[person].forEach((isFriend, other) => {
    if (isFriend) {
      twoFriends.add(other);
      friends.push(other);
    }
  });

  friends.forEach((friend) => {
    isFriendMap[friend].forEach((isFriend, other) => {
      if (isFriend) twoFriends.add(other);
    });
  });

  twoFriends.delete(person);

  return twoFriends.size;
};

let sol = 0;
for (let person = 0; person < peopleCount; person += 1) {
  const count = countTwoFriends(person);
  if (sol < count) sol = count;
}

console.log(sol);

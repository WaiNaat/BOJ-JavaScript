/*
총의 사정거리는 다 똑같다
-> 동물과 가까운 사냥터일수록 y축 사거리가 길다
-> 각 동물은 x축으로 가장 가까운 사냥터에서 못잡으면 영원히 못잡는다
-> 이분 탐색으로 가장 가까운 사대를 찾는다.
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[gunSpotCount, _, range], gunSpots, ...animals] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

gunSpots.sort((a, b) => a - b);

const getNearestGunSpot = (target) => {
  if (target <= gunSpots[0]) return gunSpots[0];
  if (target >= gunSpots[gunSpotCount - 1]) return gunSpots[gunSpotCount - 1];

  let left = 0;
  let right = gunSpotCount;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (target === gunSpots[mid]) return gunSpots[mid];
    if (target < gunSpots[mid]) right = mid;
    else left = mid + 1;
  }

  left -= 1;

  return Math.abs(target - gunSpots[left]) <= Math.abs(target - gunSpots[left + 1])
    ? gunSpots[left]
    : gunSpots[left + 1];
};

const canShoot = (gunSpot, animalX, animalY) => (
  Math.abs(animalX - gunSpot) + animalY <= range
);

const killCount = animals.reduce((prev, [animalX, animalY]) => {
  const gunSpot = getNearestGunSpot(animalX);
  const canKill = canShoot(gunSpot, animalX, animalY);

  return prev + (canKill ? 1 : 0);
}, 0);

console.log(killCount);

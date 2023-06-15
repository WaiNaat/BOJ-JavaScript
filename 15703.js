/*
숫자가 큰 주사위가 아래쪽에 와야 좋음

탑을 거꾸로 쌓아볼까?
-> 본인 밑에 있는 주사위가 본인 숫자 이하여야 함
-> 숫자가 작은 주사위가 아래쪽에 와야 좋음: 처음에 주사위 정렬

각 탑을 배열로 표현하면
새로운 주사위를 쌓을 때: 본인 숫자보다 배열 길이가 크면 못 쌓음
-> 이러면 새로운 탑을 만들어야겠지?

탑이 여러 개라면 주사위에 맞는 탑은?
본인이 쌓일 수 있는 탑 중에 가장 높은 탑
-> max(N)=1000이니까 그냥 순회해도 될듯

탑을 배열로 만들 필요 없는데? 그냥 본인 높이만 알면 됨
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...dice] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(/\s/)
  .map(Number);

const towerHeights = [];

const findPossibleHighestTower = (value) => {
  const maxHeight = Math.max(...towerHeights.filter((height) => value >= height));
  return towerHeights.findIndex((towerHeight) => towerHeight === maxHeight);
};

dice.sort((a, b) => a - b);
dice.forEach((value) => {
  const myTower = findPossibleHighestTower(value);

  if (myTower === -1) {
    towerHeights.push(1);
  } else {
    towerHeights[myTower] += 1;
  }
});

console.log(towerHeights.length);

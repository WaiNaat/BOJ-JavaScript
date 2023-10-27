/*
파란: 상민
빨간: 지수
주문을 받으면 그때부터 포장을 시작
남아있는 선물 중 가장 앞에 있는 선물을 가져와 포장하고 주문을 받은 개수만큼 이를 반복
동시에 선물을 가져올 때는 알바짬이 조금 더 있는 상민이가 먼저 가져옴
상민이와 지수가 각자 어떤 선물들을 포장했는지 알아내는 프로그램

시작 시간과 개수를 보면 정확히 몇 초에 선물을 가져오는지 계산 가능
  -> 선물들의 배열을 만들 수 있음
이걸 정렬하면 끝

근데 포장속도가 느려서 포장하고있는데 다음사람이 주문하면 밀리는거아님??

선물들의 배열을 만들 때 지수와 상민이별로 지금 포장하고있는거 언제끝나는지도 기억
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [info, ...records] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' '));

const [blueSpeed, redSpeed] = info.map(Number);
const presents = [];

let blueEndTime = 0;
let redEndTime = 0;

records.forEach((record) => {
  const color = record[1];
  const [orderTime, , count] = record.map(Number);

  if (color === 'B') {
    blueEndTime = Math.max(blueEndTime, orderTime);
    for (let i = 0; i < count; i += 1) {
      presents.push([blueEndTime, 'B']);
      blueEndTime += blueSpeed;
    }
  } else {
    redEndTime = Math.max(redEndTime, orderTime);
    for (let i = 0; i < count; i += 1) {
      presents.push([redEndTime, 'R']);
      redEndTime += redSpeed;
    }
  }
});

presents.sort((one, another) => {
  if (one[0] !== another[0]) return one[0] - another[0];
  return one[1] === 'B' ? -1 : 1;
});

const blue = [];
const red = [];

presents.forEach(([, color], index) => {
  if (color === 'B') blue.push(index + 1);
  else red.push(index + 1);
});

console.log(blue.length);
console.log(blue.join(' '));
console.log(red.length);
console.log(red.join(' '));

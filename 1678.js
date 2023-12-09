/*
기차들 속도가 다 같다고 가정하면
출발순서대로 역에 도착하니까 자기가 탄거 바로 다음 출발시간인 기차로 갈아탐
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [info, ...trainInfos] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const [, startTime, destination] = info.split(' ').map(Number);
const trains = [];

trainInfos.forEach((line) => {
  const [name, ...times] = line.split(' ');
  times.pop();
  times.map(Number).forEach((time) => {
    trains.push([time, name]);
  });
});

trains.sort((one, another) => one[0] - another[0]);

const startIndex = Math.max(
  trains.findIndex(([time]) => time >= startTime),
  0,
);
const remainder = destination % trains.length;

const [, sol] = trains[(startIndex + remainder + trains.length - 1) % trains.length];

console.log(sol);

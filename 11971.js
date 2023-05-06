/*
도로 길이가 100km밖에 안되니까 100칸짜리 배열로 처리
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const inputs = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const [roadSectionCount] = inputs[0];
const roadSections = inputs.slice(1, roadSectionCount + 1);
const carSections = inputs.slice(roadSectionCount + 1);

const road = [];
roadSections.forEach(([length, speedLimit]) => road.push(...new Array(length).fill(speedLimit)));

const carSpeed = [];
carSections.forEach(([length, speed]) => carSpeed.push(...new Array(length).fill(speed)));

const speedDifference = carSpeed.map((value, index) => value - road[index]);

console.log(Math.max(0, ...speedDifference));

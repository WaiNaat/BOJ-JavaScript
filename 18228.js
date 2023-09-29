/*
펭귄 왼쪽이랑 오른쪽에서 각각 가장 비용이 낮은거 깨기
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ices] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const [left, right] = ices.split('-1').map((side) => side.trim().split(' ').map(Number));

console.log(Math.min(...left) + Math.min(...right));

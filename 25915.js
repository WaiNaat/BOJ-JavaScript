/*
예제 2에서 I부터 시작하면 84거리가 나옴을 알 수 있음
즉 시작점부터 I까지의 거리만 알면 됨
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const start = require('fs').readFileSync(INPUT_FILE).toString().trim();

const startDistance = Math.abs(start.charCodeAt(0) - 'I'.charCodeAt(0));
console.log(startDistance + 84);

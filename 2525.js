const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
let [H, M, time] = require('fs').readFileSync(inputFile).toString().trim().split(/\s/).map(Number);

M += time;
H += parseInt(M / 60);
M %= 60;
H %= 24;

console.log(H, M);
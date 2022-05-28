const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [A, I] = require('fs').readFileSync(inputFile).toString().trim().split(' ');
console.log(A * (I - 1) + 1);
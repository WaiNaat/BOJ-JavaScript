const input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let A = parseInt(input[0]);
let B = parseInt(input[1]);
let sol = A + B;
console.log(sol);
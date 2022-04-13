const char = require("fs").readFileSync("/dev/stdin").toString().trim();
let sol = char.charCodeAt(0);
console.log(sol);
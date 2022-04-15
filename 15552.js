const inputFile = __dirname + '/input'; // '/dev/stdin';
const input = require("fs").readFileSync(inputFile).toString().trim().split(/\s/);

let T = parseInt(input[0]);
let idx = 1;
let sol = [];

while (T > 0)
{
    sol.push(parseInt(input[idx++]) + parseInt(input[idx++]));
    T--;
}

console.log(sol.join('\n'));
const inputFile = '/dev/stdin';
const input = require("fs").readFileSync(inputFile).toString().trim().split(/\s/);

let T = parseInt(input[0]);
let idx = 1;

while (T > 0)
{
    let val1 = parseInt(input[idx++]);
    let val2 = parseInt(input[idx++]);
    console.log(val1 + val2);
    T--;
}
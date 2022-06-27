// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().split('\n');
const N = Number(input[0]);
const A = input[1].split(' ').map(Number);
const [B, C] = input[2].split(' ').map(Number);

// process
let sol = 0;
for (let room of A)
{
    room -= B;
    sol++;
    if (room > 0)
        sol += Math.ceil(room / C);
}

// output
console.log(sol);
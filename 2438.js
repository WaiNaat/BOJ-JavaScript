const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const N = Number(require('fs').readFileSync(inputFile).toString().trim());

let line = '';
const sol = [];
for (let i=0; i<N; i++)
{
    line += '*';
    sol.push(line);
}

console.log(sol.join('\n'));
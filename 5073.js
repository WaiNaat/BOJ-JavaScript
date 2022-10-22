// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const triangle = require('fs').readFileSync(inputFile).toString().trim().split('\n');

// process
const sol = [];
for (let i=0; i<triangle.length-1; i++)
{
    const [a, b, c] = triangle[i].trim().split(' ').map(Number);

    let eq_cnt = 0;
    if (a == b) eq_cnt++;
    if (b == c) eq_cnt++;
    if (c == a) eq_cnt++;

    if (a + b + c - Math.max(a, b, c) <= Math.max(a, b, c))
        eq_cnt = -1;

    if (eq_cnt == -1) sol.push('Invalid');
    else if (eq_cnt == 3) sol.push('Equilateral');
    else if (eq_cnt == 1) sol.push('Isosceles');
    else if (eq_cnt == 0) sol.push('Scalene');   
}

// output
console.log(sol.join('\n'));
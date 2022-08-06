/*
본인과 옆 원생 사이의 키 차이들을 계산
이 키 차이들의 합이 티셔츠 만드는 비용이 되는 셈
조를 나눈다는 건 이 연결관계를 끊는다는 것

즉 키 차이들을 정렬한 후에
가장 큰 K-1개를 없애면 된다.
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [N, K, ...students] = require('fs').readFileSync(inputFile).toString().trim().split(/\s/).map(Number);

// process
const difference = [];
let sol = 0;
for (let i=1; i<N; i++)
    difference.push(students[i] - students[i - 1]);

difference.sort((a, b) => b - a);

for (let i=K-1; i<N-1; i++)
    sol += difference[i];

// output
console.log(sol);
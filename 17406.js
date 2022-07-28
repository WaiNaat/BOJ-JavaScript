/*
백트래킹으로 연산 순서를 정하고
연산은 순수 구현
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [row, col, K] = input[0].trim().split(' ').map(Number);
const A = input.slice(1, 1 + row).map(x => x.trim().split(' ').map(Number));
const operations = input.slice(1 + row).map(x => x.trim().split(' ').map(Number));

// process
const operation_order = [];
const visited = new Array(K);
let sol = Infinity;

make_operation_order();

// output
console.log(sol);

// functions
function make_operation_order()
{
    // base case
    if (operation_order.length == K)
    {
        calc_result(A);
        return;
    }

    // recursive step
    for (let i=0; i<K; i++)
    {
        if (visited[i]) continue;

        visited[i] = true;
        operation_order.push(i);

        make_operation_order();

        operation_order.pop();
        visited[i] = false;
    }
}

function calc_result(matrix)
{
    // 연산 적용
    let A = matrix;

    for (let i of operation_order)
    {
        let [r, c, s] = operations[i];
        r--;
        c--;
        let A2 = Array.from(A, row => Array.from(row));

        for (let s2=1; s2<=s; s2++)
            rotate(A, A2, r, c, s2);

        A = A2;
    }

    // 배열의 값 계산
    let value = Infinity;
    for (let row of A)
    {
        value = Math.min(value, row.reduce((prev, cur) => prev + cur, 0));
    }

    // 정답 계산
    sol = Math.min(sol, value);
}

function rotate(prev, cur, r, c, s)
{
    /* (r, c)부터 s칸 떨어진 정사각형 테두리를 회전시킴 */
    for (let i=0; i<s*2; i++)
    {
        cur[r - s][c - s + i + 1] = prev[r - s][c - s + i]; // 상
        cur[r - s + i + 1][c + s] = prev[r - s + i][c + s]; // 우
        cur[r + s][c + s - i - 1] = prev[r + s][c + s - i]; // 하
        cur[r + s - i - 1][c - s] = prev[r + s - i][c - s]; // 좌
    }
}
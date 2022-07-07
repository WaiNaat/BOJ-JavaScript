/*
그냥 구현?
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

let [sol_r, sol_c, k] = input[0].trim().split(' ').map(Number);
sol_r--;
sol_c--;
let A = [];
for (let i=1; i<=3; i++)
    A.push(input[i].trim().split(' ').map(Number));

// process
let A_row = 3;
let A_col = 3;
let sol = -1;

for (let i=0; i<=100; i++)
{
    if (0 <= sol_r && sol_r < A_row && 0 <= sol_c && sol_c < A_col && A[sol_r][sol_c] == k)
    {
        sol = i;
        break;
    }

    if (A_row >= A_col) R();
    else C();
}

// output
console.log(sol);

// functions
function R()
{
    let newA = [];
    let newColSize = 0;

    for (let row of A)
    {
        // 숫자 세기
        const countMap = new Map();
        for (let val of row)
        {
            if (val === 0) continue;
            if (!countMap.has(val))
                countMap.set(val, 0);
            countMap.set(val, countMap.get(val) + 1);
        }

        // 배열화
        let pair = makePair(countMap);
        let newRow = [];

        for (let [a, b] of pair)
        {
            newRow.push(a);
            if (newRow.length == 100) break;
            newRow.push(b);
            if (newRow.length == 100) break;
        }

        newA.push(newRow);
        newColSize = Math.max(newColSize, newRow.length);
    }

    A = newA;
    A_col = newColSize;
}

function C()
{
    let newA = [];
    let newRowSize = 0;

    for (let c=0; c<A_col; c++)
    {
        // 숫자 세기
        const countMap = new Map();
        for (let r=0; r<A_row; r++)
        {
            if (A[r].length <= c) continue;

            let val = A[r][c];
            if (val === 0) continue;
            if (!countMap.has(val))
                countMap.set(val, 1);
            else
                countMap.set(val, countMap.get(val) + 1);
        }

        // 배열화
        let pair = makePair(countMap);
        let r = 0;
        for (let [a, b] of pair)
        {
            if (r >= newRowSize)
            {
                newA.push(new Array(A_col).fill(0));
                newRowSize++;
            }
            newA[r++][c] = a;

            if (newA.length == 100) break;

            if (r >= newRowSize)
            {
                newA.push(new Array(A_col).fill(0));
                newRowSize++;
            }
            newA[r++][c] = b;

            if (newA.length == 100) break;
        }
    }

    A = newA;
    A_row = newRowSize;
}

function makePair(countMap)
{
    // [수, 개수] 쌍 생성
    let pair = [];
    for (let key of countMap.keys())
        pair.push([key, countMap.get(key)]);
    
    // 정렬
    pair.sort(function (a, b){
        let val = a[1] - b[1];
        if (val === 0)
            return a[0] - b[0];
        else
            return val;
    });

    return pair;
}
/*
opt(i, 1, move) := i초에 자두가 1번나무 밑에 있고 현재 move번 만큼 움직였음
opt(i, 1, move) = 
    opt(i-1, 2, move-1)
    opt(i-1, 1, move)
    둘 중에 큰 값에다가
    만약 i초에 자두가 1번나무 밑으로 떨어지면 +1
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [T, W, ... tree] = require('fs').readFileSync(inputFile).toString().trim().split(/\s/).map(Number);

// process
let prev_tree1 = new Array(W + 1).fill(0);
let prev_tree2 = new Array(W + 1).fill(0);

if (tree[0] == 1) prev_tree1[0] = 1;
else prev_tree2[1] = 1;

for (let i=1; i<T; i++)
{
    let cur_tree1 = Array.from(prev_tree1);
    let cur_tree2 = Array.from(prev_tree2);
    
    for (let move=1; move<=W; move++)
    {
        cur_tree1[move] = Math.max(prev_tree2[move - 1], cur_tree1[move]);
        cur_tree2[move] = Math.max(prev_tree1[move - 1], cur_tree2[move]);
    }

    if (tree[i] == 1) cur_tree1 = cur_tree1.map(x => x + 1);
    else cur_tree2 = cur_tree2.map(x => x + 1);

    prev_tree1 = cur_tree1;
    prev_tree2 = cur_tree2;
}

// output
console.log(Math.max( Math.max(...prev_tree1), Math.max(...prev_tree2)));
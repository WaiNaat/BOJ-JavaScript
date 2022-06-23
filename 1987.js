/*
백트래킹
base case: 움직일 수 없을 때
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');
const [R, C] = input[0].split(' ').map(Number);
const board = [];
for (let i=1; i<=R; i++)
    board.push(input[i].split(''));

// process
let sol = 1;
const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const visited = new Array(26);
const ascii_A = 'A'.charCodeAt(0);
visited[board[0][0].charCodeAt(0) - ascii_A] = true;
move(1, 0, 0);

// output
console.log(sol);

// function
function move(depth, r, c)
{
    let canMove = false;

    // recursive step
    for (let [dr, dc] of directions)
    {
        let r2 = r + dr;
        let c2 = c + dc;

        if (!(0 <= r2 && r2 < R && 0 <= c2 && c2 < C))
            continue;
        
        let index = board[r2][c2].charCodeAt(0) - ascii_A;
        if (visited[index]) continue;

        canMove = true;
        visited[index] = true;
        move(depth + 1, r2, c2);
        visited[index] = false;
    }

    // base case
    if (!canMove)
    {
        sol = Math.max(sol, depth);
        return;
    }
}
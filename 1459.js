/*
만약 대각선으로 가는게 가로세로로 가는거보다 빠르면 대각선을 최대한 많이
만약 가로세로 가는게 대각선 가로지르기보다 빠르면 굳이 가로지를 필요 없음

가로로 2칸 움직여야 할 경우도 대각대각이 가로가로보다 빠를수있음

min(X, Y)=A라 하자
(A, A)까지 가는데 걸리는 시간은 min(2W, S)*A

거기서 (X, Y)까지의 거리 D는 max(X, Y)-A
만약 W>S면 D/2만큼은 대각선으로 움직이고 나머지는 가로세로로 이동
*/
// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [X, Y, W, S] = require('fs').readFileSync(inputFile).toString().trim().split(' ').map(Number);

// process
const A = Math.min(X, Y);
let sol = Math.min(2 * W, S) * A;
const D = (Math.max(X, Y) - A);
sol += W <= S? D * W : parseInt(D / 2) * 2 * S + (D % 2) * W;

// output
console.log(sol);
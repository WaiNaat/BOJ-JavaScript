/*
임의의 두 별을 고른다.
해당 두 별을 모서리로 갖는 곳에 트램펄린을 놓아본다.
1.  * x 
      * 
2.  x *
    *    
이 두 가지 경우를 고려
*/
// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [[X, Y, L, K], ...meteor] = require('fs').readFileSync(inputFile).toString().trim().split('\n').map(line => line.trim().split(' ').map(Number));

// process
let sol = Infinity;

for (let i=0; i<K; i++)
{
    for (let j=i; j<K; j++)
    {
        let x1 = Math.min(meteor[i][0], meteor[j][0]);
        let x2 = Math.max(meteor[i][0], meteor[j][0]);
        let y = Math.min(meteor[i][1], meteor[j][1]);

        sol = Math.min(
            cover_earth(x1, y, L, meteor),
            cover_earth(x2 - L, y, L, meteor),
            sol
        );
    }
}

// output
console.log(sol);

// function
function cover_earth(x1, y1, L, meteor)
{
    let x2 = x1 + L;
    let y2 = y1 + L;
    let cnt = K;
    for (let [x, y] of meteor)
    {
        if (x1 <= x && x <= x2 && y1 <= y && y <= y2)
            cnt--;
    }
    return cnt;
}
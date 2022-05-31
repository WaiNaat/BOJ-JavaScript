/*
opt(i, {w, h}, cnt) := i일에 손녀에게 w/h를 보냈고 쪼갠 하나짜리가 cnt개일 때 경우의 수
opt(i, w, cnt) = 
    opt(i-1, w, cnt-1)
    + opt(i-1, h, cnt-1)
    
opt(i, h, cnt) = 
    opt(i-1, h, cnt)
    + opt(i-1, w, cnt)
    i <= cnt * 2 만족해야 함. 왜? 반으로 쪼갰어야만 반쪽짜리가 있음
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
let input = require('fs').readFileSync(inputFile).toString().trim().split('\n').map(Number);
input.pop();

// process
let sol = [];
for (let N of input)
{
    let prev_w = new Array(N + 1).fill(0);
    let prev_h = new Array(N + 1).fill(0);

    // 1일엔 무조건 반을 쪼개야 함
    prev_w[1] = 1;

    for (let i=2; i<=2*N; i++)
    {
        let cur_w = new Array(N + 1).fill(0);
        let cur_h = new Array(N + 1).fill(0);

        for (let cnt=1; cnt<=N; cnt++)
        {
            cur_w[cnt] = prev_w[cnt - 1] + prev_h[cnt - 1];
            if (i <= cnt * 2) cur_h[cnt] = prev_h[cnt] + prev_w[cnt];
        }

        prev_w = cur_w;
        prev_h = cur_h;
    }

    sol.push(prev_h[N]);
}

// output
console.log(sol.join('\n'));
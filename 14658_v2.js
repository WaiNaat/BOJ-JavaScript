/// 시간 초과 ///

/*
별똥별을 하나 고른다
해당 별똥별을 트램펄린의 모서리에 뒀다 치고 계산
    이러면 100,000*4*100이라 시간은 충분
    >> 400,000 * 100 * 100 이라 부족함!!!!!!!!!!!
트램펄린의 좌상단 꼭짓점을 이동시키는 방법으로 모서리에 있음을 보장
*/
// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [[X, Y, L, K], ...meteor] = require('fs').readFileSync(inputFile).toString().trim().split('\n').map(line => line.trim().split(' ').map(Number));

// process
let sol = Infinity;

for (let [base_x, base_y] of meteor)
{
    for (let y=base_y; y+L<base_y; y--)
        sol = Math.min(cover_earth(base_x, base_x + L, y, y + L, meteor), sol);

    for (let x=base_x; x+L<base_x; x--)
        sol = Math.min(cover_earth(x, x + L, base_y - L, base_y, meteor), sol);

    for (let y=base_y-L; y<base_y; y++)
        sol = Math.min(cover_earth(base_x-L, base_x, y, y + L, meteor), sol);

    for (let x=base_x-L; x<base_x; x++)
        sol = Math.min(cover_earth(x, x + L, base_y, base_y + L, meteor), sol);
}

// output
console.log(sol);

// function
function cover_earth(x1, x2, y1, y2, meteor)
{
    let cnt = K;
    for (let [x, y] of meteor)
    {
        if (x1 <= x && x <= x2 && y1 <= y && y <= y2)
            cnt--;
    }
    return cnt;
}
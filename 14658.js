/// 틀렸습니다 ///

/*
별똥별을 하나 고른다
해당 별똥별을 트램펄린의 꼭짓점에 뒀다 치고 계산

 *
* *
 *
>> 이럴때 꼭짓점에 두면 안됨 !!
*/
// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [[X, Y, L, K], ...meteor] = require('fs').readFileSync(inputFile).toString().trim().split('\n').map(line => line.trim().split(' ').map(Number));

// process
let sol = Infinity;
const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];

for (let [x1, y1] of meteor)
{
    for (let [dx, dy] of directions)
    {
        let x2 = x1 + L * dx;
        let y2 = y1 + L * dy;

        if (x1 > x2)
            [x1, x2] = [x2, x1];
        if (y1 > y2)
            [y1, y2] = [y2, y1];

        let cnt = K;
        for (let [x, y] of meteor)
        {
            if (x1 <= x && x <= x2 && y1 <= y && y <= y2)
                cnt--;
        }

        sol = Math.min(cnt, sol);
    }
}

// output
console.log(sol);
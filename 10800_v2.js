/*
크기, 색깔 오름차순 정렬
map obj에 색깔 => 크기 연동시킴
변수에 여태까지 나온 모든 공들의 크기 합 저장
변수에 본인과 같은 크기인 공들의 크기 저장
변수에 같은 크기인데 색도 같은 공의 개수 저장

어떤 공이 주어졌을 때 그 공이 먹을 수 있는 건
총 크기 - 같은 색깔인 공들의 크기 - (같은 크기인 공들의 크기 - 같은 크기 같은 색인 공들의 크기)
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const N = Number(input[0]);
const balls = input.slice(1).map(function (val, idx){
    let ball = val.trim().split(' ').map(Number);
    ball.push(idx);
    return ball;
});

// process
balls.sort((a, b) => a[1] != b[1]? a[1] - b[1] : a[0] - b[0]);

const color_size = new Map();
const sol = new Array(N);
let total_size = 0;
let current_size = 0;
let current_size_sum = 0;
let current_color = 0;
let current_color_size_sum = 0;

for (let [color, size, idx] of balls)
{
    if (!color_size.has(color))
        color_size.set(color, 0);    

    if (current_size != size)
    {
        current_size = size;
        current_size_sum = 0;
        
        current_color = color;
        current_color_size_sum = 0;
    }
    else if (current_color != color)
    {
        current_color = color;
        current_color_size_sum = 0;
    }

    sol[idx] = total_size - color_size.get(color) - current_size_sum + current_color_size_sum;

    color_size.set(color, color_size.get(color) + size);
    total_size += size;
    current_size_sum += size;
    current_color_size_sum += size;
}

// output
console.log(sol.join('\n'));
/*
조건 만족하는 정사각형의 개수
    >> 이건 그냥 100*100 루프 한번 돌리면 해결가능

드래곤 커브 그리기
    1세대 드래곤 커브를 나타내는 점들의 배열부터 시작
    점점 늘려나가면 됨
    결국 묻는건 이거:
        너 점 기준으로 90도 회전시키는 법 알아?
    그럼 대답은?
        기준점을 원점으로 하는 공간으로 점들을 평행이동 후 90도 회전 후 다시 평행이동
        원점 기준 90도 회전은 (x, y) => (y, -x)
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');
const N = Number(input[0]);
const board = Array.from(new Array(101), () => new Array(101).fill(0));

// process
// 드래곤 커브 그리기
for (let i=1; i<=N; i++)
{
    // 드래곤 커브 하나 그리기
    // 커브 초기 생성
    const [c, r, d, g] = input[i].trim().split(' ').map(Number);
    const dragon_curve = [[r, c]];
    board[r][c] = 1;
    switch(d)
    {
        case 0:
            dragon_curve.push([r, c + 1]);
            board[r][c + 1] = 1;
            break;
        case 1:
            dragon_curve.push([r - 1, c]);
            board[r - 1][c] = 1;
            break;
        case 2:
            dragon_curve.push([r, c - 1]);
            board[r][c - 1] = 1;
            break;
        default:
            dragon_curve.push([r + 1, c]);
            board[r + 1][c] = 1;
            break;
    }

    // 드래곤 커브 확장
    for (let generation=1; generation<=g; generation++)
    {
        let [base_r, base_c] = dragon_curve[dragon_curve.length - 1];
        for (let i=dragon_curve.length-2; i>=0; i--)
        {
            let [r2, c2] = dragon_curve[i];
            r2 -= base_r;
            c2 -= base_c;
            [r2, c2] = [c2, -r2];
            r2 += base_r;
            c2 += base_c;

            dragon_curve.push([r2, c2]);
            board[r2][c2] = 1;
        }
    }
}

// 조건을 만족하는 정사각형 개수 세기
let cnt = 0;
for (let r=0; r<100; r++)
{
    for (let c=0; c<100; c++)
    {
        if (
            board[r][c] === 1 &&
            board[r + 1][c] === 1 &&
            board[r + 1][c + 1] === 1 &&
            board[r][c + 1] === 1
        )
            cnt++;
    }
}

// output
console.log(cnt);
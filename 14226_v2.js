// 틀렸습니다

/*
opt(i, j) := 현재 화면에 임티가 i개고, 클립보드에 j개가 저장돼있음
opt(i, j)가 주어졌을 때 총 세 가지를 바꿀 수 있다.
    opt(i, i) = opt(i, j) + 1        (1번 연산)
    opt(i+j, j) = opt(i, j) + 1      (2번 연산)
    opt(i-1, j) = opt(i, j) + 1      (3번 연산)

배열 채우는 순서?
    대각선으로 채운다.
    opt(k, j)  (k<i) 를 채운다. (3번)
    opt(i+j, j)를 채운다. (2번)
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const S = parseInt(require('fs').readFileSync(inputFile).toString().trim());

// process
let opt = Array.from(Array(S + 1), () => new Array(S + 1).fill(Infinity));

opt[1][0] = 0;
opt[1][1] = 1;
for (let i=2; i<=S; i++)
{
    // opt(i, 1) 및 opt(i, i) 초기화
    opt[i][1] = opt[i - 1][1] + 1;
    opt[i][i] = opt[i][1] + 1;

    // 3번연산 사용
    for (let k=i-1; k>0; k--)
        opt[k][i] = opt[k + 1][i] + 1;

    // 2번연산 사용
    for 
}

// 나머지 계산.
for (let i=2; i<=S; i++)
{    
    // 나머지 채우기
    for (let k=i+1; k<=S; k++)
        opt[k][i] = Math.min(opt[k - i][i] + 1, opt[k][i]);
}

// output
console.log(Math.min(...opt[S]));
console.log(opt[S]);
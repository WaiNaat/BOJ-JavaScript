// 틀렸습니다

/*
opt(i) := 임티 i개 만드는데 걸리는 최소 시간

현재 클립보드에 k개의 임티가 들어있고
opt(i)가 주어졌다면
opt(i+k) = opt(i)+1
opt(i+2k) = opt(i)+2
opt(i+3k) = opt(i)+3
...
이런식으로 채울 수 있고,

i개를 복사해서
opt(2i) = opt(i)+2
opt(3i) = opt(i)+3
...
이런식으로 한번 더 채울 수 있음

opt(1)=0부터 시작해서
opt(S)까지 이 방식대로 채우면 될듯
채울 때 3번 연산도 고려
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const S = parseInt(require('fs').readFileSync(inputFile).toString().trim());

// process
let opt = new Array(S + 1).fill(Infinity);
let clipboard = new Array(S + 1).fill(0);
opt[1] = 0;

for (let i=1; i<S; i++)
{
    if (opt[i + 1] + 1 <= opt[i])
    {
        opt[i] = opt[i + 1] + 1;
        clipboard[i] = clipboard[i + 1];
    }

    if (clipboard[i] != 0)
    {
        for (let k=1; i+clipboard[i]*k <= S; k++)
        {
            if (opt[i] + k <= opt[i + clipboard[i] * k])
            {
                opt[i + clipboard[i] * k] = opt[i] + k;
                clipboard[i + clipboard[i] * k] = clipboard[i];
            }
        }
    }

    for (let k=2; k*i<=S; k++)
    {
        if (opt[i] + k <= opt[k * i])
        {
            opt[k * i] = opt[i] + k;
            clipboard[k * i] = i;
        }
    }
}

// output
console.log(opt[S]);
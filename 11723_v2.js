// 메모리 초과


/*
S가 1~20이니까 길이 21짜리 배열 만들어서 처리가능.

얘도 메모리 초과
*/

// 초기화
const readline = require('readline');
const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let flag = 0;
let sol = [];
let S = new Array(21);
S.fill(0);

// 입력
reader.on('line', function(line)
{
    if (flag != 0)
    {
        line = line.trim().split(/\s/);
        let cmd = line[0];
        let val = parseInt(line[1]);

        // 주어진 명령을 실행
        switch(cmd)
        {
            case 'add':
                S[val]++;
                break;
            
            case 'remove':
                S[val] = 0;
                break;
            
            case 'check':
                if (S[val] > 0)
                    sol.push(1);
                else
                    sol.push(0);
                break;
            
            case 'toggle':
                if (S[val] == 0)
                    S[val] = 1;
                else
                    S[val] = 0;
                break;
            
            case 'all':
                S = null;
                S = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
                break;
            
            default:
                S = null;
                S = new Array(21);
                S.fill(0);
        }

        line = null;
    }
    else
        flag++;

// 출력
}).on('close', function()
{
    console.log(sol.join('\n'));
});
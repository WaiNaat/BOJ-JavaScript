// 메모리 초과


/*
S가 1~20이니까 길이 21짜리 배열 만들어서 처리가능.

메모리 초과
>> 설마 input 배열이 너무 커서?
*/
const assert = require('assert');
assert.equal(1, 2);

/*
이렇게 짜면 입력이고 자시고 일단 AsserttionError가 나와야 하는데
메모리초과가 먼저뜬다? 뭔경우지?
*/

// input
const inputFile = __dirname + '/input'; // '/dev/stdin';
const input = require('fs').readFileSync(inputFile).toString().trim().split(/\s/);


// process
// init
let idx = 1;
let M = parseInt(input[0]);
let S = new Array(21);
S.fill(0);
let sol = [];

// 명령 실행
while (M > 0)
{
    let cmd = input[idx++];
    let val = parseInt(input[idx++]);

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
            val--;
            S = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
            break;
        
        default:
            val--;
            S = new Array(21);
            S.fill(0);
    }

    M--;
}

// output
console.log(sol.join('\n'));
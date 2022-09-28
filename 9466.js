/// 메모리 초과 ///

/*
사이클 찾는 문제

1. 임의의 학생 한 명을 골라 스택에 넣는다
   특정 학생이 스택 안에 있는지를 판단하는 배열 필요
2. 해당 학생이 가리킨 학생을 찾아 스택에 넣는다.
3. 만약 찾은 학생이 이미 스택에 있으면 사이클,
   찾은 학생이 pop될때까지 꺼내서 걔네는 조를 짠거고
   스택에 남아있는애들이 조가 없는애들

학생이 스택에 들어갔는지 판단하는 visited배열 필요
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');
const T = Number(input[0]);

// process
const sol = [];
let i = 1;
for (let t=0; t<T; t++)
{
    n = Number(input[i++]);
    pick = input[i++].trim().split(' ').map(x => Number(x) - 1);
    sol.push(solve(n, pick));
}

// output
console.log(sol.join('\n'));

// function
function solve(n, pick)
{
    const visited = new Array(n);
    let cnt = 0;

    for (let student=0; student<n; student++)
    {
        if (visited[student]) continue;

        const stack = [student];
        const inside_stack = new Array(n);
        inside_stack[student] = true;
        
        while (true)
        {
            let next = pick[stack[stack.length - 1]];

            // 종료 조건
            if (visited[next]) break;
            else if (inside_stack[next])
            {
                while (stack[stack.length - 1] != next)
                    visited[stack.pop()] = true;
                visited[stack.pop()] = true;
                break;
            }

            // 스택에 넣기
            stack.push(next);
            inside_stack[next] = true;
        }

        cnt += stack.length;
        for (let i of stack)
            visited[i] = true;
    }

    return cnt;
}
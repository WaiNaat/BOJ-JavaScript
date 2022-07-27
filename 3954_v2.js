/*
계산 5천만 번을 무조건 돌아야 하나?
    아마도?

누가 범인인지 어떻게 알지?
    5천만 번 돌고 현재 실행중인 위치가 루프 안이면 해당 루프

중첩 루프의 경우엔 누가 범인인지 어떻게 알지?
    어떤 루프에 대해 그 루프에서 빠져나온 적이 있는지 기억? 어떻게?
        이걸론 안됨: ++[[++]+]
        안쪽 루프를 처음엔 빠져나왔지만 그 다음부터는 절대 못 빠져나옴

    그렇다고 현위치에서 가장 가까운 루프가 범인이 아닐 수도 있음
        무한루프 안에 5회 루프 등이 있는 경우

    5천만 번 돌려서 루프에 빠졌음을 알게 된 후에
    추가로 5천만 번을 더 돌림
    이 때 코드의 어디를 도는지 왼쪽 끝과 오른쪽 끝을 확인함
    이게 곧 해당 루프의 범위
*/

// constant
const LOOP_MAX_LENGTH = 50000000;

// global variables
let sm, sc, si;
let prog_pt, mem_pt, input_pt;

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const T = Number(input[0]);

let sol = [];

for (let t=0; t<T; t++)
{
    [sm, sc, si] = input[t * 3 + 1].trim().split(' ').map(Number);
    const program = input[t * 3 + 2].trim();
    const program_input = input[t * 3 + 3].trim();

    // process
    run_program(program, program_input);
}

// output
console.log(sol.join('\n'));

// functions
function run_program(program, input)
{
    // 초기화
    const mem = new Array(sm).fill(0);
    prog_pt = 0;
    mem_pt = 0;
    input_pt = 0;
    let cnt = 0;

    while (cnt < LOOP_MAX_LENGTH && prog_pt < sc)
    {
        // 명령 실행
        interpret(program, mem, input);
        cnt++;
    }
    
    // 무한 루프일 경우
    if (cnt == LOOP_MAX_LENGTH && prog_pt < sc)
    {
        let start = Infinity;
        let end = -Infinity;

        for (let i=0; i<LOOP_MAX_LENGTH; i++)
        {
            interpret(program, mem, input);
            if (prog_pt < start) 
                start = prog_pt;
            else if (end < prog_pt)
                end = prog_pt;
        }

        sol.push(`Loops ${start - 1} ${end}`);
    }
    else 
        sol.push(`Terminates`);
}

function interpret(program, mem, input)
{
    switch(program[prog_pt])
    {
        case '-':
            mem[mem_pt]--;
            if (mem[mem_pt] < 0)
                mem[mem_pt] = 255;
            break;

        case '+':
            mem[mem_pt]++;
            if (mem[mem_pt] > 255)
                mem[mem_pt] = 0;
            break;

        case '<':
            mem_pt--;
            if (mem_pt < 0)
                mem_pt = sm - 1;
            break;

        case '>':
            mem_pt++;
            if (mem_pt == sm)
                mem_pt = 0;
            break;

        case ',':
            if (input_pt == si)
                mem[mem_pt] = 255;
            else
                mem[mem_pt] = input.charCodeAt(input_pt++);
            break;

        case '[':
            if (mem[mem_pt] === 0)
            {
                let bracket_cnt = 1;
                while (bracket_cnt > 0)
                {
                    prog_pt++;
                    if (program[prog_pt] === '[')
                        bracket_cnt++;
                    else if (program[prog_pt] === ']')
                        bracket_cnt--;
                }
            }
            break;

        case ']':
            if (mem[mem_pt] !== 0)
            {
                let bracket_cnt = 1;
                while (bracket_cnt > 0)
                {
                    prog_pt--;
                    if (program[prog_pt] === '[')
                        bracket_cnt--;
                    else if (program[prog_pt] === ']')
                        bracket_cnt++;
                }
            }
            break;
    }

    prog_pt++;
}
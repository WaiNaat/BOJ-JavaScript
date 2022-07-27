/// 틀렸습니다 ///


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

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const T = Number(input[0]);

const sol = [];

for (let t=0; t<T; t++)
{
    const [sm, sc, si] = input[t * 3 + 1].trim().split(' ').map(Number);
    const program = input[t * 3 + 2].trim();
    const program_input = input[t * 3 + 3].trim();

    // process
    //console.log(sm, sc, si);
    //console.log(program);
    //console.log();
    run_program(sm, sc, si, program, program_input);
    //console.log();
}

// output
console.log(sol.join('\n'));

// functions
function run_program(sm, sc, si, program, input)
{
    // 초기화
    const mem = new Array(sm).fill(0);
    let prog_pt = 0;
    let mem_pt = 0;
    let input_pt = 0;
    let cnt = 1;
    const loop_ended = new Set();

    while (cnt < 50000000 && prog_pt < sc)
    {
        // 명령 실행
        //console.log(program[prog_pt]);

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
                //console.log(mem);
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

                    loop_ended.add(prog_pt);
                    //console.log(prog_pt);
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
                else
                {
                    loop_ended.add(prog_pt);
                    //console.log(prog_pt, prog_pt);
                }
                break;
        }

        

        prog_pt++;
        cnt++;

        
        //console.log(prog_pt, mem_pt);
        //console.log(mem);
        //console.log();
    }
    //console.log(mem);
    if (cnt == 50000000 && prog_pt < sc)
    {
        // 루프 검사: 닫는 대괄호를 찾아서 한번도 닫힌적이 없으면 범인
        let start, end;

        //console.log(prog_pt);
        //console.log(loop_ended);
        //console.log();

        while (prog_pt < sc)
        {
            if (program[prog_pt] === ']' && !loop_ended.has(prog_pt))
            {
                end = prog_pt;
                break;
            }
            prog_pt++;
        }

        // 범인 시작점 찾기
        let bracket_cnt = 1;
        while (bracket_cnt > 0)
        {
            prog_pt--;
            if (program[prog_pt] === '[')
                bracket_cnt--;
            else if (program[prog_pt] === ']')
                bracket_cnt++;
        }

        start = prog_pt;

        sol.push(`Loops ${start} ${end}`);
    }
    else 
        sol.push(`Terminates`);
}
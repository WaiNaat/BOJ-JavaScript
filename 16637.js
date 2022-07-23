/*
백트래킹으로 가능한 괄호의 조합을 만들어서 계산
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const N = Number(input[0]);
const equation = input[1].trim();

// process
// 숫자와 연산자를 분리
const operand = [];
const operator = [];
for (let i=0; i<N; i++)
{
    if (i % 2 == 0)
        operand.push(Number(equation[i]));
    else
        operator.push(equation[i]);
}

// 백트래킹
let sol = N > 1? -Infinity : operand[0];
let parenthesis = new Array(Math.ceil(N / 2));

if (N > 1)
    make_parenthesis(1);

// output
console.log(sol);

// functions
function make_parenthesis(idx)
{
    // 계산
    sol = Math.max(calc_equation(), sol);

    // base case
    if (idx >= operand.length - 1)
        return;

    // recursive step
    for (let i=idx; i<operand.length-1; i++)
    {
        parenthesis[i] = true;
        parenthesis[i + 1] = true;

        make_parenthesis(i + 2);

        parenthesis[i] = false;
        parenthesis[i + 1] = false;
    }
}

function calc_equation()
{
    // 괄호들 먼저 계산
    let new_operand = [];
    let new_operator = [];
    let operator_idx = 0;
    let operand_idx = 0;

    while (operand_idx < operand.length)
    {
        if (!parenthesis[operand_idx])
        {
            new_operand.push(operand[operand_idx++]);
            
            if (operator_idx < operator.length)
                new_operator.push(operator[operator_idx++]);
        }
        else
        {
            new_operand.push(
                calc(operand[operand_idx++], operand[operand_idx++], operator[operator_idx++])
            );

            if (operator_idx < operator.length)
                new_operator.push(operator[operator_idx++]);
        }
    }
    
    // 계산
    let result = new_operand[0];
    for (let i=0; i<new_operator.length; i++)
        result = calc(result, new_operand[i + 1], new_operator[i]);

    return result;
}

function calc(a, b, operator)
{
    if (operator === '+')
        return a + b;
    else if (operator === '-')
        return a - b;
    else
        return a * b;
}
/*
백트래킹으로 연산자 조합 찾기
base case: 남은 연산자 개수 0개일 때 최종 계산
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const N = Number(input[0]);
const A = input[1].trim().split(' ').map(Number);
const [add, sub, mult, div] = input[2].trim().split(' ').map(Number);

// process
let max = -Infinity;
let min = Infinity;
let operators = [];

make_operator_list(add, sub, mult, div);

// output
console.log(`${max}\n${min}`);

// functions
function make_operator_list(add, sub, mult, div)
{
    // base case
    if (operators.length === N - 1)
    {
        let result = calculate();
        max = Math.max(result, max);
        min = Math.min(result, min);
        return;
    }

    // recursive step
    if (add > 0)
    {
        operators.push('+');
        make_operator_list(add - 1, sub, mult, div);
        operators.pop();
    }
    if (sub > 0)
    {
        operators.push('-');
        make_operator_list(add, sub - 1, mult, div);
        operators.pop();
    }
    if (mult > 0)
    {
        operators.push('*');
        make_operator_list(add, sub, mult - 1, div);
        operators.pop();
    }
    if (div > 0)
    {
        operators.push('/');
        make_operator_list(add, sub, mult, div - 1);
        operators.pop();
    }
}

function calculate()
{
    let result = A[0];

    for (let i=1; i<N; i++)
    {
        switch(operators[i - 1])
        {
            case '+':
                result += A[i];
                break;
            case '-':
                result -= A[i];
                break;
            case '*':
                result *= A[i];
                break;
            default:
                if (result >= 0)
                    result = Math.floor(result / A[i]);
                else
                    result = -Math.floor((-result) / A[i]);
        }
    }

    return result;
}
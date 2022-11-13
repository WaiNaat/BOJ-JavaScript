/*
F(x) := sum(f(k)), 1<=k<=x

예) 이진수 x=101010(2)
F(x) = sum(
  1부터 2^5-1 까지 1의 개수,
  맨 앞자리 1: 1010(2)+1개,
  1부터 1010(2)까지 1의 개수=F(1010(2)),
)

1부터 2^5-1=11111(2) 까지 1의 개수??
1부터 2^4-1=1111(2)까지 1의 개수 + 이진수 5자리 숫자의 1의 개수
>> 밑에서 구한거 한번더 누적합 - numberOf1From1ToDigit

이진수 5자리 숫자의 1의 개수??
이진수 1~4자리 숫자의 1의 개수 + 2^4
>> 누적합 - numberOf1InDigit
  1
1
  1+2=3
10
11
  1+3+4=8
100
101
110
111
  1+3+8+8=20
1000
1001
1010
1011
1100
1101
1110
1111
  1+3+8+20+16=48

1부터 1010(2)까지 1의 개수?
F(1010(2)) = sum(
  맨 앞자리 1: 10(2)+1개
  1부터 2^3-1=111(2)까지 1의 개수,
  1부터 10(2)까지 1의 개수=F(10(2)),
)
>> 위에서 구한거 쓰면됨
*/
// function
const F = function numberOf1From1to(value, numberOf1From1ToDigit) {
  if (value === '1') return 1n;
  if (value === '0') return 0n;

  let result = 0n;
  if (value[0] === '1') {
    result += (BigInt(`0b${value}`) - 2n ** BigInt(value.length - 1)) + 1n;
    result += numberOf1From1ToDigit[value.length - 2];
  }
  result += F(value.slice(1), numberOf1From1ToDigit);

  return result;
};

// input
const inputFile = process.platform === 'linux' ? '/dev/stdin' : './input';
let [A, B] = require('fs').readFileSync(inputFile).toString().trim()
  .split(' ');

// process
A = (BigInt(A) - 1n).toString(2);
B = BigInt(B).toString(2);

const numberOf1InDigit = [1n];
let sum = 1n;
for (let digit = 1n; digit < B.length; digit += 1n) {
  numberOf1InDigit.push(sum + 2n ** digit);
  sum += numberOf1InDigit[digit];
}

const numberOf1From1ToDigit = [];
numberOf1InDigit.reduce(
  (prev, cur) => {
    numberOf1From1ToDigit.push(prev + cur);
    return prev + cur;
  },
  0n,
);

const sol = F(B, numberOf1From1ToDigit) - F(A, numberOf1From1ToDigit);

// output
console.log(sol.toString());

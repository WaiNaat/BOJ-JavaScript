/*
자스 숫자는 15자리부터 위험
입력이 18자리까지 오는데 -> 10000으로 나눠서 소수점 추가해버리고
스퀘어루트 먹인다음에 100 곱하면될듯?

답 자체는 루트하고 4곱하면됨
*/
const INPUIT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const input = require('fs').readFileSync(INPUIT_FILE).toString().trim();

const isNotSafeNumber = input.length >= 15;
const value = isNotSafeNumber
  ? Number(`${input.slice(0, input.length - 4)}.${input.slice(input.length - 4)}`)
  : Number(input);

console.log(Math.sqrt(value) * 4 * (isNotSafeNumber ? 100 : 1));

/*
최대 50개의 글자 중 쪼개는 기준점이 될 두 곳을 고르는 경우의 수
>> 2500보다 적음
>> 완전탐색 가능
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const word = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('');

let sol = 'z'.repeat(50);

for (let divPoint1 = 1; divPoint1 < word.length - 1; divPoint1 += 1) {
  for (let divPoint2 = divPoint1 + 1; divPoint2 < word.length; divPoint2 += 1) {
    const newWord = [
      word.slice(0, divPoint1).reverse().join(''),
      word.slice(divPoint1, divPoint2).reverse().join(''),
      word.slice(divPoint2).reverse().join(''),
    ].join('');

    if (newWord < sol) sol = newWord;
  }
}

console.log(sol);

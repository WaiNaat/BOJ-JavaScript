/*
아라비아 -> 로마
  큰 숫자부터 나눠봄
로마 -> 아라비아
  앞에서부터 읽되 '본인+다음거'를 먼저 봐서
  그게 테이블에 있는지부터 확인
*/
const romanArabicTable = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
];

const longRoman = {
  CM: 900,
  CD: 400,
  XC: 90,
  XL: 40,
  IX: 9,
  IV: 4,
};

const shortRoman = {
  M: 1000,
  D: 500,
  C: 100,
  L: 50,
  X: 10,
  V: 5,
  I: 1,
};

const arabicToRoman = (arabicNumber) => {
  let number = Number(arabicNumber);
  const answer = [];

  romanArabicTable.forEach(([arabic, roman]) => {
    const quotient = Math.floor(number / arabic);
    for (let i = 0; i < quotient; i += 1) answer.push(roman);
    number -= arabic * quotient;
  });

  return answer.join('');
};

const romanToArabic = (roman) => {
  let index = 0;
  let answer = 0;

  while (index < roman.length) {
    const longRomanValue = longRoman[roman.slice(index, index + 2)];
    if (longRomanValue !== undefined) {
      answer += longRomanValue;
      index += 2;
    } else {
      answer += shortRoman[roman[index]];
      index += 1;
    }
  }
  return answer;
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [N, ...numbers] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

// process
const sol = [];
numbers.forEach((number) => {
  if (Number.isNaN(Number(number))) sol.push(romanToArabic(number));
  else sol.push(arabicToRoman(number));
});

// output
console.log(sol.join('\n'));

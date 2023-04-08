/*
팰린드롬을 만들 수 있으려면
알파벳마다 등장 횟수가 전부 짝수거나 하나만 홀수여야 함

홀수 번 등장한 알파벳이 있다면
걔는 무조건 가운데에 한번 나와야 함

팰린드롬의 앞쪽 절반만 만든다고 치고
알파벳 순서대로 배치하면 됨
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const englishName = require('fs').readFileSync(INPUT_FILE).toString().trim();

const countAlphabets = (string) => {
  const alphabetCount = new Array(26).fill(0);
  englishName.split('').forEach((char) => {
    alphabetCount[char.charCodeAt(0) - 'A'.charCodeAt(0)] += 1;
  });
  return alphabetCount;
};

const makePalindrome = (string) => {
  const alphabetCount = countAlphabets(string);

  if (alphabetCount.filter((count) => count % 2 === 1).length > 1) return "I'm Sorry Hansoo";

  const palindromeHalfCode = [];

  alphabetCount.forEach((count, index) => {
    if (count > 0) {
      palindromeHalfCode.push(...new Array(Math.floor(count / 2)).fill(index + 'A'.charCodeAt(0)));
    }
  });

  const palindromeHalf = palindromeHalfCode.map((code) => String.fromCharCode(code));

  const oddAlphabetOIndex = alphabetCount.findIndex((count) => count % 2 === 1);
  const center = oddAlphabetOIndex >= 0 ? String.fromCharCode(oddAlphabetOIndex + 'A'.charCodeAt(0)) : '';

  return palindromeHalf.join('') + center + palindromeHalf.reverse().join('');
};

console.log(makePalindrome(englishName));

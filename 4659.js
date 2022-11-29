/*
구현
*/
const VOWELS = /[aeiou]/;
// const CONSONANTS = /[qwrtypsdfghjklzxcvbnm]/;

const validate = (password) => {
  let hasVowel = false;
  let vowelCount = 0;
  let consonantCount = 0;
  let prevChar = '';

  try {
    password.forEach((char) => {
      if (VOWELS.test(char)) {
        hasVowel = true;
        vowelCount += 1;
        consonantCount = 0;
      } else {
        vowelCount = 0;
        consonantCount += 1;
      }
      if (vowelCount === 3 || consonantCount === 3) throw new Error();
      if (char === prevChar && char !== 'e' && char !== 'o') throw new Error();
      prevChar = char;
    });
  } catch {
    return false;
  }

  if (!hasVowel) return false;
  return true;
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const passwords = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((password) => password.split(''));

passwords.pop();

// process
const sol = [];
passwords.forEach((password) => {
  if (validate(password)) sol.push(`<${password.join('')}> is acceptable.`);
  else sol.push(`<${password.join('')}> is not acceptable.`);
});

// output
console.log(sol.join('\n'));

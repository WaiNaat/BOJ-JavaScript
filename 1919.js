const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [A, B] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

const countAlphabets = (string) => {
  const counts = new Array(26).fill(0);

  string.split('').forEach((char) => {
    counts[char.charCodeAt(0) - 'a'.charCodeAt(0)] += 1;
  });

  return counts;
};

const arrayDifferenceCount = (arr1, arr2) => {
  let count = 0;

  arr1.forEach((value, index) => {
    count += Math.abs(value - arr2[index]);
  });

  return count;
};

const counts1 = countAlphabets(A);
const counts2 = countAlphabets(B);

console.log(arrayDifferenceCount(counts1, counts2));

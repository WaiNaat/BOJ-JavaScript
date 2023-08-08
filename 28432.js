const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const input = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const recordLength = Number(input[0]);
const record = input.slice(1, 1 + recordLength);
const candidates = input.slice(2 + recordLength);

const questionIndex = record.findIndex((word) => word === '?');
const prevWord = record[questionIndex - 1];
const nextWord = record[questionIndex + 1];

const start = prevWord ? prevWord[prevWord.length - 1] : null;
const end = nextWord ? nextWord[0] : null;

const usedWords = new Set(record);

const sol = candidates.find((word) => {
  if (usedWords.has(word)) return false;
  if (start && word[0] !== start) return false;
  if (end && word[word.length - 1] !== end) return false;
  return true;
});

console.log(sol);

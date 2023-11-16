/*
정렬 잘하는 문제
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...records] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const isBoj = (target) => {
  const match = target.match(/^boj.kr\/([1-9][0-9]*)$/);
  if (!match) return 0;
  return Number(match[1]);
};

records.sort((one, another) => {
  const boj1 = isBoj(one);
  const boj2 = isBoj(another);

  if (boj1 && boj2) return boj1 - boj2;
  if (boj1) return 1;
  if (boj2) return -1;
  if (one.length !== another.length) return one.length - another.length;
  return one < another ? -1 : 1;
});

console.log(records.join('\n'));

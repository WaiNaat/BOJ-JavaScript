/*
순수 구현
무지개댄스 추는사람들의 집합 사용
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...meetings] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' '));

const dancingPeople = new Set(['ChongChong']);

meetings.forEach(([one, another]) => {
  if (dancingPeople.has(one)) dancingPeople.add(another);
  else if (dancingPeople.has(another)) dancingPeople.add(one);
});

console.log(dancingPeople.size);

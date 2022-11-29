/*
구현
set으로 중복인원 제거
플레이 인원수에는 항상 임스를 포함시켜야 함
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
let [players, game, ...names] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(/\s/);

names = new Set(names);
if (game === 'Y') game = 1;
else if (game === 'F') game = 2;
else if (game === 'O') game = 3;

console.log(Math.floor(names.size / game));

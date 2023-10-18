const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
let [yt, yj] = require('fs').readFileSync(INPUT_FILE).toString().trim().split(' ').map(Number);

let isYtTurn = true;

while (yt < 5 && yj < 5) {
  if (isYtTurn) yj += yt;
  else yt += yj;

  isYtTurn = !isYtTurn;
}

console.log(isYtTurn ? 'yj' : 'yt');

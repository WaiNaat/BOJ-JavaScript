/*
글자제한 2000자밖에 안되니까 그냥 k=1부터 해보면될듯?
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const games = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('');

const aliceWins = (k) => {
  let aliceWins = 0;
  let bobWins = 0;

  let aliceCount = 0;
  let bobCount = 0;

  games.forEach((pointWinner) => {
    if (pointWinner === 'A') aliceCount += 1;
    else bobCount += 1;

    if (aliceCount === k) {
      aliceCount = 0;
      bobCount = 0;
      aliceWins += 1;
    } else if (bobCount === k) {
      aliceCount = 0;
      bobCount = 0;
      bobWins += 1;
    }
  });

  return aliceWins > bobWins;
};

const aliceWinningCases = [];

for (let k = 1; k <= games.length; k += 1) {
  if (aliceWins(k)) aliceWinningCases.push(k);
}

console.log(aliceWinningCases.length);
if (aliceWinningCases.length) console.log(aliceWinningCases.join(' '));

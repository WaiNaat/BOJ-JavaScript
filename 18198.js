const INPUIT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const input = require('fs').readFileSync(INPUIT_FILE).toString().trim();

const makeParser = () => {
  let i = 0;
  return () => {
    if (i >= input.length) return undefined;
    const next = {
      team: input[i],
      score: Number(input[i + 1]),
    };
    i += 2;
    return next;
  };
};

const getNext = makeParser();
let aScore = 0;
let bScore = 0;
let winner;

for (let result = getNext(); result !== undefined; result = getNext()) {
  if (result.team === 'A') {
    aScore += result.score;
  } else {
    bScore += result.score;
  }

  if (aScore >= 10 && bScore >= 10) {
    if (aScore - bScore >= 2) {
      winner = 'A';
      break;
    } else if (bScore - aScore >= 2) {
      winner = 'B';
      break;
    }
  } else if (aScore >= 11) {
    winner = 'A';
    break;
  } else if (bScore >= 11) {
    winner = 'B';
    break;
  }
}

console.log(winner);

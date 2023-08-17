/*
숫자가 작으니 완전탐색
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, dasom, ...votes] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map(Number);

const findThreateningCandidate = () => {
  let candidate = -1;
  let maxVote = 0;

  votes.forEach((vote, index) => {
    if (vote > maxVote) {
      maxVote = vote;
      candidate = index;
    }
  });

  return candidate;
};

let dasomVote = dasom;

for (
  let candidate = findThreateningCandidate();
  dasomVote <= votes[candidate];
  candidate = findThreateningCandidate()
) {
  dasomVote += 1;
  votes[candidate] -= 1;
}

console.log(dasomVote - dasom);

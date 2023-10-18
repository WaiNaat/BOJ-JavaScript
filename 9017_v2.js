const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, , ...inputs] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const filterInvalidTeams = (result) => {
  const count = {};

  result.forEach((team) => {
    if (!count[team]) count[team] = 0;
    count[team] += 1;
  });

  const validTeams = new Set(
    Object.entries(count)
      .filter(([, count]) => count === 6)
      .map(([team]) => Number(team)),
  );

  return result.filter((team) => validTeams.has(team));
};

const getWinner = (result) => {
  const teamResult = {};

  result.forEach((team, index) => {
    if (!teamResult[team]) {
      teamResult[team] = {
        count: 0,
        fifthScore: Infinity,
        score: 0,
      };
    }

    teamResult[team].count += 1;
    if (teamResult[team].count <= 4) teamResult[team].score += index;
    if (teamResult[team].count === 5) teamResult[team].fifthScore = index;
  });

  const [winner] = Object.entries(teamResult)
    .sort((one, another) => {
      if (one[1].score !== another[1].score) return another[1].score - one[1].score;
      return another[1].fifthScore - one[1].fifthScore;
    })
    .pop();

  return winner;
};

const sol = [];

for (let i = 0; i < inputs.length; i += 2) {
  const filtered = filterInvalidTeams(inputs[i]);
  const winner = getWinner(filtered);
  sol.push(winner);
}

console.log(sol.join('\n'));

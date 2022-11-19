/*
구현
*/
class Team {
  constructor(numberOfProblems) {
    this.scoreboard = new Array(numberOfProblems + 1).fill(0);
    this.trials = 0;
    this.lastSubmitTime = -1;
    this.score = 0;
  }

  update(problemId, score, time) {
    this.scoreboard[problemId] = Math.max(score, this.scoreboard[problemId]);
    this.trials += 1;
    this.lastSubmitTime = time;
  }

  calcFinalScore() {
    this.score = this.scoreboard.reduce(
      (prev, cur) => prev + cur,
      0,
    );
  }

  higherRankThan(other) {
    if (this.score > other.score) return true;
    if (this.score < other.score) return false;
    if (this.trials < other.trials) return true;
    if (this.trials > other.trials) return false;
    if (this.lastSubmitTime < other.lastSubmitTime) return true;
    return false;
  }
}

// input
const inputFile = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[T], ...input] = require('fs').readFileSync(inputFile).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

// process
const sol = [];
let i = 0;
for (let t = 0; t < T; t += 1) {
  const [numOfTeams, numOfProblems, myTeam, numOfLogs] = input[i];
  i += 1;
  const teams = Array.from(new Array(numOfTeams + 1), () => new Team(numOfProblems));

  for (let time = 0; time < numOfLogs; time += 1) {
    const [teamId, problemId, score] = input[i];
    i += 1;
    teams[teamId].update(problemId, score, time);
  }

  teams.forEach((team) => { team.calcFinalScore(); });
  const result = teams.reduce(
    (prevCnt, team) => {
      if (team.higherRankThan(teams[myTeam])) return prevCnt + 1;
      return prevCnt;
    },
    1,
  );
  sol.push(result);
}

// output
console.log(sol.join('\n'));

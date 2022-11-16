/*
구현

- 팀 점수는 "상위 4명"의 합
- 낮은 점수가 우승, 동점이면 "5번 주자"의 순위가 빠른순대로
- 팀 인원이 6명 미만이면 점수계산 제외

첫 번째 순회에 인원미달 거르고
두 번째 순회에 점수계산 및 5번주자 순위계산
*/
// class
class Team {
  constructor() {
    this.id = 0;
    this.goalInNumber = 0;
    this.score = 0;
    this.fifthScore = 0;
  }
}

// function
const countPeople = (rank, resultArray) => {
  const numberOfPeople = resultArray;
  let totalTeams = 0;
  rank.forEach((team) => {
    numberOfPeople[team] += 1;
    totalTeams = Math.max(team, totalTeams);
  });
  return totalTeams;
};

const computeTeamScore = (rank, numberOfPeople, totalTeams) => {
  const scoreInfo = Array.from(new Array(totalTeams + 1), () => new Team());
  let currentScore = 1;

  rank.forEach((team) => {
    if (numberOfPeople[team] === 6) {
      const thisTeam = scoreInfo[team];
      thisTeam.id = team;
      thisTeam.goalInNumber += 1;

      if (thisTeam.goalInNumber <= 4) {
        thisTeam.score += currentScore;
      }
      if (thisTeam.goalInNumber === 5) {
        thisTeam.fifthScore = currentScore;
      }
      currentScore += 1;
    }
  });

  return scoreInfo;
};

const winningTeam = (rank) => {
  const numberOfPeople = new Array(201).fill(0);
  const totalTeams = countPeople(rank, numberOfPeople);
  const scoreInfo = computeTeamScore(rank, numberOfPeople, totalTeams);
  scoreInfo.sort((a, b) => {
    if (a.goalInNumber !== b.goalInNumber) return b.goalInNumber - a.goalInNumber;
    if (a.score !== b.score) return a.score - b.score;
    return a.fifthScore - b.fifthScore;
  });
  return scoreInfo[0].id;
};

// input
const inputFile = process.platform === 'linux' ? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim()
  .split('\n');

// process
const T = Number(input[0]);
const sol = [];
let i = 0;
for (let testNo = 1; testNo <= T; testNo += 1) {
  i += 2;
  const rank = input[i].split(' ').map(Number);
  sol.push(winningTeam(rank));
}

// output
console.log(sol.join('\n'));

/*
회원 8명 -> 완탐가능
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const skills = require('fs').readFileSync(INPUT_FILE).toString().trim().split(' ').map(Number);

const getMinSatisfaction = (list) => {
  const teamSkills = [
    list[0] + list[1],
    list[2] + list[3],
    list[4] + list[5],
    list[6] + list[7],
  ].map((val) => val / 2);

  const score1 = 1 - Math.abs(teamSkills[0] - teamSkills[1]) / 10;
  const score2 = 1 - Math.abs(teamSkills[2] - teamSkills[3]) / 10;

  return Math.max(0, Math.min(score1, score2, 1));
};

const teams = [];
const visited = new Set();
const divideTeamsAndGetMinSatisfactionAtBestScenario = () => {
  if (teams.length === 8) {
    return getMinSatisfaction(teams);
  }

  let max = 0;
  for (let i = 0; i < skills.length; i += 1) {
    if (visited.has(i)) {
      continue;
    }

    visited.add(i);
    teams.push(skills[i]);
    max = Math.max(divideTeamsAndGetMinSatisfactionAtBestScenario(), max);
    teams.pop();
    visited.delete(i);
  }

  return max;
};

const sol = divideTeamsAndGetMinSatisfactionAtBestScenario().toFixed(2);

console.log(sol.at(-1) === '0' ? sol.slice(0, -1) : sol);

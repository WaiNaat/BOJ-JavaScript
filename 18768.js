/*
그리디
일단 각자 자기가 잘하는거 시킨다
인원수가 안 맞으면 인원 더 많은 쪽에서 반대쪽으로 실력차가 그나마 적게 나는 쪽을 옮긴다
(총합 감소량 최소화)
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...inputs] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

function* getTestCaseIterator() {
  for (let i = 0; i < inputs.length; i += 3) {
    yield [inputs[i], inputs[i + 1], inputs[i + 2]];
  }
}

const getMaxStatusSum = (testCase) => {
  const [[peopleCount, maxDiff], atks, defs] = testCase;
  const attackTeam = [];
  const defenceTeam = [];

  for (let i = 0; i < peopleCount; i += 1) {
    const targetTeam = atks[i] < defs[i] ? defenceTeam : attackTeam;
    targetTeam.push({ atk: atks[i], def: defs[i] });
  }

  // 실력차가 적게 나는 쪽을 배열 뒤쪽에 배치해서 쉽게 빠지도록 구성
  [attackTeam, defenceTeam].forEach((team) => {
    team.sort((a, b) => Math.abs(b.atk - b.def) - Math.abs(a.atk - a.def));
  });

  const tempTeam = [];
  const bigger = attackTeam.length > defenceTeam.length ? attackTeam : defenceTeam;
  const smaller = attackTeam.length <= defenceTeam.length ? attackTeam : defenceTeam;

  while (bigger.length - smaller.length > maxDiff + tempTeam.length) {
    tempTeam.push(bigger.pop());
  }

  const attackTeamSum = attackTeam.reduce((sum, cur) => sum + cur.atk, 0);
  const defenceTeamSum = defenceTeam.reduce((sum, cur) => sum + cur.def, 0);
  // 팀을 옮기는 사람들은 본인의 주종목이 아닌 쪽 일을 맡게 되는거임
  const tempTeamSum = tempTeam.reduce((sum, cur) => sum + Math.min(cur.atk, cur.def), 0);

  return attackTeamSum + defenceTeamSum + tempTeamSum;
};

const sol = Array.from(getTestCaseIterator()).map(getMaxStatusSum).join('\n');

console.log(sol);

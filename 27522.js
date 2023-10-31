/*
각 팀원의 순위 점수의 합계가 높은 팀이 승리
합계가 같다면 최고 순위가 가장 높은 팀이 승리
8명의 레이서가 모두 서로 다른 시각에 완주한 경우 순위 점수의 합계가 반드시 다르다.
모든 레이서가 반드시 서로 다른 시각에 완주한다.
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const results = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' '));

const scores = [10, 8, 6, 5, 4, 3, 2, 1, 0];
let redScore = 0;
let blueScore = 0;

results
  .sort((one, another) => (one[0] < another[0] ? -1 : 1))
  .forEach(([, team], index) => {
    if (team === 'R') redScore += scores[index];
    else blueScore += scores[index];
  });

console.log(redScore > blueScore ? 'Red' : 'Blue');

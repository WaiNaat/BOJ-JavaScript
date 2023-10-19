/*
- 1등은 1점, 2등은 2점, 3등은 3점
- 문제를 해결하는 데 걸린 시간은 문제를 처음 틀렸을 때의 시간과 문제를 해결했을 때의 시간의 차
- 걸린 시간이 짧은 사람부터 순위
- 걸린 시간이 같다면 이름이 사전 순으로 빠른 사람이 더 높은 순위
- 한 번도 틀린 기록이 없이 바로 문제를 해결했다면 해당 정답이 무효 처리되고,
  이후 문제를 시도한 기록이 있더라도 (전체 인원수 + 1)만큼의 점수
- 첫 번째로 해결한 이후의 기록은 전부 무효 처리
- 여러번 틀리고 해결하지 못한 경우에는 전체 인원수만큼의 점수
- 제출 기록이 없는 사람들은 모두 (전체 인원수 + 1)만큼의 점수
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [info, names, ...records] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' '));

class Problem {
  record = Object.fromEntries(names.map((name) => [name, { start: null, end: null }]));

  solve(name, isCorrect, time) {
    if (isCorrect && !this.record[name].end) {
      this.record[name].end = time;
    }

    if (!isCorrect && !this.record[name].start && !this.record[name].end) {
      this.record[name].start = time;
    }
  }

  getScoreList() {
    const timeScores = Object.entries(this.record).map(([name, { start, end }]) => {
      if (!start && end) return [name, 8_888_888];
      if (!start && !end) return [name, 8_888_888];
      if (start && !end) return [name, 777_777];
      return [name, end - start];
    });

    timeScores.sort((one, another) => {
      if (one[1] !== another[1]) return one[1] - another[1];
      return one[0] <= another[0] ? -1 : 1;
    });

    const result = timeScores.map(([name, score], index) => {
      if (score === 777_777) return [name, names.length];
      if (score === 8_888_888) return [name, names.length + 1];
      return [name, index + 1];
    });

    return result;
  }
}

const [problemCount] = info.map(Number);
const problems = Array.from({ length: problemCount }).map(() => new Problem());
const toMinutes = (time) => {
  const [hour, minute] = time.split(':').map(Number);
  return hour * 60 + minute;
};

const scores = Object.fromEntries(names.map((name) => [name, 0]));

records.forEach(([p, time, name, status]) => {
  const problem = Number(p) - 1;
  problems[problem].solve(name, status === 'solve', toMinutes(time));
});

problems.forEach((problem) => {
  const result = problem.getScoreList();
  result.forEach(([name, score]) => {
    scores[name] += score;
  });
});

const ranks = Object.entries(scores)
  .sort((one, another) => {
    if (one[1] !== another[1]) return one[1] - another[1];
    return one[0] <= another[0] ? -1 : 1;
  })
  .map(([name]) => name);

console.log(ranks.join('\n'));

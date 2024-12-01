/*
위상정렬

높은 순위 -> 낮은 순위로 위상 부여
N개의 팀이 있으면 N*(N-1)/2 개의 화살표가 만들어짐

순위 뒤바뀜 표가 오면 만든 화살표중에 해당하는 걸 뒤집기
들어오는 화살표의 수가 같은 팀이 여러개
  -> 결정 불가능한 경우
들어오는 화살표가 0개인 팀(1등)부터 출발하는 위상정렬 시작
  도중에 어느때든 0개인 팀이 여러개가 되면 명확한 순위 정할 수 없음
  무조건 1개만 있는게 정상이므로 큐를 만들 필요 없이 스택 사용
일관성이 없다면?
  순환이 발생하면 일관성이 없는거임 (visited 를 이용한 중복방문 검증)

위상 정렬을 할 필요가 있나?
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...inputs] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

function* testCaseGenerator() {
  let i = 0;
  while (i < inputs.length) {
    const [rankChangeCount] = inputs[i + 2];
    const testCase = inputs.slice(i, i + 2 + rankChangeCount + 1);

    yield testCase;

    i += 2 + rankChangeCount + 1;
  }
}

const solve = (testCase) => {
  const [[teamCount], prevRanks, , ...rankChanges] = testCase;
  const originalRanks = Array.from({ length: teamCount + 1 }, () => Infinity);

  prevRanks.forEach((team, rank) => {
    originalRanks[team] = rank;
  });

  const ranks = Array.from(originalRanks);
  rankChanges.forEach(([a, b]) => {
    const higherRank = originalRanks[a] > originalRanks[b] ? a : b;
    const lowerRank = a + b - higherRank;

    ranks[higherRank] -= 1;
    ranks[lowerRank] += 1;
  });

  const isInvalid = ranks.length !== new Set(ranks).size;
  if (isInvalid) {
    return 'IMPOSSIBLE';
  }

  return ranks
    .map((rank, index) => ({ rank, team: index }))
    .sort((a, b) => a.rank - b.rank)
    .slice(0, -1)
    .map(({ team }) => team)
    .join(' ');
};

console.log(Array.from(testCaseGenerator()).map(solve).join('\n'));

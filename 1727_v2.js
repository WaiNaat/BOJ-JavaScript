/*
남녀 중 더 수가 많은 쪽은 커플을 못 만들어줄 수 있음
  = 더 수가 많은 쪽은 솔로가 된다는 선택지 존재

opt(man, woman) := man번 남자와 woman번 여자까지의 커플들 성격차이의 합 최솟값
diff(man, woman) :=  man번 남자와 woman번 여자의 성격차이

opt(man, woman) =
  기본적으로
    opt(man-1, woman-1) + diff(man, woman)  (최대한 많은 커플을 만들어야 함)
  man > woman 일 때
    opt(man-1, woman) 이 더 작으면 이 값 사용 (남자가 더 많아서 man번 남자는 솔로행)
  man < woman 일 때
    opt(man, woman-1) 이 더 작으면 이 값 사용 (여자가 더 많아서 woman번 여자는 솔로행)

opt(man, ?) 계산에 opt(man-1, ?)만 필요하므로 cur, prev 두 배열로 처리가능
*/
// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[menCount, womenCount], men, women] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

// process
men.push(-Infinity);
women.push(-Infinity);
men.sort((a, b) => a - b);
women.sort((a, b) => a - b);
const difference = (x, y) => Math.abs(men[x] - women[y]);

let prev = new Array(womenCount + 1).fill(0);
for (let man = 1; man <= menCount; man += 1) {
  const cur = new Array(womenCount + 1).fill(Infinity);
  for (let woman = 1; woman <= womenCount; woman += 1) {
    cur[woman] = prev[woman - 1] + difference(man, woman);
    if (man > woman) cur[woman] = Math.min(cur[woman], prev[woman]);
    if (man < woman) cur[woman] = Math.min(cur[woman], cur[woman - 1]);
  }
  prev = cur;
}

// output
console.log(prev[womenCount]);

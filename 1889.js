/*
위상정렬

들어오는거 2개 미만을 큐에 넣고 제거
들어오는거 3개 넘는 애들은
  사실 본인한테 들어오는 것 중 하나가 원래 2개 미만인 애들한테 갔어야 하는거임
  그러면 2개 미만인 애들이 사라지면서 해당 선 역시 연쇄효과로 사라짐

위상 '정렬'이 필요한가? 사실 필요없음
  -> 큐는 만들기 귀찮으니까 스택으로 ㄱ
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[peopleCount], ...gifts] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const next = Array.from({ length: peopleCount + 1 }, () => []);
const enterCounts = Array.from({ length: peopleCount + 1 }, () => 0);

gifts.forEach(([a, b], idx) => {
  const me = idx + 1;
  next[me].push(a);
  next[me].push(b);
  enterCounts[a] += 1;
  enterCounts[b] += 1;
});

const safe = new Set(Array.from({ length: peopleCount }, (_, idx) => idx + 1));
const stack = Array.from(safe).filter((student) => enterCounts[student] < 2);

while (stack.length > 0) {
  const out = stack.pop();

  if (!safe.has(out)) {
    continue;
  }
  safe.delete(out);

  next[out].forEach((student) => {
    enterCounts[student] -= 1;
    if (enterCounts[student] < 2 && safe.has(student)) {
      stack.push(student);
    }
  });
}

console.log(safe.size);
if (safe.size > 0) console.log(...safe.values());

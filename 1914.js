/*
hanoi(i) := i개의 원판을 가진 하노이의 탑을 옮기는 최소 횟수

hanoi(i) = hanoi(i-1) + 1 + hanoi(i-1)
  i-1개를 1번에서 2번으로 옮긴다
  마지막 가장 큰 원판을 1번에서 3번으로 옮긴다
  2번의 i-1개의 원판을 3번으로 옮긴다

옮긴 횟수 -> 너무쉬움
옮기는 방법 -> ?

move(i, from, to) := from에 있는 i개의 원판을 to로 옮긴다

move(i, from, to) =
  move(i-1, from, remainder) <-- remainder는 from도 to도 아닌 기둥
  move(1, from, to)
  move(i-1, remainder, to)
  이거를 순차적으로 하면 됨

  base case: i=1이면 move(i, from, to) = "{from} {to}"
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const discCount = Number(require('fs').readFileSync(INPUT_FILE).toString());

const move = (discCount, from, to) => {
  if (discCount === 1) return `${from} ${to}`;

  const remainder = 6 - from - to;

  return [
    move(discCount - 1, from, remainder),
    move(1, from, to),
    move(discCount - 1, remainder, to),
  ].join('\n');
};

let hanoi = 0n;
for (let i = 1; i <= discCount; i += 1) {
  hanoi = 2n * hanoi + 1n;
}

console.log(hanoi.toString());

if (discCount <= 20) {
  console.log(move(discCount, 1, 3));
}

/*
결국 양으로 밀어야 함
  -> 양수는 무조건 한개당 구간 하나씩 먹는게 유리
  -> 음수는 연속되어 있으면 합치는게 유리
  -> 음수구간에 양수 하나를 더해서 양수가 되면 합치는게 유리 (음양 -> 양)
  -> 음수구간에 양수 두개를 더해서 양수가 되면 안 합치는게 유리 (양음양 -> 양 / 음 / 양)

음수구간은 무조건 합친다
양수는 본인 직전 또는 직후의 음수구간을 흡수해도 양수라면 흡수한다
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...tests] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const canPositiveWin = (sequence) => {
  const groups = [0];
  let count = -1;

  for (let i = 0; i < sequence.length; i += 1) {
    // 양수가 직전 음수구간 흡수 가능
    if (
      sequence[i] > 0 &&
      groups[groups.length - 1] <= 0 &&
      groups[groups.length - 1] + sequence[i] > 0
    ) {
      groups.push(groups.pop() + sequence[i]);
      count += 2;
      // 양수가 직전 음수구간 흡수 불가
    } else if (sequence[i] > 0) {
      groups.push(sequence[i]);
      count += 1;
      // 음수가 직전 양수에 흡수 가능
    } else if (groups[groups.length - 1] > 0 && groups[groups.length - 1] + sequence[i] > 0) {
      groups.push(groups.pop() + sequence[i]);
      // 음수가 직전 양수에 흡수 불가
    } else if (groups[groups.length - 1] > 0) {
      groups.push(sequence[i]);
      count -= 1;
      // 음수가 직전 음수와 합쳐짐
    } else {
      groups.push(groups.pop() + sequence[i]);
    }
  }

  return count > 0;
};

const sol = [];

for (let i = 1; i < tests.length; i += 2) {
  sol.push(canPositiveWin(tests[i]) ? 'YES' : 'NO');
}

console.log(sol.join('\n'));

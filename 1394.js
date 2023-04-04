/*
0 1 2 3 4 5 6 7 8 9
123

2 * 100
3 * 10
4

10 (0-9)
100 (00-99)
100 (000-099)
24  (100-123)
>> 234

abcdefghijklmnopqrstuvwxyz
akg

1 * 676
11 * 26
7

26 (a-z)
676 (aa-zz)
26*10 (aaa-ajz)
7 (aka-akg)

문자 집합의 길이를 i라고 하면
주어진 암호가 i진법에서 몇 번째인지 구하는 문제
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [charSet, password] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((str) => str.split(''));

const charMap = charSet.reduce((map, char, index) => map.set(char, index + 1), new Map());

const { sum } = password.reverse().reduce(
  ({ sum, powerRemainder }, char, index) => {
    const nextPowerRemainder = index ? (powerRemainder * charMap.size) % 900_528 : 1;
    const nextSum = (sum + (charMap.get(char) * nextPowerRemainder)) % 900_528;
    return { sum: nextSum, powerRemainder: nextPowerRemainder };
  },
  { sum: 0, powerRemainder: 0 },
);

console.log(sum);

// 아 v-flag 지원안해주네 ㅋㅋ

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, targetLengthString, inputString] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/);

const targetLength = Number(targetLengthString);
const regex = /^(?<prefix>.*)A.*A(?<suffix>[BCDFGHJKLMNPQRSTVWXYZ]).*$/;
const matchResult = inputString.match(regex);
const result =
  matchResult !== null
    ? `${matchResult.groups.prefix.slice(-targetLength + 3)}AA${matchResult.groups.suffix}`
    : '';

if (result.length !== targetLength) {
  console.log('NO');
} else {
  console.log('YES');
  console.log(result);
}

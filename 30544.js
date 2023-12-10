const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
let [hour, minute, remainingCount] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/(?:\s|:)/)
  .map(Number);

const getNextCuckoo = (hour, minute) => {
  if (minute < 15) return [hour, 15];
  if (minute < 30) return [hour, 30];
  if (minute < 45) return [hour, 45];
  return [(hour % 12) + 1, 0];
};

if (minute === 0) remainingCount -= hour;
else if (minute % 15 === 0) remainingCount -= 1;

while (remainingCount > 0) {
  [hour, minute] = getNextCuckoo(hour, minute);
  if (minute === 0) remainingCount -= hour;
  else remainingCount -= 1;
}

console.log(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);

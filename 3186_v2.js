const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [info, data] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const [useThreshold, doneThreshold] = info.split(' ').map(Number);

const sol = [];
let isUsing = false;
let notStandCount = 0;
let standCount = 0;

Array.from(data + '0'.repeat(doneThreshold))
  .map(Number)
  .forEach((isStanding, index) => {
    if (isStanding) {
      notStandCount = 0;
      standCount += 1;
    } else {
      notStandCount += 1;
      standCount = 0;
    }

    if (standCount >= useThreshold) {
      isUsing = true;
    }

    if (isUsing && notStandCount >= doneThreshold) {
      isUsing = false;
      sol.push(index + 1);
    }
  });

console.log(sol.length ? sol.join('\n') : 'NIKAD');

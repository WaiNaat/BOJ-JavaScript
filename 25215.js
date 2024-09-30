/*
소대소 -> 소소별소
소대대소 -> 소소별소별소 / 소마대대마소
소대대소대대 -> 소마대대대별대대

연속된 소문자 또는 대문자가 2개 이상이면 마름모 사용
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const target = require('fs').readFileSync(INPUT_FILE).toString().trim();

const isUpperCase = (char) => char.toUpperCase() === char;
const caseGroups = [1];
for (let i = 1; i < target.length; i += 1) {
  if (isUpperCase(target[i - 1]) === isUpperCase(target[i])) {
    caseGroups[caseGroups.length - 1] += 1;
  } else {
    caseGroups.push(1);
  }
}

let isCurrentGroupUppercase = isUpperCase(target[0]);
let isRhombusActive = false;
let count = 0;

for (let i = 0; i < caseGroups.length; i += 1) {
  if (isCurrentGroupUppercase && isRhombusActive) {
    count += caseGroups[i];
  } else if (!isCurrentGroupUppercase && isRhombusActive) {
    if (caseGroups[i] > 1) {
      isRhombusActive = !isRhombusActive;
    }
    count += caseGroups[i] + 1;
  } else if (isCurrentGroupUppercase && !isRhombusActive) {
    if (caseGroups[i] > 1) {
      isRhombusActive = !isRhombusActive;
    }
    count += caseGroups[i] + 1;
  } else {
    // !isCurrentGroupUppercase && !isRhombusActive
    count += caseGroups[i];
  }
  isCurrentGroupUppercase = !isCurrentGroupUppercase;
}

console.log(count);

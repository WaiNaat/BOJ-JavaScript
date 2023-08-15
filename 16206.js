/*
일반적으로 케이크를 한 번 자르면 길이가 10인 롤케이크 하나가 나온다.
  -> 이건 그 어떤 잡기술을 도입하더라도 변하지 않음
근데 한 번 잘랐을 때 길이가 10인 롤케이크가 두 개 나오는 경우가 있음
  -> 길이가 20인 롤케이크를 잘랐을 때

자를 때 10 단위로 자르는데
원래 길이가 10의 배수인 롤케이크가 있다면 먼저 자름  
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, maxCutCount, ...cakes] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

cakes.sort((one, another) => {
  const oneRemainder = one % 10;
  const anotherRemainder = another % 10;

  if (oneRemainder === 0 && anotherRemainder !== 0) return -1;
  if (oneRemainder !== 0 && anotherRemainder === 0) return 1;
  return one - another;
});

let remainingCutCount = maxCutCount;
let cakeCount = 0;

cakes.forEach((cake) => {
  if (cake < 10) return;

  if (cake === 10) {
    cakeCount += 1;
    return;
  }

  if (!remainingCutCount) return;

  if (cake % 10 === 0) {
    const requiredCutCount = cake / 10 - 1;
    const canCutAll = requiredCutCount <= remainingCutCount;

    cakeCount += canCutAll ? requiredCutCount + 1 : remainingCutCount;
    remainingCutCount -= canCutAll ? requiredCutCount : remainingCutCount;
    return;
  }

  const requiredCutCount = Math.min(Math.floor(cake / 10), remainingCutCount);
  cakeCount += requiredCutCount;
  remainingCutCount -= requiredCutCount;
});

console.log(cakeCount);

/*
일단 자를 수 있는 지점에서 다 잘랐다 치고
그 덩어리를 이어붙여서 가장 작은 조각의 길이 이상이 되게끔 한다고 생각하기

이분 탐색
움직이는 값: 가장 작은 조각의 길이
기준점: 원하는 조각의 개수 (자르는 횟수 + 1)
비교값: 가장 작은 조각의 길이를 x라 했을 때 나오는 조각의 개수

비교값이 기준점보다 작으면 움직이는 값을 줄임
비교값이 기준점보다 크거나 같으면 움직이는 값을 늘림
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, cuttingPlaceCount, cakeLength, ...inputs] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(/\s/)
  .map(Number);

const pieces = [];
for (let i = 0; i < cuttingPlaceCount; i += 1) {
  pieces.push(inputs[i] - (inputs[i - 1] || 0));
}
pieces.push(cakeLength - inputs[cuttingPlaceCount - 1]);

const cutCounts = [];
for (let i = cuttingPlaceCount; i < inputs.length; i += 1) {
  cutCounts.push(inputs[i]);
}

const countPieces = (pieceLength) => {
  let count = 0;
  let currentLength = 0;

  pieces.forEach((length) => {
    currentLength += length;

    if (currentLength >= pieceLength) {
      count += 1;
      currentLength = 0;
    }
  });

  return count;
};

const getMaxPieceLength = (pieceCount) => {
  let left = 1;
  let right = cakeLength + 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (countPieces(mid) < pieceCount) right = mid;
    else left = mid + 1;
  }

  return left - 1;
};

const sol = [];

cutCounts.forEach((cutCount) => sol.push(getMaxPieceLength(cutCount + 1)));

console.log(sol.join('\n'));

/*
파일 크기 오름차순 정렬

각 파일마다
  본인보다 작은 파일들 검사
  본인 90% 크기의 index를 찾아서 거기부터 본인까지 몇개인지 셈

이분탐색
움직이는 값: 배열의 index
기준점: 각 파일 크기의 90%
중간값 위치의 파일 크기가 기준점보다 작으면 늘리기
중간값 위치의 파일 크기가 기준점보다 크거나 같으면 줄이기
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...files] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(/\s/)
  .map(Number);

files.sort((a, b) => a - b);

const countAdjacentFiles = (index) => {
  const datumPoint = Math.ceil(files[index] * 0.9);

  let left = 0;
  let right = index;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (files[mid] < datumPoint) left = mid + 1;
    else right = mid;
  }

  return index - left;
};

const sol = files.reduce((prev, _, index) => prev + countAdjacentFiles(index), 0);

console.log(sol);

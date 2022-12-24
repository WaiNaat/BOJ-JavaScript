/*
일단 S가 두번 반복되고 그 사이에 문자 단 하나가 삽입되는 형식
  >> U의 길이가 짝수면 불가능

U의 길이를 2x+1이라고 했을 때
1) 맨 앞의 x개가 S고 뒤쪽 x+1개에 문자 하나가 삽입된 경우
2) 맨 앞의 x+1개에 문자 하나가 삽입됐고 뒤쪽 x개가 S인 경우
이렇게 두 가지 경우로 나눠서 생각 가능

각 경우별로 앞쪽과 뒷쪽의 서로 다른 부분이 1개면 통과, 1개 초과면 실패
통과했지만 1번의 S와 2번의 S가 다른 경우 유일하지 않음
*/
const validateLength = (length) => {
  if (length % 2 !== 1) throw new Error('NOT POSSIBLE');
};

const validateCopyAndInsert = (str1, str2) => {
  let index1 = 0;
  let index2 = 0;
  let isDifferent = false;

  while (index1 < str1.length && index2 < str2.length) {
    if (str1[index1] !== str2[index2]) {
      if (isDifferent) return false;
      isDifferent = true;

      if (str1.length < str2.length) index1 -= 1;
      else index2 -= 1;
    }

    index1 += 1;
    index2 += 1;
  }

  return true;
};

const validateUniqueness = (str1, str2) => {
  if (str1 !== str2) throw new Error('NOT UNIQUE');
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [N, U] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

// process
let sol;
try {
  validateLength(N);

  const half = Math.floor(N / 2);
  const result1 = validateCopyAndInsert(U.slice(0, half), U.slice(half, N));
  const result2 = validateCopyAndInsert(U.slice(0, half + 1), U.slice(half + 1, N));
  if (!(result1 || result2)) throw new Error('NOT POSSIBLE');

  if (result1 && result2) {
    validateUniqueness(U.slice(0, half), U.slice(half + 1, N));
    sol = U.slice(0, half);
  } else if (result1) {
    sol = U.slice(0, half);
  } else {
    sol = U.slice(half + 1, N);
  }
} catch (error) {
  sol = error.message;
}

// output
console.log(sol);

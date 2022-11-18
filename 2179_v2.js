// 틀렸습니다

/*
1. 단어를 사전순으로 정렬
2. 서로 붙어있는 두 단어 선택, 접두사 길이 측정

주의할 점은 단어의 입력 순서
>> 정렬 전 입력 순서도 같이 저장

3.
접두사 길이가 길면?
  새로운 정답 후보 탄생 !!
짧으면?
  탈락
같으면?
  이전 정답 후보에서 먼저 입력된 단어
  지금 보고 있는 단어 1
  지금 보고 있는 단어 2
  세 개를 비교해서 정답 후보 선출
*/
// class
class Pair {
  constructor(S, indexS, T, indexT) {
    if (indexS < indexT) {
      this.word1 = S;
      this.word2 = T;
      this.index1 = indexS;
      this.index2 = indexT;
    } else {
      this.word1 = T;
      this.word2 = S;
      this.index1 = indexT;
      this.index2 = indexS;
    }
  }

  isSmaller(other) {
    if (this.index1 < other.index1) return true;
    if (this.index1 > other.index1) return false;
    if (this.index2 < other.index2) return true;
    return false;
  }
}

// functions
const calcPrefixLength = (S, T) => {
  let length = 0;
  for (let i = 0; i < S.length && i < T.length; i += 1) {
    if (S[i] === T[i]) length += 1;
    else break;
  }
  return length;
};

// input
const inputFile = process.platform === 'linux' ? '/dev/stdin' : './input';
let [N, ...words] = require('fs').readFileSync(inputFile).toString().trim()
  .split('\n');

N = Number(N);

// process
// 정렬
words = words.map((value, index) => [value, index]);
words.sort((a, b) => {
  if (a[0] < b[0]) return -1;
  return 1;
});

// 계산
let maxPrefixLength = -1;
let sol;

for (let i = 0; i < N - 1; i += 1) {
  const prefixLength = calcPrefixLength(words[i][0], words[i + 1][0]);

  if (prefixLength === maxPrefixLength) {
    const candidates = [sol, new Pair(...words[i], ...words[i + 1])];

    if (calcPrefixLength(sol.word1, words[i][0]) === prefixLength) {
      candidates.push(new Pair(sol.word1, sol.index1, ...words[i]));
    }

    if (calcPrefixLength(sol.word1, words[i + 1][0]) === prefixLength) {
      candidates.push(new Pair(sol.word1, sol.index1, ...words[i + 1]));
    }

    candidates.sort((a, b) => {
      if (a.isSmaller(b)) return -1;
      return 1;
    });

    [sol] = candidates;
  }

  if (prefixLength > maxPrefixLength) {
    sol = new Pair(...words[i], ...words[i + 1]);
    maxPrefixLength = prefixLength;
  }
}

// output
console.log(`${sol.word1}\n${sol.word2}`);

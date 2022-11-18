/*
1. 단어를 사전순으로 정렬
  단어의 '원래 위치'도 함께 기억
2. 서로 붙어있는 두 단어 선택, 접두사 측정
3. 접두사 Map에 저장
  이미 있는 접두사일 경우
  원래 위치 2개와 현재 위치 2개 중
  가장 빠른 2개의 원래 위치도 저장
4. 접두사 저장된거 보면서 정답찾기
*/
// class
class Pair {
  constructor(prefixLength, S, indexS, T, indexT) {
    this.prefixLength = prefixLength;
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

  update(S, indexS) {
    if (this.word1 === S || this.word2 === S) return;
    if (indexS < this.index1) {
      this.index2 = this.index1;
      this.word2 = this.word1;
      this.index1 = indexS;
      this.word1 = S;
    } else if (indexS < this.index2) {
      this.index2 = indexS;
      this.word2 = S;
    }
  }

  hasMorePriority(other) {
    if (this.prefixLength > other.prefixLength) return true;
    if (this.prefixLength < other.prefixLength) return false;
    if (this.index1 < other.index1) return true;
    if (this.index1 > other.index1) return false;
    if (this.index2 <= other.index2) return true;
    return false;
  }
}

// functions
const getPrefix = (S, T) => {
  const prefix = [];
  for (let i = 0; i < S.length && i < T.length; i += 1) {
    if (S[i] === T[i]) prefix.push(S[i]);
    else break;
  }
  return prefix.join('');
};

// input
const inputFile = process.platform === 'linux' ? '/dev/stdin' : './input';
let [N, ...words] = require('fs').readFileSync(inputFile).toString().trim()
  .split('\n');

N = Number(N);

// process
words = words.map((value, index) => [value, index]);
words.sort((a, b) => {
  if (a[0] < b[0]) return -1;
  return 1;
});

const prefixMap = new Map();
for (let i = 0; i < N - 1; i += 1) {
  const prefix = getPrefix(words[i][0], words[i + 1][0]);

  if (!prefixMap.has(prefix)) {
    prefixMap.set(prefix, new Pair(prefix.length, ...words[i], ...words[i + 1]));
  } else {
    const pair = prefixMap.get(prefix);
    pair.update(...words[i]);
    pair.update(...words[i + 1]);
  }
}

let sol = new Pair(-1);
prefixMap.forEach((pair) => { if (pair.hasMorePriority(sol)) sol = pair; });

// output
console.log(`${sol.word1}\n${sol.word2}`);

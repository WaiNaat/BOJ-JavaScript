/*
dp + 재귀

M번째 글자는 messi(A)의 B번째 글자인지 계산
  -> messi(A)의 B번째 글자는 messi(A-1) 또는 messi(A-2)의 C번째 글자
  이런식으로 쭉 역산 가능
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const target = Number(require('fs').readFileSync(INPUT_FILE).toString());

const opt = [0, 5, 13];

for (let i = 3; opt[i - 1] < target; i += 1) {
  opt.push(opt[i - 1] + 1 + opt[i - 2]);
}

const getCharacterAt = (messiIndex, charIndex) => {
  if (messiIndex === 1) return '_Messi'[charIndex];
  if (messiIndex === 2) return '_Messi Gimossi'[charIndex];

  if (charIndex <= opt[messiIndex - 1]) {
    return getCharacterAt(messiIndex - 1, charIndex);
  }

  if (charIndex === opt[messiIndex - 1] + 1) {
    return ' ';
  }

  return getCharacterAt(messiIndex - 2, charIndex - opt[messiIndex - 1] - 1);
};

const sol = getCharacterAt(opt.length - 1, target);

console.log(sol !== ' ' ? sol : 'Messi Messi Gimossi');

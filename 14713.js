/*
"어떤 단어도 앵무새가 말하는 모든 문장을 통틀어 2번 이상 등장하지 않는다."

각 앵무새의 문장: 단어들로 이루어진 하나의 큐
1. 받아 적은 문장의 앞에서부터 단어를 하나씩 뽑는다
2. 그 단어를 말할 수 있는 앵무새가 있다면 그 앵무새의 큐에서 하나 뺀다
3. 그런 앵무새가 없으면 실패

앵무새가 많지 않으므로 그냥 순회해서 찾아도 무방
*/
class Parrot {
  constructor(sentence) {
    this.words = sentence.split(' ');
    this.current = 0;
  }

  finishedTalking() {
    return this.current === this.words.length;
  }

  says(word) {
    if (!this.finishedTalking() && word === this.words[this.current]) {
      this.current += 1;
      return true;
    }
    return false;
  }
}

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...sentences] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const writing = sentences.pop().split(' ');
const parrots = sentences.map((sentence) => new Parrot(sentence));

const isCorrectWriting = () => {
  for (const word of writing) {
    let isSomeParrotSaid = false;

    for (const parrot of parrots) {
      if (parrot.says(word)) {
        isSomeParrotSaid = true;
        break;
      }
    }

    if (!isSomeParrotSaid) return false;
  }
  return parrots.every((parrot) => parrot.finishedTalking());
};

console.log(isCorrectWriting() ? 'Possible' : 'Impossible');

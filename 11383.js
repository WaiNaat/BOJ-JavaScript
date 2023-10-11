const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [info, ...images] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const [height] = info.split(' ').map(Number);
const toLongString = (target) => {
  const result = [];
  Array.from(target).forEach((char) => {
    result.push(char, char);
  });
  return result.join('');
};

let isEyfa = true;

for (let i = 0; i < height; i += 1) {
  if (toLongString(images[i]) !== images[i + height]) {
    isEyfa = false;
    break;
  }
}

console.log(isEyfa ? 'Eyfa' : 'Not Eyfa');

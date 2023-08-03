const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...files] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const pattern = [];

for (let i = 0; i < files[0].length; i += 1) {
  if (files.every((file) => file[i] === files[0][i])) {
    pattern.push(files[0][i]);
  } else {
    pattern.push('?');
  }
}

console.log(pattern.join(''));

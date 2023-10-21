const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const inputs = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

inputs.pop();

const encrypt = (target, jump) => {
  const parsed = [...target.split(' ').join('').toUpperCase()];
  const result = new Array(parsed.length);

  let index = 0;
  parsed.forEach((char) => {
    while (result[index]) index += 1;
    result[index] = char;
    index += jump;
    if (index >= result.length) index = 0;
  });

  return result.join('');
};

const sol = [];

for (let i = 0; i < inputs.length; i += 2) {
  sol.push(encrypt(inputs[i + 1], Number(inputs[i])));
}

console.log(sol.join('\n'));

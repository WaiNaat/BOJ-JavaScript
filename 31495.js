const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const input = require('fs').readFileSync(INPUT_FILE).toString().trim();

const regex = /^"(?<target>.+)"$/;
const result = regex.exec(input);
const target = result?.groups.target;

console.log(target ?? 'CE');

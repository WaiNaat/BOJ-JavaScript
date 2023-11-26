const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[totalCount], shirts, [shirtBundle, penBubdle]] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const shirtBundleCount = shirts.reduce((prev, cur) => prev + Math.ceil(cur / shirtBundle), 0);
const penBundleCount = Math.floor(totalCount / penBubdle);
const penSingleCount = totalCount % penBubdle;

console.log(`${shirtBundleCount}\n${penBundleCount} ${penSingleCount}`);

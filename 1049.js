/*
제일 싼 여섯 개 패키지 가격
제일 싼 낱개 패키지 가격

이거 두 개 구해서 계산하기
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[lineCount], ...prices] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const { minPackagePrice, minSinglePrice } = prices.reduce(
  ({ minPackagePrice, minSinglePrice }, [packagePrice, singlePrice]) => ({
    minPackagePrice: Math.min(packagePrice, minPackagePrice),
    minSinglePrice: Math.min(singlePrice, minSinglePrice),
  }),
  { minPackagePrice: Infinity, minSinglePrice: Infinity },
);

const packagePrice = Math.min(minPackagePrice, minSinglePrice * 6);

const sol =
  Math.min(minPackagePrice, (lineCount % 6) * minSinglePrice) +
  Math.floor(lineCount / 6) * packagePrice;

console.log(sol);

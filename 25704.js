const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [coupon, price] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map(Number);

const getCouponType = (couponCount) => {
  return Math.min(Math.floor(couponCount / 5), 4);
};
const discountFunctions = [
  (value) => value,
  (value) => Math.max(value - 500, 0),
  (value) => value * 0.9,
  (value) => Math.max(value - 2000, 0),
  (value) => value * 0.75,
];

const prices = discountFunctions
  .filter((_, index) => index <= getCouponType(coupon))
  .map((fn) => fn(price));

console.log(Math.min(...prices));

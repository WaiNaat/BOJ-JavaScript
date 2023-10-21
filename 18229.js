const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[, , threshold], ...people] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const candidates = people
  .map((person, me) =>
    person.reduce(
      ({ hand, paymentIndex }, cur, index) => {
        if (paymentIndex >= 0) return { hand, paymentIndex, me };
        const nextHand = hand + cur;
        if (nextHand >= threshold) return { hand: nextHand, paymentIndex: index, me };
        return { hand: nextHand, paymentIndex, me };
      },
      { hand: 0, paymentIndex: -1, me },
    ),
  )
  .filter(({ paymentIndex }) => paymentIndex >= 0)
  .sort((one, another) => {
    if (one.paymentIndex !== another.paymentIndex) return another.paymentIndex - one.paymentIndex;
    return another.me - one.me;
  });

const { me, paymentIndex } = candidates.pop();

console.log(me + 1, paymentIndex + 1);

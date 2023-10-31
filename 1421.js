/*
팔려고 하는 나무의 길이를 전부 같게 
나무 50개 * 길이 1만
그냥 길이별로 다 시도하면 될듯?

길이 100인 나무는 33으로 나누면
33 33 33 1 이렇게도 가능함

근데 자르는 비용이 너무 크면 안자르는게 나을수도 있음ㅋㅋ
  자르는 비용 40
  판매비용 30

  한번에 반갈로 두덩이가 나오면 이득
  나머지 손해

나무 길이가 딱코로 떨어지면 한번 덜 잘라도 됨
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, cut, sell, ...woods] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const getPrice = (length) => {
  let price = 0;

  woods.forEach((wood) => {
    if (wood < length) return;

    const count = Math.floor(wood / length);
    const remainder = wood % length;
    const cutPrice = (remainder > 0 ? count : count - 1) * cut;
    const woodPrice = count * length * sell;

    price += Math.max(woodPrice - cutPrice, 0);
  });

  return price;
};

let sol = -Infinity;

for (let length = 1; length <= Math.max(...woods); length += 1) {
  sol = Math.max(getPrice(length), sol);
}

console.log(sol);

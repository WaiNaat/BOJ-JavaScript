/*
모든 기업이 거래를 하긴 함? ㄴㄴ

그리디

최종 거래 형태가 아래와 같다고 치자
만족: A, B, C, D, E
가격: a, b, c, d, e

(A+B+C+...)-(a+b+c+...) 가 최대여야 함

만족도가 큰 물건부터
돈을 적게 내는 기업부터
만약 만족도-돈=0이 되는 조합이 생기면 정지

JS Number는 15자리부터 위험
답은 최대 14자리
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, items, companies] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

items.sort((one, another) => one - another);
companies.sort((one, another) => another - one);

let sol = 0;

while (items.length && companies.length) {
  const item = items.pop();
  const company = companies.pop();

  if (item <= company) break;
  sol += item - company;
}

console.log(sol);

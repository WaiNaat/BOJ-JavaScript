/*
일단 E, M, H만 써서 최대한 많이 열어봄
그다음엔 한번씩 개최하면서 모자란걸 EM, MH에서 가져옴
  근데 어디서 가져오지? 둘중에 더 많이남은데
  같으면, easy, hard중 더 많이남은데
  그거도 같으면? 그냥 이지에서 가져와
*/
// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
let [easy, easyMiddle, middle, middleHard, hard] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(' ')
  .map(Number);

// process
let sol = 0;

sol += Math.min(easy, middle, hard);
easy -= sol;
middle -= sol;
hard -= sol;

const open = () => {
  if (easy > 0) easy -= 1;
  else if (easyMiddle > 0) easyMiddle -= 1;
  else return false;

  if (middle > 0) middle -= 1;
  else if (easyMiddle > middleHard) easyMiddle -= 1;
  else if (middleHard > easyMiddle) middleHard -= 1;
  else if (easyMiddle > 0 && easyMiddle === middleHard && easy >= hard) easyMiddle -= 1;
  else if (middleHard > 0 && easyMiddle === middleHard && easy < hard) middleHard -= 1;
  else return false;

  if (hard > 0) hard -= 1;
  else if (middleHard > 0) middleHard -= 1;
  else return false;

  return true;
};

let canOpenContest = true;
while (canOpenContest) {
  canOpenContest = open();
  if (canOpenContest) sol += 1;
}

// output
console.log(sol);

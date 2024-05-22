/*
한칸 뒤로 밀림 = 팁 1만큼 덜받음
결국 앞쪽에서 팁을 1원이라도 받으면 뒤쪽으로 미뤄도 손해는 안 봄
따라서 팁을 많이주려는 사람을 뒤로 미루고, 팁을 적게주는 사람을 앞으로 배치해서
1원이라도 팁을 더 받아야함
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...tips] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map(Number);

tips.sort((one, another) => another - one);

const totalTip = tips.reduce(
  (total, tip, waitingTime) => total + Math.max(tip - waitingTime, 0),
  0,
);

console.log(totalTip);

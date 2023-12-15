/*
"종류"가 N개
"최악"

일단 N뽑했는데 다 다른종류임
그럼 짝1 -> N+1뽑
짝2 -> 짝1때 뽑아서 없어진종류가 또나와 + 다시 1뽑 -> N+1+2뽑

베이스를 N-1로 깔고 한쌍당 두번씩 더뽑는다는느낌
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [N, R] = require('fs').readFileSync(INPUT_FILE).toString().trim().split(' ').map(BigInt);

console.log((N - 1n + R * 2n).toString());

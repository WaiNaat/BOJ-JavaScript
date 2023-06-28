/*
1. 다음 섬으로
2. 다다음 섬으로
3. 이전 섬으로
모든 섬 탐방, 재방문 ㄴㄴ

1 2 3
1 (3 2)

1 2 3 4
1 (3 2) 4
1 2 (4 3)

1 2 3 4 5
1 (3 2) 4 5
1 2 (4 3) 5
1 2 3 (5 4)

1 2 3 4 5 6
1 (3 2) 4 5 6
1 2 (4 3) 5 6
1 2 3 (5 4) 6
1 2 3 4 (6 5)
1 (3 2) 4 (6 5)

1 2 3 4 5 6 7
1 (3 2) 4 5 6 7
1 2 (4 3) 5 6 7
1 2 3 (5 4) 6 7
1 2 3 4 (6 5) 7
1 (3 2) 4 (6 5) 7
1 2 3 4 5 (7 6)
1 (3 2) 4 5 (7 6)
1 2 (4 3) 5 (7 6)

모든 섬을 방문해야 함
-> 두 칸 건너뛰었으면 반드시 뒤로 간 후 다시 두 칸 건너뜀
-> 1 3 2 4

"연속된 두 개를 골라서 뒤집는다"
"뒤집기를 연속으로 할 수는 없다"
"첫 번째와 두 번째는 뒤집을 수 없다"

opt(i, 뒤집기?) := i번 섬까지 탐방했는데 i번, i-1번을 뒤집었는지

i, i-1을 뒤집으려면 i-2번은 절대 뒤집으면 안됨

opt(i, 안뒤집) = opt(i-1, 안뒤집) + opt(i-1, 뒤집)
opt(i, 뒤집) = opt(i-3, 안뒤집) + opt(i-3, 뒤집)
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const islandCount = Number(require('fs').readFileSync(INPUT_FILE).toString());

const DIVISOR = 1_000_000_009;

const normal = [0, 1, 1, 1];
const reversed = [0, 0, 0, 1];

for (let island = 4; island <= islandCount; island += 1) {
  normal.push((normal[island - 1] + reversed[island - 1]) % DIVISOR);
  reversed.push((normal[island - 3] + reversed[island - 3]) % DIVISOR);
}

console.log((normal[islandCount] + reversed[islandCount]) % DIVISOR);

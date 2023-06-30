/*
tile(i) := i번째 타일의 한 변 길이
deco(i) := i번째 타일을 붙여서 나온 장식물의 둘레 길이

tile(i) = tile(i-1) + tile(i-2)
deco(i) = deco(i-1) + 2 * tile(i)
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const tileCount = Number(require('fs').readFileSync(INPUT_FILE).toString());

const tileSize = [0n, 1n, 1n];
const decoSize = [0n, 4n, 6n];

for (let i = 3; i <= tileCount; i += 1) {
  tileSize.push(tileSize[i - 1] + tileSize[i - 2]);
  decoSize.push(decoSize[i - 1] + tileSize[i] * 2n);
}

console.log(decoSize[tileCount].toString());

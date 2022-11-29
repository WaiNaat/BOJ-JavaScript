/// 19점

/*
1. 일단 재귀 <<<<<<<<< 이거때문에 런타임에러 발생하는듯?
2. 자식이 최대 2개가 아님
*/

/*
주어진 입력을 인접 리스트 형태로 만들어서 1번부터 탐색 시작

opt(i) := i번 오두막을 루트로 하는 서브트리의 다양성의 총합
count(i) := i번 오두박을 루트로 하는 서브트리의 오두막의 수
diversity(i, j) := i번 오두막에서 j번 오두막으로 가는 길의 다양성

opt(i) =
  opt(왼쪽 자식) + (왼쪽 자식과 그 후손들 중, 두 개를 고르는 경우의 수)

  opt(오른쪽 자식) + (오른쪽 자식과 그 후손들 중, 두 개를 고르는 경우의 수)

  sum(diversity(본인, 왼쪽자식과 그 후손) * count(오른쪽자식)
  + (sum(diversity(본인, 오른쪽자식과 그 후손) * count(왼쪽자식)

  sum(diversity(본인, 본인후손))

  얘네들의 합

결국 기억애야 하는건?
opt(본인)
count(본인)
sum(diversity(본인, 본인후손))
탐색을 위한 parent(본인)

sum(diversity(본인, 본인후손)) =
    (sum(diversity(왼쪽자식, 왼쪽자식후손)) + count(왼쪽자식))
    + (sum(diversity(오른쪽자식, 오른쪽자식후손)) + count(오른쪽자식))

count(본인) = count(왼쪽자식) + count(오른쪽자식) + 1
*/
const makeAdjacentList = (N, edges) => {
  const E = Array.from(new Array(N + 1), () => []);
  edges.forEach(([hut1, hut2]) => {
    E[hut1].push(hut2);
    E[hut2].push(hut1);
  });
  return E;
};

const updateOpt = (hut, E, optArray, hutCount, diversitySumIncludingSelf, parent) => {
  const opt = optArray;

  // 자식들~본인까지 오는 다양성의 합
  opt[hut] = diversitySumIncludingSelf[hut];

  // 각 자식 내부의 경로에 본인을 추가
  const childs = [];
  E[hut].forEach((child) => {
    if (child === parent[hut]) return;
    childs.push(child);
    opt[hut] += opt[child] + (hutCount[child] * (hutCount[child] - 1)) / 2;

    // if (hut === 6) console.log(child, opt[child] + (hutCount[child] * (hutCount[child] - 1)) / 2);
  });

  // 양쪽 자식을 연결
  if (childs.length !== 2) return;
  const [left, right] = childs;
  opt[hut] += (
    (diversitySumIncludingSelf[left] + hutCount[left]) * hutCount[right]
    + (diversitySumIncludingSelf[right] + hutCount[right]) * hutCount[left]
  );

  /*
  if (hut === 6) {
    console.log(
      (diversitySumIncludingSelf[left] + hutCount[left]) * hutCount[right] + (diversitySumIncludingSelf[right] + hutCount[right]) * hutCount[left]
    );
  }
  */
};

const updateCount = (hut, E, hutCountArray, parent) => {
  const hutCount = hutCountArray;
  hutCount[hut] = 1;
  E[hut].forEach((child) => {
    if (child === parent[hut]) return;
    hutCount[hut] += hutCount[child];
  });
};

const updateDiversitySum = (hut, E, hutCount, diversitySumIncludingSelf, parent) => {
  const diversitySum = diversitySumIncludingSelf;
  E[hut].forEach((child) => {
    if (child === parent[hut]) return;
    diversitySum[hut] += diversitySum[child] + hutCount[child];
  });
};

const update = (hut, E, opt, hutCount, diversitySumIncludingSelf, parent) => {
  updateDiversitySum(hut, E, hutCount, diversitySumIncludingSelf, parent);
  updateCount(hut, E, hutCount, parent);
  updateOpt(hut, E, opt, hutCount, diversitySumIncludingSelf, parent);
};

const traverse = (hut, E, opt, hutCount, diversitySumIncludingSelf, parentArray) => {
  const parent = parentArray;

  E[hut].forEach((child) => {
    if (child !== parent[hut] && opt[child] === 0) {
      parent[child] = hut;
      traverse(child, E, opt, hutCount, diversitySumIncludingSelf, parent);
    }
  });

  update(hut, E, opt, hutCount, diversitySumIncludingSelf, parent);
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[N], ...edges] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

// process
const opt = new Array(N + 1).fill(0);
const hutCount = new Array(N + 1);
const diversitySumIncludingSelf = new Array(N + 1).fill(0);
const parent = new Array(N + 1);

const E = makeAdjacentList(N, edges);

traverse(1, E, opt, hutCount, diversitySumIncludingSelf, parent);

// output
console.log(opt[1]);
/* console.log('opt');
console.log(opt);
console.log('\nhutCount');
console.log(hutCount);
console.log('\ndSum');
console.log(diversitySumIncludingSelf);
console.log('\nparent');
console.log(parent); */

/*
1. 일단 트리를 만든다
2. 연결관계를 끊는다
3. dfs로 리프노드 개수를 센다
*/
const makeTree = (parent) => {
  let root;
  const childs = Array.from(new Array(parent.length), () => []);

  parent.forEach((parentNode, index) => {
    if (parentNode === -1) {
      root = index;
      return;
    }
    childs[parentNode].push(index);
  });

  return { root, childs };
};

const countLeafNodesFrom = (start, childs) => {
  if (childs[start].length === 0) return 1;
  return childs[start].reduce(
    (count, curNode) => count + countLeafNodesFrom(curNode, childs),
    0,
  );
};

const deleteNode = (target, parent, childList) => {
  const childs = childList;
  childs[parent] = childs[parent].filter((child) => child !== target);
  return childs;
};

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [_, parent, [deletingNode]] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const { root, childs } = makeTree(parent);

let leafCount = 0;
if (root !== deletingNode) {
  deleteNode(deletingNode, parent[deletingNode], childs);
  leafCount = countLeafNodesFrom(root, childs);
}

console.log(leafCount);

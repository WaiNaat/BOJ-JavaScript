/*
애초에 그래프가 한 덩이 또는 두 덩이로 이루어진게 아니면 무조건 실패
두 덩이여도 덩이별로 크기가 같으면 실패
dfs O(N+M)

그래프가 한 덩이라면
정점의 개수가 2개 이하일때 무조건 실패
O(1)

정점이 3개 이상인 한 덩이 그래프는
1. MST 만들기
  O(M)
2. MST 에서 리프노드 하나 제거
  리프노드 찾기 O(N)
이 방법을 통해 무조건 크기가 다른 두 그래프로 나눌 수 있음

----

MST 만들기
  간선의 비용이 전부 동일하므로 우순큐 필요없음
  1. 스택에서 간선 뽑기
  2. 해당 간선 트리에 포함시키기
  3. 간선의 끝점 중 원래 트리에 없던 정점과 연결된 간선들 스택에 넣기
  4. 뽑은 간선의 수가 N-1개가 될 때까지 반복
-> 처음에 섬 만드는 dfs 를 통해 바로 제작 가능
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[vertexCount], ...edges] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const next = Array.from({ length: vertexCount + 1 }, () => []);
edges.forEach(([a, b], idx) => {
  next[a].push({ vertex: b, edgeName: idx });
  next[b].push({ vertex: a, edgeName: idx });
});

const getIslands = () => {
  const dfsVisited = new Set();
  const islands = [];

  for (let v = 1; v <= vertexCount; v += 1) {
    if (!dfsVisited.has(v)) {
      const vertices = new Set();
      const edges = new Set();

      // dfs
      const stack = [{ vertex: v, edgeName: undefined }];
      while (stack.length > 0) {
        const { vertex: cur, edgeName } = stack.pop();

        if (dfsVisited.has(cur)) {
          continue;
        }
        dfsVisited.add(cur);

        vertices.add(cur);
        if (edgeName !== undefined) {
          edges.add(edgeName);
        }

        next[cur].forEach((info) => {
          stack.push(info);
        });
      }

      islands.push({ vertex: vertices, tree: edges });
    }
  }

  return islands;
};

const findLeafNode = (vertexSet, edgeSet) => {
  const vertices = {};

  edgeSet.forEach((edgeName) => {
    const [a, b] = edges[edgeName];

    if (!vertices[a]) vertices[a] = [];
    if (!vertices[b]) vertices[b] = [];

    vertices[a].push(edgeName);
    vertices[b].push(edgeName);
  });

  return Object.entries(vertices).find(([, connectedEdges]) => connectedEdges.length === 1);
};

const divideTree = () => {
  const islands = getIslands();

  // 애초에 덩어리가 3개 이상이면 2개로 나눌 수 없음
  if (islands.length > 2) {
    return undefined;
  }

  // 덩어리가 2개일 때는 두 덩이의 크기를 보고 성공 실패 바로 판별 가능
  if (islands.length === 2) {
    const isTwoIslandSameSize = islands[0].vertex.size === islands[1].vertex.size;
    if (isTwoIslandSameSize) {
      return undefined;
    }
    return islands;
  }

  // 덩어리가 1개인데 총 정점이 2개 이하면 무조건 실패
  const [island] = islands;
  if (island.vertex.size <= 2) {
    return undefined;
  }

  // 덩어리 1개일 때
  const [leafNodeString, [edgeName]] = findLeafNode(island.vertex, island.tree);
  const leafNode = Number(leafNodeString);
  island.vertex.delete(leafNode);
  island.tree.delete(edgeName);

  return [island, { vertex: new Set([leafNode]), tree: new Set() }];
};

const sol = divideTree();

if (sol === undefined) {
  console.log(-1);
} else {
  const [tree1, tree2] = sol;
  console.log(tree1.vertex.size, tree2.vertex.size);
  console.log(Array.from(tree1.vertex).join(' '));
  console.log(
    Array.from(tree1.tree)
      .map((edgeName) => edgeName + 1)
      .join(' '),
  );
  console.log(Array.from(tree2.vertex).join(' '));
  console.log(
    Array.from(tree2.tree)
      .map((edgeName) => edgeName + 1)
      .join(' '),
  );
}

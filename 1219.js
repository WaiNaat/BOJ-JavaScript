/*
거꾸로 가는 벨만-포드
간선의 비용 = 도착도시 버는돈 - 이동비용
마지막에 '양의 사이클'이 있다면 돈복사가 된다는 뜻

근데 이 양순환을 거쳐서 도착도시로 가야 함
양순환이 발생하는 간선들을 뽑아서
출발 -> 양순환간선 암거나 1개 -> 도착
이렇게 도착이 가능해야 함
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[cityCount, startCity, endCity], ...transportations] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const benefits = transportations.pop();
const edges = transportations.map(([start, end, price]) => {
  return [start, end, benefits[end] - price];
});
const money = Array.from({ length: cityCount }, () => -Infinity);

money[startCity] = benefits[startCity];

for (let i = 0; i < cityCount - 1; i += 1) {
  edges.forEach(([start, end, price]) => {
    money[end] = Math.max(money[start] + price, money[end]);
  });
}

const result = money[endCity];
const positiveCycleEdges = edges.filter(([start, end, price]) => {
  return money[start] + price > money[end];
});

const isPositiveCycleInRouteToEndCity = () => {
  const hasPositiveCycle = positiveCycleEdges.length > 0;
  if (!hasPositiveCycle) {
    return false;
  }

  const next = Array.from({ length: cityCount }, () => new Set());
  edges.forEach(([start, end]) => {
    next[start].add(end);
  });

  const edgesFromStartToEndWithPositiveCycle = positiveCycleEdges
    .filter(([cycleStart]) => {
      const stack = [startCity];
      const visited = Array.from({ length: cityCount });

      while (stack.length > 0) {
        const cur = stack.pop();

        if (visited[cur]) continue;
        visited[cur] = true;

        if (cur === cycleStart) {
          return true;
        }

        next[cur].forEach((city) => {
          if (!visited[city]) {
            stack.push(city);
          }
        });
      }

      return false;
    })
    .filter(([, cycleEnd]) => {
      const stack = [cycleEnd];
      const visited = Array.from({ length: cityCount });

      while (stack.length > 0) {
        const cur = stack.pop();

        if (visited[cur]) continue;
        visited[cur] = true;

        if (cur === endCity) {
          return true;
        }

        next[cur].forEach((city) => {
          if (!visited[city]) {
            stack.push(city);
          }
        });
      }

      return false;
    });

  return edgesFromStartToEndWithPositiveCycle.length > 0;
};

if (result === -Infinity) {
  console.log('gg');
} else if (isPositiveCycleInRouteToEndCity()) {
  console.log('Gee');
} else {
  console.log(result);
}

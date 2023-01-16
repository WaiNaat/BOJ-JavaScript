/*
그래프를 이쁘게 만들어서 dfs를 돌리는 문제

웹페이지 뭉탱이가 주어졌을 때
  본인 주소를 알아내는 기능
  연결된 페이지들을 알아내는 기능
웹페이지를 주소가 아닌 노드번호(숫자)로 변경하는 기능
주어진 연결관계를 그래프로 단순화하는 기능
시작점부터 끝점까지 이동이 가능한지 판단하는 기능
*/
const getUrl = (page) => {
  const [candidate1, candidate2] = page.split('\n');
  if (/^http:/.test(candidate1)) return candidate1;
  return candidate2;
};

const getLinks = (page) => {
  const links = [];
  const regexp = /<A HREF="(\S+)"/g;
  const matches = [...page.matchAll(regexp)];
  matches.forEach((match) => {
    links.push(match[1]);
  });
  return links;
};

const updateMap = (urlIdMap, urls) => {
  urls.forEach((url) => {
    if (!urlIdMap.has(url)) urlIdMap.set(url, urlIdMap.size);
  });
};

const makePageLinkInfo = (pages) => {
  const urlIdMap = new Map();
  const urls = [];
  const links = [];

  pages.forEach((page) => {
    const url = getUrl(page);
    const link = getLinks(page);
    urls.push(url);
    links.push(link);
    updateMap(urlIdMap, [url, ...link]);
  });

  return { urlIdMap, urls, links };
};

const makeGraph = (urlIdMap, urls, links) => {
  const edges = Array.from(new Array(urlIdMap.size), () => []);
  urls.forEach((url, index) => {
    const id = urlIdMap.get(url);
    edges[id] = links[index].map((link) => urlIdMap.get(link));
  });
  return edges;
};

const canSurf = (start, end, edges) => {
  const stack = [start];
  const visited = new Array(edges.length);

  while (stack.length > 0) {
    const cur = stack.pop();

    if (!visited[cur]) {
      visited[cur] = true;
      if (cur === end) return true;

      edges[cur].forEach((next) => {
        if (!visited[next]) stack.push(next);
      });
    }
  }
  return false;
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const input = require('fs').readFileSync(INPUT_FILE).toString().trim();

// process
const pages = input.split('</HTML>');
const urlPairs = pages.pop().trim().split('\n');
urlPairs.pop();

const { urlIdMap, urls, links } = makePageLinkInfo(pages);

const linkResult = [];
urls.forEach((fromUrl, index) => {
  links[index].forEach((toUrl) => {
    linkResult.push(`Link from ${fromUrl} to ${toUrl}\n`);
  });
});
const edges = makeGraph(urlIdMap, urls, links);

const surfResult = [];
for (let i = 0; i < urlPairs.length; i += 2) {
  const start = urlPairs[i];
  const end = urlPairs[i + 1];
  if (canSurf(urlIdMap.get(start), urlIdMap.get(end), edges)) {
    surfResult.push(`Can surf from ${start} to ${end}.\n`);
  } else {
    surfResult.push(`Can't surf from ${start} to ${end}.\n`);
  }
}

// output
const result = [];
result.push(linkResult.join(''));
result.push('\n');
result.push(surfResult.join(''));

console.log(result.join(''));

/*
수학을 멀리한 죄 달게 받아라

두 집합의 교집합을 두 집합의 부모로 하는 트리를 생각해보자
근데 교집합이 없을수도있잖아
일단 있다고 치면 '공통 부모'를 찾는 문제로 바뀜

나 그냥 안할래..
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...sets] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => new Set(line.split(' ').map(Number).slice(1)));

/*
노바 100초 오리진 360초
각 바인드마다 면역 90초

면역이라도 스킬 시전은 되는데 바인드는 안걸림
근데 면역쿨이 짧아서 그럴일은 없음
  -> 스킬쿨이 돌았으면 바인드면역은 무조건 풀려있음
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, novaTimes, originTimes] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const nova = {
  use: 0,
  count: 0,
  coolDown: 100,
};
const origin = { ...nova, coolDown: 360 };

const bind = (time, skill) => {
  if (skill.use <= time) {
    skill.count += 1;
    skill.use = time + skill.coolDown;
  }
};

novaTimes
  .sort((one, another) => one - another)
  .forEach((time) => {
    bind(time, nova);
  });

originTimes
  .sort((one, another) => one - another)
  .forEach((time) => {
    bind(time, origin);
  });

console.log(nova.count, origin.count);

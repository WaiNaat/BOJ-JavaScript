class Member {
  constructor(name, age, index) {
    this.name = name;
    this.age = age;
    this.index = index;
  }
}

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const members = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .slice(1)
  .map((line, index) => {
    const [age, name] = line.split(' ');
    return new Member(name, Number(age), index);
  });

members.sort((a, b) => {
  if (a.age !== b.age) return a.age - b.age;
  return a.index - b.index;
});

console.log(members.map((member) => `${member.age} ${member.name}`).join('\n'));

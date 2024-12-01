/*
위상정렬
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[componentCount], , ...requirements] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

class Component {
  constructor(name) {
    this.name = name;
    this.required = {};
    this.next = new Set();
    this.makeCount = 0;
  }
  setRequired(name, count) {
    if (!this.required[name]) {
      this.required[name] = 0;
    }
    this.required[name] += count;
  }
}

const components = Array.from({ length: componentCount + 1 }, (_, index) => new Component(index));
requirements.forEach(([target, required, count]) => {
  components[target].setRequired(required, count);
  components[required].next.add(target);
});
const base = components.filter(
  (component, index) => index > 0 && Object.keys(component.required).length === 0,
);
const q = {
  list: [],
  left: 0,
  length: 0,
  enqueue(val) {
    this.list.push(val);
    this.length += 1;
  },
  dequeue() {
    if (this.length === 0) return undefined;
    this.left += 1;
    this.length -= 1;
    return this.list[this.left - 1];
  },
};

components[componentCount].makeCount = 1;
q.enqueue(components[componentCount]);

while (q.length > 0) {
  const cur = q.dequeue();

  Object.entries(cur.required).forEach(([name, count]) => {
    components[name].makeCount += count * cur.makeCount;
    components[name].next.delete(cur.name);

    if (components[name].next.size === 0) {
      q.enqueue(components[name]);
    }
  });
}

console.log(base.map((component) => `${component.name} ${component.makeCount}`).join('\n'));

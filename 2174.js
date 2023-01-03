const EAST = [0, 1];
const WEST = [0, -1];
const NORTH = [-1, 0];
const SOUTH = [1, 0];
const DIRECTIONS = [NORTH, EAST, SOUTH, WEST];

class Robot {
  constructor(id, row, col, direction) {
    this.id = id;
    this.row = row;
    this.col = col;
    if (direction === 'E') this.direction = 1;
    else if (direction === 'W') this.direction = 3;
    else if (direction === 'N') this.direction = 0;
    else this.direction = 2;
  }

  turnLeft() {
    this.direction = (this.direction + 3) % 4;
  }

  turnRight() {
    this.direction = (this.direction + 1) % 4;
  }

  forward() {
    this.row += DIRECTIONS[this.direction][0];
    this.col += DIRECTIONS[this.direction][1];
  }
}

const initialize = (ROW, COL, robotPositions) => {
  const land = Array.from(new Array(ROW), () => new Array(COL));
  const robots = [undefined];
  robotPositions.forEach(([c, r, direction], index) => {
    const landRow = ROW - Number(r);
    const landCol = Number(c) - 1;
    const id = index + 1;
    const robot = new Robot(id, landRow, landCol, direction);
    land[landRow][landCol] = robot;
    robots.push(robot);
  });
  return { land, robots };
};

const commandLeft = (robot) => { robot.turnLeft(); };
const commandRight = (robot) => { robot.turnRight(); };
const commandForward = (ROW, COL, LAND, robot) => {
  const land = LAND;
  const prevRow = robot.row;
  const prevCol = robot.col;

  robot.forward();
  if (robot.row < 0 || robot.row >= ROW || robot.col < 0 || robot.col >= COL) {
    throw new Error(`Robot ${robot.id} crashes into the wall`);
  }
  if (land[robot.row][robot.col] !== undefined) {
    throw new Error(`Robot ${robot.id} crashes into robot ${land[robot.row][robot.col].id}`);
  }
  land[prevRow][prevCol] = undefined;
  land[robot.row][robot.col] = robot;
};

const execute = (ROW, COL, LAND, ROBOTS, id, command) => {
  if (command === 'L') commandLeft(ROBOTS[id]);
  else if (command === 'R') commandRight(ROBOTS[id]);
  else commandForward(ROW, COL, LAND, ROBOTS[id]);
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const input = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

const [COL, ROW] = input[0].split(' ').map(Number);
const [robotCount, commandCount] = input[1].split(' ').map(Number);
const robotPositions = input.slice(2, 2 + robotCount).map((line) => line.split(' '));
const commands = input.slice(2 + robotCount).map((line) => line.split(' '));

// process & output
const { land, robots } = initialize(ROW, COL, robotPositions);
try {
  commands.forEach(([id, command, count]) => {
    for (let c = 0; c < Number(count); c += 1) {
      execute(ROW, COL, land, robots, Number(id), command);
    }
  });
  console.log('OK');
} catch (error) {
  console.log(error.message);
}

/*
숫자가 적으니 무식하게 구현
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[, roomLimitInfo], ...players] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' '));

const roomLimit = Number(roomLimitInfo);
const rooms = [];

players.forEach(([levelString, id]) => {
  const level = Number(levelString);

  const availableRoom = rooms.find(
    (room) =>
      room.players.length < roomLimit && level >= room.level - 10 && level <= room.level + 10,
  );

  if (!availableRoom) rooms.push({ players: [[level, id]], level });
  else availableRoom.players.push([level, id]);
});

const sol = [];
rooms.forEach((room) => {
  sol.push(room.players.length === roomLimit ? 'Started!' : 'Waiting!');
  sol.push(
    room.players
      .sort((one, another) => (one[1] < another[1] ? -1 : 1))
      .map((player) => player.join(' '))
      .join('\n'),
  );
});

console.log(sol.join('\n'));

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[people, budget], ...inputs] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const hotels = []
inputs.forEach((value, index) => {
  if (index % 2 === 0) hotels.push({ price: value[0] });
  else hotels[hotels.length - 1].availableRooms = value;
});

const availableHotels = hotels.filter(
  (hotel) => hotel.availableRooms.some((rooms) => (rooms >= people)),
);

const price = Math.min(...availableHotels.map(({ price }) => price * people));

console.log(price <= budget ? price : 'stay home');

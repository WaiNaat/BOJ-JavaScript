const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const abbreviation = require('fs').readFileSync(INPUT_FILE).toString().trim();

const getFullSchoolName = (shortName) => {
  switch (shortName) {
    case 'NLCS': return 'North London Collegiate School';
    case 'BHA': return 'Branksome Hall Asia';
    case 'KIS': return 'Korea International School';
    case 'SJA': return 'St. Johnsbury Academy';
    default: return 'Invalid name';
  }
};

console.log(getFullSchoolName(abbreviation));

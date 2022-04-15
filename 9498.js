const inputFile = __dirname + "/input"; // "/dev/stdin";
const input = require("fs").readFileSync(inputFile).toString().trim();
const score = parseInt(input);

if (score >= 90)
    console.log('A');
else if (score >= 80)
    console.log('B');
else if (score >= 70)
    console.log('C');
else if (score >= 60)
    console.log('D');
else
    console.log('F');
const INPUT_FILE = process.platform === 'linux' ? 'dev/stdin' : './input';
let submittedStudents = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map(Number);

submittedStudents = new Set(submittedStudents);
for (let student = 1; student <= 30; student += 1) {
  if (!submittedStudents.has(student)) console.log(student);
}

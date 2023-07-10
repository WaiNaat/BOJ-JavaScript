/*
학년별로 각 반의 인원수를 셈
학생별로 같은 반인 학생의 수를 구함
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[studentCount], ...students] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

let maxCount = 0;
let maxStudent;

for (let student = 0; student < studentCount; student += 1) {
  const sameClassStudents = new Set();

  for (let grade = 0; grade < 5; grade += 1) {
    for (let otherStudent = 0; otherStudent < studentCount; otherStudent += 1) {
      if (students[student][grade] === students[otherStudent][grade]) {
        sameClassStudents.add(otherStudent);
      }
    }
  }

  if (sameClassStudents.size > maxCount) {
    maxCount = sameClassStudents.size;
    maxStudent = student + 1;
  }
}

console.log(maxStudent);

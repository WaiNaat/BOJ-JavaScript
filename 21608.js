/*
정렬 함수를 잘 짜는 문제
빈 칸들에 대해 1, 2, 3 조건들을 조사해서 정렬 후 학생 배치
*/

// input
const inputFile = process.platform === 'linux' ? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const N = Number(input[0]);
const student_order = [];
const like_info = new Map();
for (let i=1; i<input.length; i++)
{
    let [student, ... like] = input[i].trim().split(' ').map(Number);
    student_order.push(student);
    like_info.set(student, new Set(like));
}

// process
const classroom = Array.from(new Array(N), () => new Array(N));
const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];

for (let student of student_order)
{
    const like = like_info.get(student);

    // 빈칸 조사: [좋아하는 학생 수, 빈칸 수, 행번호, 열번호]
    const empty_seat = [];
    for (let r=0; r<N; r++)
    {
        for (let c=0; c<N; c++)
        {
            if (classroom[r][c] == undefined)
            {
                let empty_cnt = 0;
                let like_cnt = 0;

                for (let [dr, dc] of directions)
                {
                    let r2 = r + dr;
                    let c2 = c + dc;

                    if (0 > r2 || r2 >= N || 0 > c2 || c2 >= N)
                        continue;
                    
                    if (classroom[r2][c2] == undefined)
                        empty_cnt++;
                    else if (like.has(classroom[r2][c2]))
                        like_cnt++;
                }

                empty_seat.push([like_cnt, empty_cnt, r, c]);
            }
        }
    }

    // 정렬
    empty_seat.sort(function (a, b){
        if (a[0] != b[0])
            return b[0] - a[0];
        
        if (a[1] != b[1])
            return b[1] - a[1];
        
        if (a[2] != b[2])
            return a[2] - b[2];
        
        return a[3] - b[3];
    });

    // 학생 배치
    classroom[empty_seat[0][2]][empty_seat[0][3]] = student;
}

// 만족도 계산
const score_table = [0, 1, 10, 100, 1000];
let satisfied_score = 0;

for (let r=0; r<N; r++)
{
    for (let c=0; c<N; c++)
    {
        let cnt = 0;
        let like = like_info.get(classroom[r][c]);

        for (let [dr, dc] of directions)
        {
            let r2 = r + dr;
            let c2 = c + dc;

            if (0 > r2 || r2 >= N || 0 > c2 || c2 >= N)
                continue;
            
            if (like.has(classroom[r2][c2]))
                cnt++;
        }

        satisfied_score += score_table[cnt];
    }
}

// output
console.log(satisfied_score);
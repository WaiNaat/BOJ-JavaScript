/*
일단 적힌 대로 구현해보기

칸별로 존재하는 나무를 정렬하는 게 좋을까?
    입력으로 주어지는 나무의 위치는 서로 다르다는 조건 있음

봄에 땅 순회할 때 여름, 가을 같이 처리
    죽을 나무는 죽이고, 양분 따로 저장했다 여름에 한꺼번에 추가
    번식할 나무 위치 리스트 만들어서 저장, 가을에 이거 순회하면서 번식

배운 점: 클래스 많이쓰면 멋은 있는데 시간이 훨씬 많이 든다
*/

// 큐 대충 구현
class Queue
{
    constructor()
    {
        this.list = [];
        this.length = 0;
        this.startIdx = 0;
    }

    isEmpty()
    {
        return this.length === 0;
    }

    enqueue(age)
    {
        this.list.push(age);
        this.length++;
    }

    dequeue()
    {
        const del = this.list[this.startIdx];
        this.startIdx++;
        this.length--;
        return del;
    }
}

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [N, M, K] = input[0].trim().split(' ').map(Number);

const A = [];
for (let i=1; i<=N; i++)
    A.push(input[i].trim().split(' ').map(Number));

const land = Array.from(new Array(N), () => new Array(N));
for (let r=0; r<N; r++)
{
    for (let c=0; c<N; c++)
        land[r][c] = new Queue();
}

for (let i=N+1; i<N+1+M; i++)
{
    let [r, c, a] = input[i].trim().split(' ').map(Number);
    r--;
    c--;
    land[r][c].enqueue(a);
}

// process
// 땅 초기화
const nutrient = Array.from(new Array(N), () => new Array(N).fill(5));
const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

// 시뮬레이션 시작
let total_trees = M;
for (let year=0; year<K; year++)
{
    // 봄
    let propagates = [];

    for (let r=0; r<N; r++)
    {
        for (let c=0; c<N; c++)
        {
            // 각 칸의 나무들에 대해 성장 가능한지 조사
            let cnt = 0;
            let propagate_cnt = 0;
            let died = 0;
            for (let i = land[r][c].list.length - 1; 
                 i >=  land[r][c].startIdx && land[r][c].list[i] <= nutrient[r][c];
                 i--)
            {
                nutrient[r][c] -= land[r][c].list[i];
                land[r][c].list[i]++;
                cnt++;

                // 가을에 번식할 나무가 있는지 조사
                if (land[r][c].list[i] % 5 === 0)
                    propagate_cnt++;
            }

            // 성장 불가능한 나무가 있다면 큐에서 제거
            if (cnt < land[r][c].length)
            {
                while (land[r][c].length > cnt)
                {
                    let died_tree = land[r][c].dequeue();
                    died += Math.floor(died_tree / 2);
                    total_trees--;
                }
            }

            // 여름
            nutrient[r][c] += died;

            // 가을을 위한 값 저장
            if (propagate_cnt > 0)
                propagates.push([r, c, propagate_cnt]);

            // 겨울도 미리 처리
            nutrient[r][c] += A[r][c];
        }
    }

    // 가을
    for (let [r, c, propagate_cnt] of propagates)
    {
        for (let [dr, dc] of directions)
        {
            let r2 = r + dr;
            let c2 = c + dc;

            if (0 > r2 || r2 >= N || 0 > c2 || c2 >= N)
                continue;

            total_trees += propagate_cnt;
            for (let i=0; i<propagate_cnt; i++)
                land[r2][c2].enqueue(1);
        }
    }
}

// output
console.log(total_trees);
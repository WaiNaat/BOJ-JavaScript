// 시간 초과

/*
격자판 구현은 너무 오래걸림 >> 상어 찾는거때문에 그런듯?
상어들만 쓰는 방법?
key-value쌍으로 key를 좌표, value를 상어 정보로 하면 될듯?
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [row, col, M] = input[0].trim().split(' ').map(Number);
let shark = new Map();
for (let i=1; i<=M; i++)
{
    let [r, c, s, d, z] = input[i].trim().split(' ').map(Number);
    shark.set(r * 1000 + c, [s, d, z]);
}

// process
const directions = [undefined, [-1, 0], [1, 0], [0, 1], [0, -1]];
let sol = 0;

for (let king=1; king<=col; king++)
{
    // 상어 잡기
    for (let r=1; r<=row; r++)
    {
        let key = r * 1000 + king;
        if (shark.has(key))
        {
            sol += shark.get(key)[2];
            shark.delete(key);
            break;
        }
    }

    // 상어 이동
    const newShark = new Map();
    for (let key of shark.keys())
    {
        let r = Math.floor(key / 1000);
        let c = key % 1000;
        let [s, d, z] = shark.get(key);
        let [dr, dc] = directions[d];

        for (let i=0; i<s; i++)
        {
            if ((d == 1 && r == 1) || 
                (d == 2 && r == row) || 
                (d == 3 && c == col) || 
                (d == 4 && c == 1))
            {
                switch(d)
                {
                    case 1:
                        d = 2;
                        break;
                    case 2:
                        d = 1;
                        break;
                    case 3:
                        d = 4;
                        break;
                    case 4:
                        d = 3;
                        break;
                }
                [dr, dc] = directions[d];
            }

            r += dr;
            c += dc;                    
        }

        // 이동하려는 칸에 본인보다 큰 상어가 있으면 먹힘
        let key2 = r * 1000 + c;
        if (newShark.has(key2) && z < newShark.get(key2)[2])
            continue;
        else
            newShark.set(key2, [s, d, z]);
        
    }
    shark = newShark;
}

// output
console.log(sol);
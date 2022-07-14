/*
bfs 문제
*/

// 큐 구현
class Node
{
    constructor(row, col, distance)
    {
        this.row = row;
        this.col = col;
        this.distance = distance;
        this.next = null;
    }
}

class Queue
{
    constructor()
    {
        this.first = null;
        this.last = null;
        this.length = 0;
    }

    isEmpty()
    {
        return this.length === 0;
    }

    enqueue(row, col, distance)
    {
        let newNode = new Node(row, col, distance);
        if (this.isEmpty())
        {
            this.first = newNode;
            this.last = newNode;
        }
        else
        {
            this.last.next = newNode;
            this.last = newNode;
        }
        this.length++;
    }

    dequeue()
    {
        if (this.isEmpty()) return [-1, -1, -1];
        let ret = [this.first.row, this.first.col, this.first.distance];
        this.length--;
        if (this.isEmpty())
        {
            this.first = null;
            this.last = null;
        }
        else
            this.first = this.first.next;
        return ret;
    }
}

// constants
const FIND_PASSENGER = 1;
const GO_TO_DESTINATION = 2;

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [N, M, initial_fuel] = input[0].trim().split(' ').map(Number);
const area = Array.from(input.slice(1, 1 + N), x => x.trim().split(' ').map(Number));
let [r, c] = input[1 + N].trim().split(' ').map(Number);
r--;
c--;

// 손님 처리: 지도에 손님명 적고 배열에 손님 도착지 적음
for (let i=2+N; i<input.length; i++)
{
    let [sr, sc, dr, dc] = input[i].trim().split(' ').map(Number);
    area[sr - 1][sc - 1] = [dr - 1, dc - 1];
}

// process
let fuel = initial_fuel;
let cnt = 0;
let f;

while (cnt < M)
{
    [r, c, f] = bfs(FIND_PASSENGER, r, c);
    fuel -= f;
    if (fuel <= 0) break;
    let [pr, pc] = [r, c];

    [r, c, f] = bfs(GO_TO_DESTINATION, r, c);
    fuel -= f;
    if (fuel < 0) break;

    cnt++;
    fuel += f * 2;
    area[pr][pc] = 0;
}

// output
console.log(cnt == M? fuel : -1);

// functions
function bfs(type, r, c)
{
    const q = new Queue();
    const visited = Array.from(new Array(N), () => new Array(N));
    const check = type == FIND_PASSENGER? isPassenger : isDestination;
    const directions = [[-1, 0], [0, -1], [0, 1], [1, 0]];

    const passenger_list = [];
    let passenger_distance;

    const dest = type == GO_TO_DESTINATION? area[r][c] : undefined;

    q.enqueue(r, c, 0);

    while (!q.isEmpty())
    {
        let [r, c, d] = q.dequeue();

        if (check(dest, r, c))
        {
            if (type === FIND_PASSENGER)
            {
                if (passenger_list.length == 0 || passenger_distance == d)
                {
                    passenger_distance = d;
                    passenger_list.push([r, c]);
                }
                else
                    break;
            }
            else return [r, c, d];
        }
        
        if (visited[r][c]) continue;
        visited[r][c] = true;
        
        for (let [dr, dc] of directions)
        {
            let r2 = r + dr;
            let c2 = c + dc;

            if (0 > r2 || r2 >= N || 0 > c2 || c2 >= N)
                continue;
            
            if (area[r2][c2] !== 1 && !visited[r2][c2])
                q.enqueue(r2, c2, d + 1);
        }
    }

    if (passenger_list.length > 0)
    {
        passenger_list.sort(function (a, b){
            if (a[0] != b[0])
                return a[0] - b[0];
            else
                return a[1] - b[1];
        });
        return [... passenger_list[0], passenger_distance];
    }
    else return [-1, -1, Infinity];
}

function isPassenger(_, r, c)
{
    if (area[r][c] !== 1 && area[r][c] !== 0) return true;
    else return false;
}

function isDestination(dest, r, c)
{
    if (r == dest[0] && c == dest[1]) return true;
    else return false;
}
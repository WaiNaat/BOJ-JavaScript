/*
순수 구현 문제
6면에 대해서 시계 반시계 각각 구현하면 해결 가능

큐브 구현 세부사항:
    앞, 뒤, 왼, 오른쪽 면은 [0][0~2]이 위쪽 면과 닿아 있음
    아랫면은 윗면을 뒤집은 모양임 [0][0~2]이 앞쪽 면과 닿아 있음
*/
// 큐브 구현
class Cube
{
    constructor()
    {
        this.up = [
            ['w', 'w', 'w'],
            ['w', 'w', 'w'],
            ['w', 'w', 'w']
        ];
        this.down = [
            ['y', 'y', 'y'],
            ['y', 'y', 'y'],
            ['y', 'y', 'y']
        ];
        this.front = [
            ['r', 'r', 'r'],
            ['r', 'r', 'r'],
            ['r', 'r', 'r']
        ];
        this.back = [
            ['o', 'o', 'o'],
            ['o', 'o', 'o'],
            ['o', 'o', 'o']
        ];
        this.left = [
            ['g', 'g', 'g'],
            ['g', 'g', 'g'],
            ['g', 'g', 'g']
        ];
        this.right = [
            ['b', 'b', 'b'],
            ['b', 'b', 'b'],
            ['b', 'b', 'b']
        ];
    }

    getUp()
    {
        const ret = [];
        for (let line of this.up)
            ret.push(line.join(''));
        return ret.join('\n');
    }

    rotate(command)
    {
        switch(command)
        {
            case 'U+':
                this.__rotate_up_clockwise();
                break;
            case 'U-':
                this.__rotate_up_anticlockwise();
                break;
            case 'D+':
                this.__rotate_down_clockwise();
                break;
            case 'D-':
                this.__rotate_down_anticlockwise();
                break;
            case 'F+':
                this.__rotate_front_clockwise();
                break;
            case 'F-':
                this.__rotate_front_anticlockwise();
                break;
            case 'B+':
                this.__rotate_back_clockwise();
                break;
            case 'B-':
                this.__rotate_back_anticlockwise();
                break;
            case 'L+':
                this.__rotate_left_clockwise();
                break;
            case 'L-':
                this.__rotate_left_anticlockwise();
                break;
            case 'R+':
                this.__rotate_right_clockwise();
                break;
            case 'R-':
                this.__rotate_right_anticlockwise();
                break;
        }
    }

    __rotate_up_clockwise()
    {
        this.up = [
            [this.up[2][0], this.up[1][0], this.up[0][0]],
            [this.up[2][1], this.up[1][1], this.up[0][1]],
            [this.up[2][2], this.up[1][2], this.up[0][2]]
        ];
        
        [
            this.back[0][0], this.back[0][1], this.back[0][2],
            this.right[0][0], this.right[0][1], this.right[0][2],
            this.front[0][0], this.front[0][1], this.front[0][2],
            this.left[0][0], this.left[0][1], this.left[0][2]
        ] = [
            this.left[0][0], this.left[0][1], this.left[0][2],
            this.back[0][0], this.back[0][1], this.back[0][2],
            this.right[0][0], this.right[0][1], this.right[0][2],
            this.front[0][0], this.front[0][1], this.front[0][2]
        ];
    }

    __rotate_up_anticlockwise()
    {
        this.up = [
            [this.up[0][2], this.up[1][2], this.up[2][2]],
            [this.up[0][1], this.up[1][1], this.up[2][1]],
            [this.up[0][0], this.up[1][0], this.up[2][0]]
        ];

        [
            this.back[0][0], this.back[0][1], this.back[0][2],
            this.right[0][0], this.right[0][1], this.right[0][2],
            this.front[0][0], this.front[0][1], this.front[0][2],
            this.left[0][0], this.left[0][1], this.left[0][2]
        ] = [
            this.right[0][0], this.right[0][1], this.right[0][2],
            this.front[0][0], this.front[0][1], this.front[0][2],
            this.left[0][0], this.left[0][1], this.left[0][2],
            this.back[0][0], this.back[0][1], this.back[0][2]
        ];
    }

    __rotate_front_clockwise()
    {
        this.front = [
            [this.front[2][0], this.front[1][0], this.front[0][0]],
            [this.front[2][1], this.front[1][1], this.front[0][1]],
            [this.front[2][2], this.front[1][2], this.front[0][2]]
        ];        

        [
            this.up[2][0], this.up[2][1], this.up[2][2],
            this.right[0][0], this.right[1][0], this.right[2][0],
            this.down[0][2], this.down[0][1], this.down[0][0],
            this.left[2][2], this.left[1][2], this.left[0][2]
        ] = [
            this.left[2][2], this.left[1][2], this.left[0][2],
            this.up[2][0], this.up[2][1], this.up[2][2],
            this.right[0][0], this.right[1][0], this.right[2][0],
            this.down[0][2], this.down[0][1], this.down[0][0]
        ];
    }

    __rotate_front_anticlockwise()
    {
        this.front = [
            [this.front[0][2], this.front[1][2], this.front[2][2]],
            [this.front[0][1], this.front[1][1], this.front[2][1]],
            [this.front[0][0], this.front[1][0], this.front[2][0]]
        ];

        [
            this.up[2][0], this.up[2][1], this.up[2][2],
            this.right[0][0], this.right[1][0], this.right[2][0],
            this.down[0][2], this.down[0][1], this.down[0][0],
            this.left[2][2], this.left[1][2], this.left[0][2]
        ] = [
            this.right[0][0], this.right[1][0], this.right[2][0],
            this.down[0][2], this.down[0][1], this.down[0][0],
            this.left[2][2], this.left[1][2], this.left[0][2],
            this.up[2][0], this.up[2][1], this.up[2][2]
        ];        
    }

    __rotate_left_clockwise()
    {
        this.left = [
            [this.left[2][0], this.left[1][0], this.left[0][0]],
            [this.left[2][1], this.left[1][1], this.left[0][1]],
            [this.left[2][2], this.left[1][2], this.left[0][2]]
        ];

        [
            this.up[0][0], this.up[1][0], this.up[2][0],
            this.front[0][0], this.front[1][0], this.front[2][0],
            this.down[0][0], this.down[1][0], this.down[2][0],
            this.back[2][2], this.back[1][2], this.back[0][2]      
        ] = [
            this.back[2][2], this.back[1][2], this.back[0][2],
            this.up[0][0], this.up[1][0], this.up[2][0],
            this.front[0][0], this.front[1][0], this.front[2][0],
            this.down[0][0], this.down[1][0], this.down[2][0]
        ]
    }

    __rotate_left_anticlockwise()
    {
        this.left = [
            [this.left[0][2], this.left[1][2], this.left[2][2]],
            [this.left[0][1], this.left[1][1], this.left[2][1]],
            [this.left[0][0], this.left[1][0], this.left[2][0]]
        ];

        [
            this.up[0][0], this.up[1][0], this.up[2][0],
            this.front[0][0], this.front[1][0], this.front[2][0],
            this.down[0][0], this.down[1][0], this.down[2][0],
            this.back[2][2], this.back[1][2], this.back[0][2]
        ] = [
            this.front[0][0], this.front[1][0], this.front[2][0],
            this.down[0][0], this.down[1][0], this.down[2][0],
            this.back[2][2], this.back[1][2], this.back[0][2],
            this.up[0][0], this.up[1][0], this.up[2][0]
        ];
    }

    __rotate_right_clockwise()
    {
        this.right = [
            [this.right[2][0], this.right[1][0], this.right[0][0]],
            [this.right[2][1], this.right[1][1], this.right[0][1]],
            [this.right[2][2], this.right[1][2], this.right[0][2]]
        ];

        [
            this.up[0][2], this.up[1][2], this.up[2][2],
            this.back[2][0], this.back[1][0], this.back[0][0],
            this.down[0][2], this.down[1][2], this.down[2][2],
            this.front[0][2], this.front[1][2], this.front[2][2]
        ] = [
            this.front[0][2], this.front[1][2], this.front[2][2],
            this.up[0][2], this.up[1][2], this.up[2][2],
            this.back[2][0], this.back[1][0], this.back[0][0],
            this.down[0][2], this.down[1][2], this.down[2][2]
        ];
    }

    __rotate_right_anticlockwise()
    {
        this.right = [
            [this.right[0][2], this.right[1][2], this.right[2][2]],
            [this.right[0][1], this.right[1][1], this.right[2][1]],
            [this.right[0][0], this.right[1][0], this.right[2][0]]
        ];
        

        [
            this.up[0][2], this.up[1][2], this.up[2][2],
            this.back[2][0], this.back[1][0], this.back[0][0],
            this.down[0][2], this.down[1][2], this.down[2][2],
            this.front[0][2], this.front[1][2], this.front[2][2]
        ] = [
            this.back[2][0], this.back[1][0], this.back[0][0],
            this.down[0][2], this.down[1][2], this.down[2][2],
            this.front[0][2], this.front[1][2], this.front[2][2],
            this.up[0][2], this.up[1][2], this.up[2][2]
        ];
    }

    __rotate_back_clockwise()
    {
        this.back = [
            [this.back[2][0], this.back[1][0], this.back[0][0]],
            [this.back[2][1], this.back[1][1], this.back[0][1]],
            [this.back[2][2], this.back[1][2], this.back[0][2]]
        ];

        [
            this.up[0][0], this.up[0][1], this.up[0][2],
            this.left[2][0], this.left[1][0], this.left[0][0],
            this.down[2][2], this.down[2][1], this.down[2][0],
            this.right[0][2], this.right[1][2], this.right[2][2]
        ] = [
            this.right[0][2], this.right[1][2], this.right[2][2],
            this.up[0][0], this.up[0][1], this.up[0][2],
            this.left[2][0], this.left[1][0], this.left[0][0],
            this.down[2][2], this.down[2][1], this.down[2][0]
        ];
    }

    __rotate_back_anticlockwise()
    {
        this.back = [
            [this.back[0][2], this.back[1][2], this.back[2][2]],
            [this.back[0][1], this.back[1][1], this.back[2][1]],
            [this.back[0][0], this.back[1][0], this.back[2][0]]
        ];

        [
            this.up[0][0], this.up[0][1], this.up[0][2],
            this.left[2][0], this.left[1][0], this.left[0][0],
            this.down[2][2], this.down[2][1], this.down[2][0],
            this.right[0][2], this.right[1][2], this.right[2][2]
        ] = [
            this.left[2][0], this.left[1][0], this.left[0][0],
            this.down[2][2], this.down[2][1], this.down[2][0],
            this.right[0][2], this.right[1][2], this.right[2][2],
            this.up[0][0], this.up[0][1], this.up[0][2]
        ];        
    }

    __rotate_down_clockwise()
    {
        this.down = [
            [this.down[2][0], this.down[1][0], this.down[0][0]],
            [this.down[2][1], this.down[1][1], this.down[0][1]],
            [this.down[2][2], this.down[1][2], this.down[0][2]]
        ];

        [
            this.front[2][0], this.front[2][1], this.front[2][2],
            this.right[2][0], this.right[2][1], this.right[2][2],
            this.back[2][0], this.back[2][1], this.back[2][2],
            this.left[2][0], this.left[2][1], this.left[2][2]
        ] = [
            this.left[2][0], this.left[2][1], this.left[2][2],
            this.front[2][0], this.front[2][1], this.front[2][2],
            this.right[2][0], this.right[2][1], this.right[2][2],
            this.back[2][0], this.back[2][1], this.back[2][2]
        ];
    }

    __rotate_down_anticlockwise()
    {
        this.down = [
            [this.down[0][2], this.down[1][2], this.down[2][2]],
            [this.down[0][1], this.down[1][1], this.down[2][1]],
            [this.down[0][0], this.down[1][0], this.down[2][0]]
        ];

        [
            this.front[2][0], this.front[2][1], this.front[2][2],
            this.right[2][0], this.right[2][1], this.right[2][2],
            this.back[2][0], this.back[2][1], this.back[2][2],
            this.left[2][0], this.left[2][1], this.left[2][2]
        ] = [
            this.right[2][0], this.right[2][1], this.right[2][2],
            this.back[2][0], this.back[2][1], this.back[2][2],
            this.left[2][0], this.left[2][1], this.left[2][2],
            this.front[2][0], this.front[2][1], this.front[2][2]
        ];
    }
}

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');
const T = Number(input[0]);

// process
const sol = [];
for (let i=1; i<1+2*T; i+=2)
{
    // 큐브 회전 관련 정보 추출
    const n = Number(input[i]);
    const commands = input[i + 1].trim().split(' ');

    // 큐브 생성
    const cube = new Cube();

    // 회전
    for (let cmd of commands)
        cube.rotate(cmd);

    // 정답 저장
    sol.push(cube.getUp());
}

// output
console.log(sol.join('\n'));
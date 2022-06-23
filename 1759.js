/*
알파벳 오름차순으로 정렬
백트래킹으로 암호 하나씩 늘려가면 됨
다음 글자는 무조건 본인 뒤쪽에 있는 애들로, 본인과 가까운 순서대로 뽑음
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
let [L, C, ... chars] = require('fs').readFileSync(inputFile).toString().trim().split(/\s/);
L = Number(L);
C = Number(C);

// process
const sol = [];
const password = [];
const vowels = new Set(['a', 'e', 'i', 'o', 'u']);

chars.sort();
find_password(0, 0, 0, 0);

// output
console.log(sol.join('\n'));

// function
function find_password(depth, cur_idx, consonant_cnt, vowel_cnt)
{
    // base case
    if (depth === L)
    {
        if (consonant_cnt >= 2 && vowel_cnt >= 1)
            sol.push(password.join(''));
        return;
    }

    // recursive step
    for (let i=cur_idx; i<C; i++)
    {
        password.push(chars[i]);
        if (vowels.has(chars[i]))
            find_password(depth + 1, i + 1, consonant_cnt, vowel_cnt + 1);
        else
            find_password(depth + 1, i + 1, consonant_cnt + 1, vowel_cnt);
        password.pop();
    }
}
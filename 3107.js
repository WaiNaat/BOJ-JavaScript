/*
콜론 기준으로 분리
그룹이 8개가 안되면 8개로 만듦
생략된 0 복원
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const ipv6 = require('fs').readFileSync(INPUT_FILE).toString().trim();

const groupedIPv6 = ipv6.split(':');

const omittedIndexStart = groupedIPv6.findIndex((group) => group === '');
const omittedIndexEnd = groupedIPv6[omittedIndexStart + 1] === '' ? omittedIndexStart + 2 : omittedIndexStart + 1;
const omiitedGroupCount = 8 - (omittedIndexStart + (groupedIPv6.length - omittedIndexEnd));

const colonRestoredIPv6 = omittedIndexStart === -1
  ? groupedIPv6
  : [
    ...groupedIPv6.slice(0, omittedIndexStart),
    ...new Array(omiitedGroupCount).fill('0000'),
    ...groupedIPv6.slice(omittedIndexEnd),
  ];

const zeroRestoredIPv6 = colonRestoredIPv6.map((group) => '0'.repeat(4 - group.length) + group);

console.log(zeroRestoredIPv6.join(':'));

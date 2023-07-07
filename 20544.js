/*
최대 2개의 인접한 선인장을 뛰어 넘을 수 있으며
-> 두 단계 이전까지 볼 수 있어야 함
인접한 두 선인장의 높이의 합이 4 이상이면 뛰어넘을 수 없다.
-> 이건 쉬움
높이가 2인 선인장이 적어도 하나는 등장해야 한다.
-> 높이가 2인 선인장이 안 등장하는 경우만 따로 계산함

max(N)=1000에 2초인데 일단 그냥 ㄱ

opt(i, 지금높이, 이전높이) :=
  i번 구간의 높이와 i-1번 구간의 높이가 주어졌을 때
  도현씨가 깰 수 있는 맵의 가짓수

opt(i, 0, 0) = sum(opt(i-1, 0, 0|1|2))
opt(i, 0, 1) = sum(opt(i-1, 1, 0|1|2))
opt(i, 0, 2) = sum(opt(i-1, 2, 0|1|2))
opt(i, 1, 0) = sum(opt(i-1, 0, 0|1|2))
opt(i, 1, 1) = opt(i-1, 1, 0)
opt(i, 1, 2) = opt(i-1, 2, 0)
opt(i, 2, 0) = sum(opt(i-1, 0, 0|1|2))
opt(i, 2, 1) = opt(i-1, 1, 0)
opt(i, 2, 2) = 0

opt(i, ?, ?) 계산에 opt(i-1, ?, ?)만 필요하므로 이중배열로 가능할듯
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const mapLength = Number(require('fs').readFileSync(INPUT_FILE).toString());

const DIVISOR = 1_000_000_007;

const getArraySum = (array) => array.reduce((prev, cur) => prev + cur, 0);

const getTwoDimArraySum = (array) => (
  array.reduce((prevSum, row) => prevSum + row.reduce((prev, cur) => prev + cur, 0), 0)
);

const getNextState = (state, maxHeight) => {
  const nextState = Array.from(new Array(maxHeight + 1), () => new Array(maxHeight + 1).fill(0));

  nextState[0][0] = getArraySum(state[0]) % DIVISOR;
  nextState[0][1] = getArraySum(state[1]) % DIVISOR;

  nextState[1][0] = nextState[0][0];
  nextState[1][1] = state[1][0];

  if (maxHeight === 2) {
    nextState[0][2] = getArraySum(state[2]);

    nextState[1][2] = state[2][0];

    nextState[2][0] = nextState[0][0];
    nextState[2][1] = state[1][0];
  }

  return nextState;
};

let allState = [
  [1, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let onlyHeightOneState = [
  [1, 0],
  [0, 0],
];

for (let i = 1; i < mapLength; i += 1) {
  allState = getNextState(allState, 2);
  onlyHeightOneState = getNextState(onlyHeightOneState, 1);
}

const allCasesCount = getTwoDimArraySum(allState) % DIVISOR;
const onlyHeightOneCasesCount = getTwoDimArraySum(onlyHeightOneState) % DIVISOR;

console.log((allCasesCount - onlyHeightOneCasesCount + DIVISOR) % DIVISOR);

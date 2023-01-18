/*
1. 부품 대여장으로부터 정보를 추출하는 기능
2. 누가 무엇을 언제 빌렸는지 저장하는 기능
3. 대여시간과 반납시간으로 벌금 계산하는 기능

중복대여 체크가 필요한가?
  아닐거같음
*/
class ChargeCalculator {
  constructor(rentalTime, lateCharge) {
    this.rentalTime = rentalTime;
    this.lateCharge = lateCharge;
    this.rentalRecord = new Map();
    this.lateChargeRecord = {};
  }

  record(name, item, time) {
    if (!this.rentalRecord.has(`${name} ${item}`)) this.rent(name, item, time);
    else this.return(name, item, time);
  }

  rent(name, item, time) {
    this.rentalRecord.set(`${name} ${item}`, time);
  }

  return(name, item, time) {
    const rentTime = time - this.rentalRecord.get(`${name} ${item}`) - this.rentalTime;
    if (rentTime > 0) {
      if (!Object.prototype.hasOwnProperty.call(this.lateChargeRecord, name)) {
        this.lateChargeRecord[name] = 0;
      }
      this.lateChargeRecord[name] += this.lateCharge * (rentTime / (60 * 1000));
    }
    this.rentalRecord.delete(`${name} ${item}`);
  }

  getLateCharges() {
    const names = Object.keys(this.lateChargeRecord);
    const result = [];
    names.sort();
    names.forEach((name) => { result.push([name, this.lateChargeRecord[name]]); });
    return result;
  }
}

const infoFormat = /\d+ (\d\d\d)\/(\d\d):(\d\d) (\d+)/g;
const recordFormat = /(\d\d\d\d)-(\d\d)-(\d\d) (\d\d):(\d\d) ([a-z]+) ([a-z0-9]+)/g;

const parseRentalTimeAndLateCharge = (info) => {
  const match = [...info.matchAll(infoFormat)][0];
  const [day, hour, minute, lateCharge] = match.slice(1).map(Number);
  let rentalTime = minute * 60 + hour * 3600 + day * 24 * 3600;
  rentalTime *= 1000;
  return { rentalTime, lateCharge };
};

const parseRecord = (record) => {
  const match = [...record.matchAll(recordFormat)][0];
  const [year, month, day, hour, minute, item, name] = match.slice(1);
  const time = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
  return { name, item, time };
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [info, ...records] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

// process
const { rentalTime, lateCharge } = parseRentalTimeAndLateCharge(info);
const calculator = new ChargeCalculator(rentalTime, lateCharge);
records.forEach((record) => {
  const { name, item, time } = parseRecord(record);
  calculator.record(name, item, time);
});

// output
let result = calculator.getLateCharges();
result = result.map((chargeInfo) => chargeInfo.join(' '));
console.log(result.length > 0 ? result.join('\n') : -1);

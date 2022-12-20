const leadingzero = require('leadingzero');

module.exports = {
  lowercase(s) {
    if (typeof s === 'string') {
      return s.toLowerCase();
    }

    return s || '';
  },
  leadingZeros(num, len) {
    // get leading zeroes needed from len
    // return num with that amount of leading0s

    const longestNum = len.toString().length;
    let leadingNum = longestNum;

    if (longestNum === 1) {
      leadingNum = 2;
    }

    return leadingzero(num, leadingNum) || '';
  },
};

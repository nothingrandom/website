module.exports = {
  lowercase(s) {
    if (typeof s === 'string') {
      return s.toLowerCase();
    }

    return s || '';
  },
};

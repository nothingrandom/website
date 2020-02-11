const { DateTime } = require('luxon');

module.exports = {
  readableDate(date) {
    return DateTime.fromJSDate(date).toFormat('dd LLLL yyyy');
  },
  currentYear() {
    return DateTime.local().toFormat('yyyy');
  },
  limitTo(input, limit) {
    if (typeof limit !== 'number') {
      return input;
    }

    if (typeof input === 'string') {
      if (limit >= 0) {
        return input.substring(0, limit);
      }
      return input.substr(limit);
    }

    if (Array.isArray(input)) {
      limit = Math.min(limit, input.length);

      if (limit >= 0) {
        return input.splice(0, limit);
      }

      return input.splice(input.length + limit, input.length);
    }
    return input;
  },
  logIt(i) {
    console.log(i);
    return i;
  },
  isIngredientsList(i) {
    console.log(i);
    console.log(typeof i);
    if (typeof i === 'object') {
      return true;
    }

    return false;
  },
};

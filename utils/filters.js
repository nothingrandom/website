const { DateTime } = require('luxon');

module.exports = {
  readableDate(date) {
    return DateTime.fromJSDate(date).toFormat('dd LLLL yyyy');
  },
  currentYear() {
    return DateTime.local().toFormat('yyyy');
  },
};

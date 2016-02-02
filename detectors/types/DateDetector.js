var DateTime = require('./DateTimeDetector');

function DateDetector(rawRowData) {
  if (DateTime(rawRowData)) return false;
  return (rawRowData.Type.indexOf('date') > -1);
}

module.exports = DateDetector;

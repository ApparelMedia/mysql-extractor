var Timestamp = require('./TimestampDetector');
var DateTime = require('./DateTimeDetector');

function TimeDetector(rawRowData) {
    if (Timestamp(rawRowData)) return false;
    if (DateTime(rawRowData)) return false;
    return (rawRowData.Type.indexOf('time') > -1);
}

module.exports = TimeDetector;

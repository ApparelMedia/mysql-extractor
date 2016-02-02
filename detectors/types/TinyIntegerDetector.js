var Boolean = require('./BooleanDetector');

function TinyIntegerDetector(rawRowData) {
    if (Boolean(rawRowData)) return false;
    return (rawRowData.Type.indexOf('tinyint') > -1);
}

module.exports = TinyIntegerDetector;

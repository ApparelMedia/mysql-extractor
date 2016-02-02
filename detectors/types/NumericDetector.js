var TinyInt = require('./TinyIntegerDetector');
var SmallInt = require('./SmallIntegerDetector');
var MediumInt = require('./MediumIntegerDetector');
var BigInt = require('./BigIntegerDetector');
var Integer = require('./IntegerDetector');

function NumericDetector(rawRowData) {
    if (TinyInt(rawRowData)) return true;
    if (SmallInt(rawRowData)) return true;
    if (MediumInt(rawRowData)) return true;
    if (BigInt(rawRowData)) return true;
    if (Integer(rawRowData)) return true;
    return false;
}

module.exports = NumericDetector;

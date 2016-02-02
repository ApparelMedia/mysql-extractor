var Boolean = require('./BooleanDetector');
var TinyInt = require('./TinyIntegerDetector');
var SmallInt = require('./SmallIntegerDetector');
var MediumInt = require('./MediumIntegerDetector');
var BigInt = require('./BigIntegerDetector');

function IntegerDetector(rawRowData) {
  if (Boolean(rawRowData)) return false;
  if (TinyInt(rawRowData)) return false;
  if (SmallInt(rawRowData)) return false;
  if (MediumInt(rawRowData)) return false;
  if (BigInt(rawRowData)) return false;
  return (rawRowData.Type.indexOf('int') > -1);
}

module.exports = IntegerDetector;

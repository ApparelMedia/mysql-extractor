function BigIntegerDetector(rawRowData) {
  return (rawRowData.Type.indexOf('bigint') > -1);
}

module.exports = BigIntegerDetector;

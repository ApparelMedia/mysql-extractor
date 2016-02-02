function DecimalDetector(rawRowData) {
  return (rawRowData.Type.indexOf('decimal') > -1);
}

module.exports = DecimalDetector;

function DateTimeDetector(rawRowData) {
  return (rawRowData.Type.indexOf('datetime') > -1);
}

module.exports = DateTimeDetector;

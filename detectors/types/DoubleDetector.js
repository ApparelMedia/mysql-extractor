function DoubleDetector(rawRowData) {
  return (rawRowData.Type.indexOf('double') > -1);
}

module.exports = DoubleDetector;

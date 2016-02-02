function BooleanDetector(rawRowData) {
  return (rawRowData.Type.indexOf('tinyint(1) unsigned') > -1);
}

module.exports = BooleanDetector;

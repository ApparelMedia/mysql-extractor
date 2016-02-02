function StringDetector(rawRowData) {
  return (rawRowData.Type.indexOf('varchar') > -1) || (rawRowData.Type.indexOf('varbinary') > -1);
}

module.exports = StringDetector;

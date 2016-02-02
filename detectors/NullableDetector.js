function NullableDetector(rawRowData) {
  return (rawRowData["Null"] === 'YES');
}

module.exports = NullableDetector;

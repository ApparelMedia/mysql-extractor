function GeometryDetector(rawRowData) {
  return (rawRowData.Type.indexOf('geometry') > -1);
}

module.exports = GeometryDetector;

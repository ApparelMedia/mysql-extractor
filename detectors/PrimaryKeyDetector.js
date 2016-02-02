function PrimaryKeyDetector(rawRowData) {
  return (rawRowData.Key === 'PRI');
}

module.exports = PrimaryKeyDetector;

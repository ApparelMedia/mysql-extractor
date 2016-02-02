function LongTextDetector(rawRowData) {
    return (rawRowData.Type.indexOf('longtext') > -1);
}

module.exports = LongTextDetector;

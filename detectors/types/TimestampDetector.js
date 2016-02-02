function TimestampDetector(rawRowData) {
    return (rawRowData.Type.indexOf('timestamp') > -1);
}

module.exports = TimestampDetector;

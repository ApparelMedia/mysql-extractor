function FloatDetector(rawRowData) {
    return (rawRowData.Type.indexOf('float') > -1);
}

module.exports = FloatDetector;

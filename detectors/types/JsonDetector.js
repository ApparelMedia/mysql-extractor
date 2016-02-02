function JsonDetector(rawRowData) {
    return (rawRowData.Type.indexOf('json') > -1);
}

module.exports = JsonDetector;

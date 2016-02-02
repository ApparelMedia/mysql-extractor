function MediumTextDetector(rawRowData) {
    return (rawRowData.Type.indexOf('mediumtext') > -1);
}

module.exports = MediumTextDetector;

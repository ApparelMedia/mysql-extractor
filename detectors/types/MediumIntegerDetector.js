function MediumIntegerDetector(rawRowData) {
    return (rawRowData.Type.indexOf('mediumint') > -1);
}

module.exports = MediumIntegerDetector;

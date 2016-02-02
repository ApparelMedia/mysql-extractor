
function SmallIntegerDetector(rawRowData) {
    return (rawRowData.Type.indexOf('smallint') > -1);
}

module.exports = SmallIntegerDetector;

function EnumDetector(rawRowData) {
    return (rawRowData.Type.indexOf('enum') > -1);
}

module.exports = EnumDetector;

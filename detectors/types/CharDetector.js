var String = require('./StringDetector');

function CharDetector(rawRowData) {
    if (String(rawRowData)) return false;
    return (rawRowData.Type.indexOf('char') > -1);
}

module.exports = CharDetector;

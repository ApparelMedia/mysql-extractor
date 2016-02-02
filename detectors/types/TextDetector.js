var MediumText = require('./MediumTextDetector');
var LongText = require('./LongTextDetector');

function TextDetector(rawRowData) {
  if (MediumText(rawRowData)) return false;
  if (LongText(rawRowData)) return false;
  return (rawRowData.Type.indexOf('text') > -1);
}

module.exports = TextDetector;

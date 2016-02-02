'use strict';

let BooleanDetector = require('./types/BooleanDetector');

function UnsignedDetector(rawRowData) {
  let output = false;
  if (BooleanDetector(rawRowData)) return false;
  return (rawRowData.Type.indexOf('unsigned') > -1);
}

module.exports = UnsignedDetector;

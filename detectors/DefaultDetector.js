'use strict';

let BooleanDetector = require('./types/BooleanDetector');

function booleanDefault (rawRowData) {
  return (rawRowData.Default == '1');
}

function DefaultDetector(rawRowData) {
  if (rawRowData.Default === null) return null;
  if (BooleanDetector(rawRowData)) return booleanDefault(rawRowData);
  return +(rawRowData.Default);
}

module.exports = DefaultDetector;

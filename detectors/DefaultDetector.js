'use strict';

let BooleanDetector = require('./types/BooleanDetector');
let Numeric = require('./types/NumericDetector');

function booleanDefault (rawRowData) {
  return (rawRowData.Default == '1');
}

function DefaultDetector(rawRowData) {
  if (typeof rawRowData.Default === 'undefined') return undefined;
  if (rawRowData.Default === null) return null;
  if (BooleanDetector(rawRowData)) return booleanDefault(rawRowData);
  if (Numeric(rawRowData)) return +(rawRowData.Default);
  return rawRowData.Default;
}

module.exports = DefaultDetector;

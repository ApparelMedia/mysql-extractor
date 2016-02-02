'use strict';

let BooleanDetector = require('./types/BooleanDetector');
let DecimalDetector = require('./types/DecimalDetector');
let FloatDetector = require('./types/FloatDetector');
let DoubleDetector = require('./types/DoubleDetector');

function processDecimalConstraints(segment) {
  let segArr = segment.split(',');
  let precision = +segArr[0];
  let scale = +segArr[1];
  return {precision, scale};
}

function ConstraintsDetector(rawRowData) {
  if (BooleanDetector(rawRowData)) return undefined;
  let regEx = /\((.*)\)/;
  let found = rawRowData.Type.match(regEx);
  if (! found) return undefined;
  if (DecimalDetector(rawRowData) || FloatDetector(rawRowData) || DoubleDetector(rawRowData))
    return processDecimalConstraints(found[1]);
  let maximum = +found[1];
  return {maximum};
}

module.exports = ConstraintsDetector;

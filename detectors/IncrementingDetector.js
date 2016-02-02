'use strict';

function IncrementingDetector(rawRowData) {
  return rawRowData.Extra.indexOf('auto_increment') > -1;
}

module.exports = IncrementingDetector;

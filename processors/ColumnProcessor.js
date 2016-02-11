"use strict";
/*
  {
    "name": "id",
    "type": "integer",
    "incrementing": true,
    "constraints": {

    },
    "nullable": false,
  }
*/
let BigIntegerDetector = require('../detectors/types/BigIntegerDetector');
let BooleanDetector = require('../detectors/types/BooleanDetector');
let CharDetector = require('../detectors/types/CharDetector');
let DateDetector = require('../detectors/types/DateDetector');
let DateTimeDetector = require('../detectors/types/DateTimeDetector');
let DecimalDetector = require('../detectors/types/DecimalDetector');
let DoubleDetector = require('../detectors/types/DoubleDetector');
let EnumDetector = require('../detectors/types/EnumDetector');
let FloatDetector = require('../detectors/types/FloatDetector');
let GeometryDetector = require('../detectors/types/GeometryDetector');
let IntegerDetector = require('../detectors/types/IntegerDetector');
let JsonDetector = require('../detectors/types/JsonDetector');
let LongTextDetector = require('../detectors/types/LongTextDetector');
let MediumIntegerDetector = require('../detectors/types/MediumIntegerDetector');
let MediumTextDetector = require('../detectors/types/MediumTextDetector');
let SmallIntegerDetector = require('../detectors/types/SmallIntegerDetector');
let StringDetector = require('../detectors/types/StringDetector');
let TextDetector = require('../detectors/types/TextDetector');
let TimeDetector = require('../detectors/types/TimeDetector');
let TimestampDetector = require('../detectors/types/TimestampDetector');
let TinyIntegerDetector = require('../detectors/types/TinyIntegerDetector');

let NullableDetector = require('../detectors/NullableDetector');
let PrimaryKeyDetector = require('../detectors/PrimaryKeyDetector');
let UnsignedDetector = require('../detectors/UnsignedDetector');
let IncrementingDetector = require('../detectors/IncrementingDetector');
let DefaultDetector = require('../detectors/DefaultDetector');
let ConstraintsDetector = require('../detectors/ConstraintsDetector');

var typeDetectors = [
  {name: "bigint", detector: BigIntegerDetector},
  {name: "boolean", detector: BooleanDetector},
  {name: "char", detector: CharDetector},
  {name: "date", detector: DateDetector},
  {name: "datetime", detector: DateTimeDetector},
  {name: "decimal", detector: DecimalDetector},
  {name: "double", detector: DoubleDetector},
  {name: "enum", detector: EnumDetector},
  {name: "float", detector: FloatDetector},
  {name: "geometry", detector: GeometryDetector},
  {name: "integer", detector: IntegerDetector},
  {name: "json", detector: JsonDetector},
  {name: "longtext", detector: LongTextDetector},
  {name: "mediumint", detector: MediumIntegerDetector},
  {name: "smallint", detector: SmallIntegerDetector},
  {name: "string", detector: StringDetector},
  {name: "text", detector: TextDetector},
  {name: "time", detector: TimeDetector},
  {name: "timestamp", detector: TimestampDetector},
  {name: "tinyint", detector: TinyIntegerDetector}
];

function getRowType(rowData) {
  var typeArray = typeDetectors.filter(function (detectorObj) {
    return detectorObj.detector(rowData);
  });
  if (typeArray.length > 1) {
    console.log(rowData.Type);
  }
  return typeArray[0].name;
}

class ColumnProcessor  {
  constructor(columnInfoArray) {
    this.raw = columnInfoArray[0];
  }

  getArray() {
    return this.raw.map(function (rowData) {
      let name = rowData.Field;
      let type = getRowType(rowData);
      let nullable = NullableDetector(rowData);
      let primaryKey = PrimaryKeyDetector(rowData);
      let unsigned = UnsignedDetector(rowData);
      let incrementing = IncrementingDetector(rowData);
      let defaultValue = DefaultDetector(rowData);
      let constraints = ConstraintsDetector(rowData);
      let rawType = rowData.Type;
      return {name, type, nullable, primaryKey, unsigned, incrementing, defaultValue, constraints, rawType};
    });
  }
}

module.exports = ColumnProcessor;

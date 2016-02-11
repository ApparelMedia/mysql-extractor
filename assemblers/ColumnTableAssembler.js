"use strict"

let ColumnProcessor = require('../processors/ColumnProcessor');
/*
{
  name: "tbl_users",
  columns: [
    ...columns
  ]
}

*/
class ColumnTableAssembler {
  constructor(tableName, rowDataArray) {
    this.name = tableName;
    this.processor = new ColumnProcessor(rowDataArray);
  }
  getName() {
    return this.name;
  }
  getTableObj() {
    let name = this.getName();
    let columns = this.processor.getArray();
    if (columns.length == 0) return undefined;
    return {name, columns};
  }
}

module.exports = ColumnTableAssembler;

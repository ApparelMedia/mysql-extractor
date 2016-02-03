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
  constructor(tableName, rowData) {
    this.name = tableName;
    this.processor = new ColumnProcessor(rowData);
  }
  getName() {
    return this.name;
  }
  getTableObj() {
    let name = this.getName();
    let columns = this.processor.getArray();
    return {name, columns};
  }
}

module.exports = ColumnTableAssembler;

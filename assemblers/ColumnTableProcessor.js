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
class TableProcessor {
  constructor(tableName, rowData) {
    this.name = tableName;
    this.processor = new ColumnProcessor(rowData);
  }
  getName() {
    return this.name;
  }
  getTableObj() {
    let name = this.getName();
    let columns = this.processor.getColumnsArray();
    return {name, columns};
  }
}

module.exports = TableProcessor;

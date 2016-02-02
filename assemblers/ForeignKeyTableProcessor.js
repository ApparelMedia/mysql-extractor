"use strict"

let ForeignKeyProcessor = require('../processors/ForeignKeyProcessor');
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
        this.foreignKeyProcessor = new ForeignKeyProcessor(rowData);
    }
    getName() {
        return this.name;
    }
    getTableObj() {
        let name = this.getName();
        let foreignKeys = this.foreignKeyProcessor.getKeysArray();
        return {name, foreignKeys};
    }
}

module.exports = TableProcessor;

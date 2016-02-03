"use strict"

let IndexProcessor = require('../processors/IndexProcessor');
/*
 {
 name: "tbl_users",
 columns: [
 ...columns
 ]
 }

 */
class ForeignKeyTableAssembler {
    constructor(tableName, rowData) {
        this.name = tableName;
        this.processor = new IndexProcessor(rowData);
    }
    getName() {
        return this.name;
    }
    getTableObj() {
        let name = this.getName();
        let foreignKeys = this.processor.getArray();
        return {name, foreignKeys};
    }
}

module.exports = ForeignKeyTableAssembler;

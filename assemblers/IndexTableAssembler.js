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
        let indexes = this.processor.getArray();
        return {name, indexes};
    }
}

module.exports = ForeignKeyTableAssembler;

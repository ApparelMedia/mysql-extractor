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
class IndexTableAssembler {
    constructor(tableName, rowDataArray) {
        this.name = tableName;
        this.processor = new IndexProcessor(rowDataArray);
    }
    getName() {
        return this.name;
    }
    getTableObj() {
        let name = this.getName();
        let indexes = this.processor.getArray();
        if (indexes.length == 0) return undefined;
        return {name, indexes};
    }
}

module.exports = IndexTableAssembler;

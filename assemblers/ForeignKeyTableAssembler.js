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
class ForeignKeyTableAssembler {
    constructor(tableName, rowDataArray) {
        this.name = tableName;
        this.processor = new ForeignKeyProcessor(rowDataArray);
    }
    getName() {
        return this.name;
    }
    getTableObj() {
        let name = this.getName();
        let foreignKeys = this.processor.getArray();
        if (foreignKeys.length == 0) return undefined;
        return {name, foreignKeys};
    }
}

module.exports = ForeignKeyTableAssembler;

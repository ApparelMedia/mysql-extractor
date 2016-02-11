"use strict"

let IssueProcessor = require('../processors/IssueProcessor');
/*
 {
 name: "tbl_users",
 columns: [
 ...columns
 ]
 }

 */
class IssueTableAssembler {
    constructor(tableName, rowDataArray, issues) {
        this.name = tableName;
        this.processor = new IssueProcessor(rowDataArray, issues);
    }
    getName() {
        return this.name;
    }
    getTableObj() {
        let name = this.getName();
        let issues = this.processor.getArray();
        if (issues.length == 0) return undefined;
        return {name, issues};
    }
}

module.exports = IssueTableAssembler;

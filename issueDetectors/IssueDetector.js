'use strict';

let _ = require('lodash');

class IssueDetector {
    constructor(columnRaw, foreignKeyRaw, indexRaw, referencedRaw) {
        this.columns = columnRaw;
        this.fks= foreignKeyRaw;
        this.indexes =  indexRaw;
        this.referenced = referencedRaw;
        this.reason = [];
        this.columnName = [];
    }

    getColumnRaw(columnName) {
        let i = _.findIndex(this.columns, function (obj) {
            return obj.Field === columnName;
        });

        if (i > -1) {
            return this.columns[i];
        }

        return null;
    }

    getIndexRaw(columnName) {
        return this.indexes.filter(function (raw) {
            return raw.Column_name === columnName;
        });
    }

    getForeignKeyRaw(columnName) {
        return this.fks.filter(function (raw) {
            return raw.COLUMN_NAME === columnName;
        });
    }

    getReferencedRaw(columnName) {
        return this.referenced.filter(function (raw) {
            return raw.REFERENCED_COLUMN_NAME === columnName;
        })
    }

    getColumn() {
        return this.columnName;
    }

    getReason() {
        return this.reason;
    }
}

module.exports = IssueDetector;
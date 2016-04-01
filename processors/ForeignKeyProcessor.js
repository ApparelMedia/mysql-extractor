"use strict";

class ForeignKeyProcessor {
    constructor(keyInfoArray) {
        this.raw = keyInfoArray[0];
    }

    getArray() {
        return this.raw.map(function (rawKeyInfo) {
            let foreign = rawKeyInfo.COLUMN_NAME;
            let on = rawKeyInfo.REFERENCED_TABLE_NAME;
            let references = rawKeyInfo.REFERENCED_COLUMN_NAME;
            let onUpdate = rawKeyInfo.UPDATE_RULE.toLowerCase();
            let onDelete = rawKeyInfo.DELETE_RULE.toLowerCase();
            let constraintName = rawKeyInfo.CONSTRAINT_NAME;
            return {foreign, references, on, onUpdate, onDelete, constraintName};
        })
    }
}

module.exports = ForeignKeyProcessor;

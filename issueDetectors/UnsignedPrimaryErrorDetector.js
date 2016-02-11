'use strict';

let IssueDetector = require('./IssueDetector');
let Unsigned = require('../detectors/UnsignedDetector');

class DetectorClass extends IssueDetector {
    constructor(columnsRaw, foreignKeysRaw, indexesRaw, referencesRaw) {
        super(columnsRaw, foreignKeysRaw, indexesRaw, referencesRaw);

        this.type = 'error';
        this.issueName = 'unsigned_primary_error';
    }

    detect() {
        let primaries = this.indexes.filter(function (index) {
            return index.Key_name === 'PRIMARY';
        });

        return primaries.filter(function (primary) {
            let columnName = primary.Column_name;
            let colRaw = this.getColumnRaw(columnName);
            if ( ! Unsigned(colRaw)) {
                this.columnName.push(columnName);
                this.reason.push(columnName + ' is a primary key. it has a type of ' + colRaw.Type + ', but it is not unsigned');
                return true;
            }
            return false;
        }.bind(this)).length;
    }

    getReason() {
        return this.reason;
    }
}

function UnsignedPrimaryErrorDetector(columnRaw, foreignKeyRaw, indexRaw, referencedRaw) {
    return new DetectorClass(columnRaw, foreignKeyRaw, indexRaw, referencedRaw);
}

module.exports = UnsignedPrimaryErrorDetector;

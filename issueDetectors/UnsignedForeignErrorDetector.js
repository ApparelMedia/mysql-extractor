'use strict';

let IssueDetector = require('./IssueDetector');
let Unsigned = require('../detectors/UnsignedDetector');

class DetectorClass extends IssueDetector {
    constructor(columnsRaw, foreignKeysRaw, indexesRaw, referencesRaw) {
        super(columnsRaw, foreignKeysRaw, indexesRaw, referencesRaw);

        this.type = 'error';
        this.issueName = 'unsigned_foreign_error';

    }

    detect() {

        let detected = this.fks.filter(function (raw) {
            let columnName = raw.COLUMN_NAME;
            let colRaw = this.getColumnRaw(columnName);

            if ( Unsigned(colRaw) ) {
                return false;
            }

            this.columnName.push(columnName);
            this.reason.push(columnName + ' is a foreign key, but is not unsigned');
            return true;
        }.bind(this));

        return detected.length;
    }

    getReason() {
        return this.reason;
    }
}

function UnsignedForeignErrorDetector(columnRaw, foreignKeyRaw, indexRaw, referencedRaw) {
    return new DetectorClass(columnRaw, foreignKeyRaw, indexRaw, referencedRaw);
}

module.exports = UnsignedForeignErrorDetector;

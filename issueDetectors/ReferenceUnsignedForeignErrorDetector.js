'use strict';

let IssueDetector = require('./IssueDetector');
let Unsigned = require('../detectors/UnsignedDetector');

class DetectorClass extends IssueDetector {
    constructor(columnsRaw, foreignKeysRaw, indexesRaw, referencesRaw) {
        super(columnsRaw, foreignKeysRaw, indexesRaw, referencesRaw);

        this.type = 'error';
        this.issueName = 'reference_unsigned_foreign_error';

    }

    detect() {
        let refCols = new Set();

        this.referenced.forEach(function (ref) {
            refCols.add(ref.REFERENCED_COLUMN_NAME);
        });

        let columnData = this.columns.filter((raw) => {
            return refCols.has(raw.Field);
        });

        let detected = columnData.filter(function (raw) {
            let columnName = raw.Field;
            if ( Unsigned(raw) ) {
                return false;
            }

            this.columnName.push(columnName);
            this.reason.push(columnName + ' is being referenced elsewhere, but it is not unsigned');
            return true;
        }.bind(this));

        return detected.length;
    }

    getReason() {
        return this.reason;
    }
}

function ReferenceUnsignedForeignErrorDetector(columnRaw, foreignKeyRaw, indexRaw, referencedRaw) {
    return new DetectorClass(columnRaw, foreignKeyRaw, indexRaw, referencedRaw);
}

module.exports = ReferenceUnsignedForeignErrorDetector;

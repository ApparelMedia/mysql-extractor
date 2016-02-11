'use strict';

let IssueDetector = require('./IssueDetector');
let Integer = require('../detectors/types/IntegerDetector');
let BigInteger = require('../detectors/types/BigIntegerDetector');

class DetectorClass extends IssueDetector {
    constructor(columnsRaw, foreignKeysRaw, indexesRaw, referencesRaw) {
        super(columnsRaw, foreignKeysRaw, indexesRaw, referencesRaw);

        this.type = 'error';
        this.issueName = 'reference_integer_foreign_error';

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
            if ( Integer(raw) || BigInteger(raw) ) {
                return false;
            }

            this.columnName.push(columnName);
            this.reason.push(columnName + ' is being referenced elsewhere, but it is not an int or bigInt');
            return true;
        }.bind(this));

        return detected.length;
    }

    getReason() {
        return this.reason;
    }
}

function ReferenceIntegerForeignErrorDetector(columnRaw, foreignKeyRaw, indexRaw, referencedRaw) {
    return new DetectorClass(columnRaw, foreignKeyRaw, indexRaw, referencedRaw);
}

module.exports = ReferenceIntegerForeignErrorDetector;

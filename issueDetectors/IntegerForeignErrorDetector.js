'use strict';

let IssueDetector = require('./IssueDetector');
let Integer = require('../detectors/types/IntegerDetector');
let BigInteger = require('../detectors/types/BigIntegerDetector');

class DetectorClass extends IssueDetector {
    constructor(columnsRaw, foreignKeysRaw, indexesRaw, referencesRaw) {
        super(columnsRaw, foreignKeysRaw, indexesRaw, referencesRaw);

        this.type = 'error';
        this.issueName = 'integer_foreign_error';

    }

    detect() {
        return this.fks.filter(function (fkRaw) {
            let columnName = fkRaw.COLUMN_NAME;
            let colRaw = this.getColumnRaw(columnName);

            if ( Integer(colRaw) || BigInteger(colRaw) ) {
                return false;
            }

            this.columnName.push(columnName);
            this.reason.push(columnName + 'is a foreign key, but is not a int or bigInt');
            return true;
        }.bind(this)).length;
    }

    getReason() {
        return this.reason;
    }
}

function IntegerForeignErrorDetector(columnRaw, foreignKeyRaw, indexRaw, referencedRaw) {
    return new DetectorClass(columnRaw, foreignKeyRaw, indexRaw, referencedRaw);
}

module.exports = IntegerForeignErrorDetector;

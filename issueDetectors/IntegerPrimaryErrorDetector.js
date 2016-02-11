'use strict';

let IssueDetector = require('./IssueDetector');
let Integer = require('../detectors/types/IntegerDetector');
let BigInteger = require('../detectors/types/BigIntegerDetector');

class DetectorClass extends IssueDetector {
    constructor(columnsRaw, foreignKeysRaw, indexesRaw, referencesRaw) {
        super(columnsRaw, foreignKeysRaw, indexesRaw, referencesRaw);

        this.type = 'error';
        this.issueName = 'integer_primary_error';

    }

    detect() {
        let primaries = this.indexes.filter(function (index) {
            return index.Key_name === 'PRIMARY';
        });

        let filtered = primaries.filter(function (primary) {
            let columnName = primary.Column_name;
            let colRaw = this.getColumnRaw(columnName);
            if ( Integer(colRaw) || BigInteger(colRaw) ) {
                return false;
            }
            this.columnName.push(columnName);
            this.reason.push(columnName + ' is a primary key. it has a type of ' + colRaw.Type + ', and is not a int or bigInt');
            return true;
        }.bind(this));

        //console.log('right after', filtered);

        return filtered.length;

    }

    getReason() {
        return this.reason;
    }
}

function IntegerPrimaryErrorDetector(columnRaw, foreignKeyRaw, indexRaw, referencedRaw) {
    return new DetectorClass(columnRaw, foreignKeyRaw, indexRaw, referencedRaw);
}

module.exports = IntegerPrimaryErrorDetector;

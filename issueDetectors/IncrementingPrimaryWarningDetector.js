'use strict';

let IssueDetector = require('./IssueDetector');
let Incrementing = require('../detectors/IncrementingDetector');

class DetectorClass extends IssueDetector {
    constructor(columnsRaw, foreignKeysRaw, indexesRaw, referencesRaw) {
        super(columnsRaw, foreignKeysRaw, indexesRaw, referencesRaw);

        this.type = 'warning';
        this.issueName = 'incrementing_primary_warning';
    }

    detect() {
        let primaries = this.indexes.filter(function (index) {
            return index.Key_name === 'PRIMARY';
        });

        return primaries.filter(function (primary) {
            let columnName = primary.Column_name;
            let colRaw = this.getColumnRaw(columnName);
            if ( ! Incrementing(colRaw)) {
                this.columnName.push(columnName);
                this.reason.push(columnName + ' is a primary key, but it is not incrementing');
                return true;
            }
            return false;
        }.bind(this)).length;
    }

    getReason() {
        return this.reason;
    }
}

function IncrementingPrimaryWarningDetector(columnRaw, foreignKeyRaw, indexRaw, referencedRaw) {
    return new DetectorClass(columnRaw, foreignKeyRaw, indexRaw, referencedRaw);
}

module.exports = IncrementingPrimaryWarningDetector;

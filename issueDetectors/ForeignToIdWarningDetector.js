'use strict';

let IssueDetector = require('./IssueDetector');

class DetectorClass extends IssueDetector {
    constructor(columnsRaw, foreignKeysRaw, indexesRaw, referencesRaw) {
        super(columnsRaw, foreignKeysRaw, indexesRaw, referencesRaw);

        this.type = 'warning';
        this.issueName = 'foreign_to_id_warning';

    }

    detect() {
        let detected = this.fks.filter(function (raw) {
            let columnName = raw.COLUMN_NAME;
            let referencedCol = raw.REFERENCED_COLUMN_NAME;
            if ( referencedCol === 'id' ) {
                return false;
            }
            this.columnName.push(columnName);
            this.reason.push(columnName + ' is pointing to ' + referencedCol + ', but it should be pointing to a "id" column.');
            return true;
        }.bind(this));

        return detected.length;
    }

    getReason() {
        return this.reason;
    }
}

function ForeignToIdWarningDetector(columnRaw, foreignKeyRaw, indexRaw, referencedRaw) {
    return new DetectorClass(columnRaw, foreignKeyRaw, indexRaw, referencedRaw);
}

module.exports = ForeignToIdWarningDetector;

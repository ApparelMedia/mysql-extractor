'use strict';

let IssueDetector = require('./IssueDetector');

class DetectorClass extends IssueDetector {
    constructor(columnsRaw, foreignKeysRaw, indexesRaw, referencesRaw) {
        super(columnsRaw, foreignKeysRaw, indexesRaw, referencesRaw);

        this.type = 'warning';
        this.issueName = 'reference_primary_foreign_warning';

    }

    detect() {

        let detected = this.fks.filter(function (raw) {
            let columnName = raw.COLUMN_NAME;

            if (raw.COLUMN_KEY === 'PRI') {
                return false;
            }

            this.columnName.push( columnName );
            this.reason.push( columnName + ' is a foreign key, but the column it points to is not a primary key' );
            return true;
        }.bind(this));

        return detected.length;
    }

    getReason() {
        return this.reason;
    }
}

function ReferencePrimaryForeignWarningDetector(columnRaw, foreignKeyRaw, indexRaw, referencedRaw) {
    return new DetectorClass(columnRaw, foreignKeyRaw, indexRaw, referencedRaw);
}

module.exports = ReferencePrimaryForeignWarningDetector;

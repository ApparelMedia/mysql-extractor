'use strict';

let IssueDetector = require('./IssueDetector');

class DetectorClass extends IssueDetector {
    constructor(columnsRaw, foreignKeysRaw, indexesRaw, referencesRaw) {
        super(columnsRaw, foreignKeysRaw, indexesRaw, referencesRaw);

        this.type = 'warning';
        this.issueName = 'index_foreign_warning';

    }

    detect() {

        let detected = this.fks.filter(function (raw) {
            let columnName = raw.COLUMN_NAME;
            let colRaw = this.getColumnRaw(columnName);

            if (colRaw.Key === 'PRI' || colRaw.Key === 'MUL' || colRaw.Key === 'SPA') {
                return false;
            }

            this.columnName.push(columnName);
            this.reason.push(columnName + ' is a foreign key. it is not indexed in any way');
            return true;
        }.bind(this));

        return detected.length;
    }

    getReason() {
        return this.reason;
    }
}

function IndexForeignWarningDetector(columnRaw, foreignKeyRaw, indexRaw, referencedRaw) {
    return new DetectorClass(columnRaw, foreignKeyRaw, indexRaw, referencedRaw);
}

module.exports = IndexForeignWarningDetector;

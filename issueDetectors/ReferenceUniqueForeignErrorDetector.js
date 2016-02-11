'use strict';

let IssueDetector = require('./IssueDetector');

class DetectorClass extends IssueDetector {
    constructor(columnsRaw, foreignKeysRaw, indexesRaw, referencesRaw) {
        super(columnsRaw, foreignKeysRaw, indexesRaw, referencesRaw);

        this.type = 'error';
        this.issueName = 'reference_unique_foreign_error';

    }

    detect() {
        let refCols = new Set();

        this.referenced.forEach(function (ref) {
            refCols.add(ref.REFERENCED_COLUMN_NAME);
        });

        let columnData = this.indexes.filter((raw) => {
            return refCols.has(raw.Column_name);
        });

        let detected = columnData.filter(function (raw) {
            let columnName = raw.Column_name;
            if (raw.Non_unique == 0) {
               return false;
            }
            this.columnName.push(columnName);
            this.reason.push(columnName + ' is being referenced elsewhere, but it is not uniquely indexed');
            return true;
        }.bind(this));

        return detected.length;
    }

    getReason() {
        return this.reason;
    }
}

function ReferenceUniqueForeignErrorDetector(columnRaw, foreignKeyRaw, indexRaw, referencedRaw) {
    return new DetectorClass(columnRaw, foreignKeyRaw, indexRaw, referencedRaw);
}

module.exports = ReferenceUniqueForeignErrorDetector;

'use strict';

let IssueDetector = require('./IssueDetector');

class DetectorClass extends IssueDetector {
    constructor(columnsRaw, foreignKeysRaw, indexesRaw, referencesRaw) {
        super(columnsRaw, foreignKeysRaw, indexesRaw, referencesRaw);

        this.type = 'error';
        this.issueName = 'column_lowercase_warning';

    }

    detect() {

        let detected = this.columns.filter(function (raw) {
            let columnName = raw.Field;

            if ( columnName.toLowerCase() === columnName ) {
                return false;
            }

            this.columnName.push(columnName);
            this.reason.push(columnName + ' should be lowercase.');
            return true;
        }.bind(this));

        return detected.length;
    }

    getReason() {
        return this.reason;
    }
}

function ColumnLowercaseWarningDetector(columnRaw, foreignKeyRaw, indexRaw, referencedRaw) {
    return new DetectorClass(columnRaw, foreignKeyRaw, indexRaw, referencedRaw);
}

module.exports = ColumnLowercaseWarningDetector;

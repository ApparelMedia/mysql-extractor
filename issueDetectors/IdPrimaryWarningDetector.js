'use strict';

let IssueDetector = require('./IssueDetector');

class DetectorClass extends IssueDetector {
    constructor(columnsRaw, foreignKeysRaw, indexesRaw, referencesRaw) {
        super(columnsRaw, foreignKeysRaw, indexesRaw, referencesRaw);

        this.type = 'warning';
        this.issueName = 'id_primary_warning';


    }

    detect() {
        let primaries = this.indexes.filter(function (index) {
            return index.Key_name === 'PRIMARY';
        });

        return primaries.filter(function (primary) {
            let columnName = primary.Column_name;
            if ( columnName !== 'id' ) {
                this.columnName.push(columnName);
                this.reason.push(columnName + ' is a primary key, but it is not named id');
                return true;
            }
            return false;
        }.bind(this)).length;
    }

    getReason() {
        return this.reason;
    }
}

function IdPrimaryWarningDetector(columnRaw, foreignKeyRaw, indexRaw, referencedRaw) {
    return new DetectorClass(columnRaw, foreignKeyRaw, indexRaw, referencedRaw);
}

module.exports = IdPrimaryWarningDetector;

"use strict";

var OneKeyError = require('../issueDetectors/OneKeyErrorDetector');
var IntegerPrimaryError = require('../issueDetectors/IntegerPrimaryErrorDetector');
var UnsignedPrimaryError = require('../issueDetectors/UnsignedPrimaryErrorDetector');
var UniquePrimaryError = require('../issueDetectors/UniquePrimaryErrorDetector');
var IncrementingPrimaryWarning = require('../issueDetectors/IncrementingPrimaryWarningDetector');
var IdPrimaryWarning = require('../issueDetectors/IdPrimaryWarningDetector');
var IntegerForeignError = require('../issueDetectors/IntegerForeignErrorDetector');
var UnsignedForeignError = require('../issueDetectors/UnsignedForeignErrorDetector');
var ForeignToIdWarning = require('../issueDetectors/ForeignToIdWarningDetector');
var ReferencePrimaryForeignWarning = require('../issueDetectors/ReferencePrimaryForeignWarningDetector');
var IndexForeignWarning = require('../issueDetectors/IndexForeignWarningDetector');
var ReferenceIntegerForeignError = require('../issueDetectors/ReferenceIntegerForeignErrorDetector');
var ReferenceUnsignedForeignError = require('../issueDetectors/ReferenceUnsignedForeignErrorDetector');
var ReferenceUniqueForeignError = require('../issueDetectors/ReferenceUniqueForeignErrorDetector');
var ColumnLowercaseWarning = require('../issueDetectors/ColumnLowercaseWarningDetector');
// add dependency here

var factories = {
    'one_key_error' : OneKeyError,
    'integer_primary_error': IntegerPrimaryError,
    'unsigned_primary_error': UnsignedPrimaryError,
    'unique_primary_error': UniquePrimaryError,
    'incrementing_primary_warning': IncrementingPrimaryWarning,
    'id_primary_warning': IdPrimaryWarning,
    'integer_foreign_error': IntegerForeignError,
    'unsigned_foreign_error': UnsignedForeignError,
    'foreign_to_id_warning': ForeignToIdWarning,
    'reference_primary_foreign_warning': ReferencePrimaryForeignWarning,
    'index_foreign_warning': IndexForeignWarning,
    'reference_integer_foreign_error': ReferenceIntegerForeignError,
    'reference_unsigned_foreign_error': ReferenceUnsignedForeignError,
    'reference_unique_foreign_error': ReferenceUniqueForeignError,
    'column_lowercase_warning': ColumnLowercaseWarning,
// add factory here
};

var defaultIssues = [
    'one_key_error',
    'integer_primary_error',
    'unsigned_primary_error',
    'unique_primary_error',
    'incrementing_primary_warning',
    'id_primary_warning',
    'reference_integer_foreign_error',
    'reference_unsigned_foreign_error',
    'reference_unique_foreign_error',
    'integer_foreign_error',
    'unsigned_foreign_error',
    'index_foreign_warning',
    'foreign_to_id_warning',
    'reference_primary_foreign_warning',
    'column_lowercase_warning',
// add default here
];

class IssueProcessor {
    constructor(data, issues) {
        this.columnsRaw = data[0];
        this.fksRaw = data[1];
        this.indexesRaw = data[2];
        this.referencedRaw = data[3];
        this.issuesWhitelist = issues || defaultIssues;
    }

    getArray() {
        let output = [];

        let filteredFactories = []

        this.issuesWhitelist.forEach(function (whitelistIssue) {
            let factory = factories[whitelistIssue];
            if ( ! factory ) throw new Error(whitelistIssue + ' is not found!  Please check the spelling');
            filteredFactories.push(factory);
        });

        filteredFactories.forEach(function (detectorFactory) {
            let detector = detectorFactory(this.columnsRaw, this.fksRaw, this.indexesRaw, this.referencedRaw);
            let detectedLength = detector.detect();

            for (let i = 0; i < detectedLength; i++) {
                let type = detector.type;
                let column = detector.getColumn()[i];
                let issueName = detector.issueName;
                let reason = detector.getReason()[i];
                output.push({type, column, issueName, reason});
            }
        }.bind(this));

        return output;
    }
}

module.exports = IssueProcessor;
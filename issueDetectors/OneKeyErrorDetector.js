'use strict';

let IssueDetector = require('./IssueDetector');

class DetectorClass extends IssueDetector {
    constructor(columnRaw, foreignKeyRaw, indexRaw, referencedRaw) {
        super(columnRaw, foreignKeyRaw, indexRaw, referencedRaw);

        this.type = 'error';
        this.issueName = 'one_key_error';
        this.statement = 'table should have only one primary key or one composite key';

    }

    detect() {
        let primes = this.indexes.filter(function (index) {
            return index.Key_name === 'PRIMARY';
        });

        let numOfPrimes = primes.length;
        if (numOfPrimes === 1) return false;

        if (numOfPrimes === 0) {
            this.reason.push('This table has no primary keys.');
            return 1;
        }

        if (primes.length > 1) {
            let numOfOneKeys = primes.filter(function (primary) {
                return primary.Seq_in_index == 1;
            }).length;
            if (numOfOneKeys > 1) {
                this.reason.push('This table has more than one primary key or one composite key');
                return 1;
            }
        }

        return 0;
    }

    getReason() {
        return this.reason;
    }
}

function OneKeyErrorDetector(columnRaw, foreignKeyRaw, indexRaw, referencedRaw) {
    return new DetectorClass(columnRaw, foreignKeyRaw, indexRaw, referencedRaw);
}

module.exports = OneKeyErrorDetector;

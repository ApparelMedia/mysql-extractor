"use strict";

let mysql = require('mysql');
let _ = require('lodash');
let fs = require('fs');
let TableAssembler = require('./assemblers/ColumnTableAssembler');
let ForeignKeyTableAssembler = require('./assemblers/ForeignKeyTableAssembler');
let IndexTableAssembler = require('./assemblers/IndexTableAssembler');
let IssueTableAssembler = require('./assemblers/IssueTableAssembler');

var databaseName = 'pear_sandbox';

var fkSql = require('./sqlCreators/ForeignKeySql');
var indexSql = require('./sqlCreators/IndexSql');
var columnSql = require('./sqlCreators/ColumnInfoSql');
var referencedSql = require('./sqlCreators/ReferencedKeySql');

function getTableNames(tables) {
    return tables.map(function (table) {
        return table["Tables_in_" + databaseName];
    });
}

function filterTableNames(list) {
    return list.filter(function (table) {
        return ( table.indexOf('tbl') > -1 );
    });
}

function writeToFile(data, filePath, outputStr) {
    data = data.filter( (data) => !! data );
    fs.writeFile(filePath, JSON.stringify(data, null, '\t'), function (err) {
        console.log(outputStr);
    });
}

function executeActionAndWriteToFile(tableNames, filePath, dbConnection, sqlCreators, Assembler, outputStr, extra) {
    let data = [];

    /* TODO: how to take in an array of sqlCreators */

    let queries = tableNames.map(function (tableName) {
        let rowQueries = sqlCreators.map(function (sqlCreator) {
            return new Promise(function (resolve, reject) {
                dbConnection.query(sqlCreator(tableName, databaseName), function (err, results) {
                    if (err) reject(err);
                    resolve(results);
                });
            });
        });

        return Promise.all(rowQueries).then(function (results) {
            let assembler = new Assembler(tableName, results, extra);
            let obj = assembler.getTableObj();
            data.push(obj);
        });
    });

    Promise.all(queries).then(function () {
        writeToFile(data, filePath, outputStr);
    }).catch(function (err) {
        console.error(err);
    });

    dbConnection.end();
}

class MysqlExtractor {
    constructor(opts) {
        this.opts = opts;
        this.opts.filterTableNames = this.opts.filterTableNames || filterTableNames;

    }
    dbConnect() {
        const dbConnection = mysql.createConnection({
            host     : this.opts.host,
            user     : this.opts.user,
            password : this.opts.password,
            database : this.opts.database
        });
        dbConnection.connect();
        return dbConnection;
    }

    //infoConnect() {
    //    const infoConnection = mysql.createConnection({
    //        host     : this.opts.host,
    //        user     : this.opts.user,
    //        password : this.opts.password,
    //        database : 'INFORMATION_SCHEMA'
    //    });
    //    infoConnection.connect();
    //    return infoConnection;
    //}

    createTableFile() {
        const dbConnection = this.dbConnect();
        dbConnection.query('SHOW TABLES', function(err, tables){
            let list = getTableNames(tables);

            let filteredList = this.opts.filterTableNames(list);
            executeActionAndWriteToFile(filteredList, this.opts.tableFile, dbConnection, [columnSql], TableAssembler, 'wrote to tables file');
        }.bind(this));
    }

    createForeignKeyFile() {
        const dbConnection = this.dbConnect();
        dbConnection.query('SHOW TABLES', function(err, tables){
            let list = getTableNames(tables);

            let filteredList = this.opts.filterTableNames(list);
            executeActionAndWriteToFile(filteredList, this.opts.keyFile, dbConnection, [fkSql], ForeignKeyTableAssembler, 'wrote to keys file');
        }.bind(this));
    }

    createIndexFile() {
        const dbConnection = this.dbConnect();
        dbConnection.query('SHOW TABLES', function(err, tables){
            let list = getTableNames(tables);

            let filteredList = this.opts.filterTableNames(list);
            executeActionAndWriteToFile(filteredList, this.opts.indexFile, dbConnection, [indexSql], IndexTableAssembler, 'wrote to indexes file');
        }.bind(this));
    }

    createIssueFile() {
        const dbConnection = this.dbConnect();
        dbConnection.query('SHOW TABLES', function(err, tables){
            let list = getTableNames(tables);

            let filteredList = this.opts.filterTableNames(list);
            executeActionAndWriteToFile(filteredList, this.opts.issueFile, dbConnection, [columnSql, fkSql, indexSql, referencedSql], IssueTableAssembler, 'wrote to issues file', this.opts.issues);
        }.bind(this));
    }

    createDataFiles() {
        const dbConnection = this.dbConnect();
        let tables = this.opts.dataTables;
        let db = this.opts.database;

        tables.forEach(function (table) {
            let filePath = this.opts.dataPath + '/' + table + '.json';


            let colQuery = new Promise(function (resolve, reject) {
                dbConnection.query('show columns from ' + db + '.' + table, function (error, columns) {
                    if (error) reject(error);
                    let colArray = columns.map(function (col) {
                        if (col.Type === 'geometry') {
                            return 'AsText(' + col.Field + ')';
                        }
                        return col.Field;
                    });
                    resolve(colArray);
                });
            });

            function startFileWrite(cols) {
                try {
                    fs.unlinkSync(filePath);
                } catch (e) {}

                let fileStream = fs.createWriteStream(filePath, {'flags': 'a'});
                fileStream.write('[\n');
                return {columns: cols, file: fileStream};
            }

            let dataQuery = function (data) {
                let cols = data.columns;
                let file = data.file;
                let columnsStr = cols.join(', ');
                let sql = 'select ' + columnsStr + ' from ' + db + '.' + table ;
                const conn = this.dbConnect();
                var split = '\t';
                let dataQuery = new Promise(function (resolve, reject) {
                    conn.query(sql, function (error, rows) {
                        if (typeof rows === 'undefined') return;
                        rows.forEach(function (row) {
                            file.write(split + JSON.stringify(_.values(row)));
                            if (split === '\t') {
                                split = ",\n\t";
                            }
                        });

                        resolve(file);
                    });
                });
                conn.end();

                return dataQuery;
            };

            function endFileWrite(fileStream) {
                fileStream.end('\n]');
                console.log('wrote to ' + fileStream.path);
            }

            colQuery
                .then(startFileWrite)
                .then(dataQuery.bind(this))
                .then(endFileWrite)
                .catch(function (error) {
                    console.error(error);
                });


        }.bind(this));
        dbConnection.end();
    }
}

module.exports = MysqlExtractor;

"use strict";

let mysql = require('mysql');
let _ = require('lodash');
let fs = require('fs');
let TableAssembler = require('./assemblers/ColumnTableAssembler');
let ForeignKeyTableAssembler = require('./assemblers/ForeignKeyTableAssembler');
let IndexTableAssembler = require('./assemblers/IndexTableAssembler');

var databaseName = 'pear_sandbox';

function getForeignKeySQL(tableName, databaseName) {
    return 'select A.COLUMN_NAME, A.REFERENCED_TABLE_NAME, A.REFERENCED_COLUMN_NAME, B.UPDATE_RULE, B.DELETE_RULE ' +
        'from (select COLUMN_NAME,CONSTRAINT_NAME,REFERENCED_TABLE_NAME,REFERENCED_COLUMN_NAME ' +
              'from KEY_COLUMN_USAGE as KEYTABLE where TABLE_SCHEMA = "' + databaseName+ '"  ' +
              'and TABLE_NAME ="'+ tableName +'" and referenced_column_name is not NULL) as A ' +
              'left join `REFERENTIAL_CONSTRAINTS` as B on (A.CONSTRAINT_NAME = B.`CONSTRAINT_NAME`);';
}

function getIndexSQL(tableName, databaseName) {
    return 'SHOW INDEX from ' + databaseName + '.' + tableName + ';';
}

function getTableInfo(tableNames, filePath, connection) {
  let tables = [];
  tableNames.forEach(function (tableName, index, tableNames) {
    connection.query('SHOW COLUMNS in ' + tableName, function(err, results){
      let processor = new TableAssembler(tableName, results);
      let tableObj = processor.getTableObj();
      tables.push(tableObj);

      if (tableNames.length === index + 1) {
        writeToTableFile(tables, filePath);
      }
    });
  });
    connection.end();
}

function getKeysInfo(tableNames, filePath, infoConnection, dbConnection, databaseName) {
  let keys = [];
  tableNames.forEach(function (tableName, index, tableNames) {
      infoConnection.query(getForeignKeySQL(tableName, databaseName), function (err, results) {
          let processor = new ForeignKeyTableAssembler(tableName, results);
          keys.push(processor.getTableObj());

          if (tableNames.length === index + 1) {
              writeToKeysFile(keys, filePath);
          }
      });
  });
  infoConnection.end();
    dbConnection.end();
}

function getIndexInfo(tableNames, filePath, dbConnection, databaseName) {
    let keys = [];
    tableNames.forEach(function (tableName, index, tableNames) {
        dbConnection.query(getIndexSQL(tableName, databaseName), function (err, results) {
            let processor = new IndexTableAssembler(tableName, results);
            keys.push(processor.getTableObj());

            if (tableNames.length === index + 1) {
                writeToIndexesFile(keys, filePath);
            }
        });
    });
    dbConnection.end();
}

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

function writeToTableFile(tableArray, filePath) {
    fs.writeFile(filePath, JSON.stringify(tableArray, null, '\t'), function (err) {
        console.log('write to tables file');
    })
}

function writeToKeysFile(keysArray, filePath) {
    fs.writeFile(filePath, JSON.stringify(keysArray, null, '\t'), function (err) {
        console.log('write to keys file');
    });
}

function writeToIndexesFile(keysArray, filePath) {
    fs.writeFile(filePath, JSON.stringify(keysArray, null, '\t'), function (err) {
        console.log('write to indexes file');
    });
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

    infoConnect() {
        const infoConnection = mysql.createConnection({
            host     : this.opts.host,
            user     : this.opts.user,
            password : this.opts.password,
            database : 'INFORMATION_SCHEMA'
        });
        infoConnection.connect();
        return infoConnection;
    }

    createTableFile() {
        const dbConnection = this.dbConnect();
        dbConnection.query('SHOW TABLES', function(err, tables){
            let list = getTableNames(tables);

            let filteredList = this.opts.filterTableNames(list);

            getTableInfo(filteredList, this.opts.tableFile, dbConnection);
        }.bind(this));
    }

    createForeignKeyFile() {
        const dbConnection = this.dbConnect();
        const infoConnection = this.infoConnect();
        dbConnection.query('SHOW TABLES', function(err, tables){
            let list = getTableNames(tables);

            let filteredList = this.opts.filterTableNames(list);

            getKeysInfo(filteredList, this.opts.keyFile, infoConnection, dbConnection, this.opts.database);

        }.bind(this));
    }

    createIndexFile() {
        const dbConnection = this.dbConnect();
        dbConnection.query('SHOW TABLES', function(err, tables){
            let list = getTableNames(tables);

            let filteredList = this.opts.filterTableNames(list);

            getIndexInfo(filteredList, this.opts.indexFile, dbConnection, this.opts.database);
        }.bind(this));
    }
}

module.exports = MysqlExtractor;

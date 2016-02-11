/*
Field
Type
Null (YES, NO)
Key (PRI, MUL, SPA)
Default (0.00)
Extra (auto_increment)
 */

function ColumnInfoSql (tableName, dbName) {
    return 'SHOW COLUMNS in ' + dbName + '.' + tableName;
}

module.exports = ColumnInfoSql;
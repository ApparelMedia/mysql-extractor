var MySqlExtractor = require('./index.js');

var opts = {
    host: 'hostip',
    user: 'user',
    password: 'pass',
    database: 'dbname',
    //envFile: {        /* in TODO */
    //    path: './.env',
    //    host: 'DB_HOST',
    //    port: 'DB_PORT',
    //    user: 'DB_USER',
    //    password: 'DB_PASS',
    //    database: 'DB_NAME'
    //},
    tableFile: 'output/tablesExample.json',
    keyFile: 'output/keysExample.json',
    indexFile: 'output/indexExample.json',
    filterTableNames: function (tableNames) {
        return tableNames.filter(function (tableName) {
            return true;
        });
    }
};

mySqlExtractor = new MySqlExtractor(opts);

mySqlExtractor.createTableFile();
mySqlExtractor.createForeignKeyFile();

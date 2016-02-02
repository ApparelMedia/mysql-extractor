# MySQL Extractor

This node package is to easily extract the MySQL Schema to a json format which then can be generated into various migration files.

## Usage
```javascript
var MySqlExtractor = require('mysql-extractor');

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
```

## Detects the following types
- boolean
- date
- dateTime
- decimal
- geometry
- integer
- string (VarChar)
- text
- bigInteger 
- char
- double
- enum
- float
- json
- jsonb
- longText
- mediumInteger
- mediumText
- smallInteger
- time
- tinyInteger
- timestamp

## TODO
- [ ] Add Env File Consumption
- [ ] Add Indexes File Feature
- [ ] Add Unit Tests
- [ ] Add Events
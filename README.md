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

## Outputs:
Table JSON
```json
[
  {
    "name": "budgets",
    "columns": [
        {
            "name": "id",
            "type": "integer",
            "nullable": false,
            "primaryKey": true,
            "unsigned": false,
            "incrementing": true,
            "defaultValue": null,
            "constraints": {
                "maximum": 11
            },
            "rawType": "int(11)"
        },
        {
            "name": "program_id",
            "type": "integer",
            "nullable": false,
            "primaryKey": false,
            "unsigned": false,
            "incrementing": false,
            "defaultValue": null,
            "constraints": {
                "maximum": 11
            },
            "rawType": "int(11)"
        },
        {
            "name": "amount",
            "type": "decimal",
            "nullable": false,
            "primaryKey": false,
            "unsigned": false,
            "incrementing": false,
            "defaultValue": null,
            "constraints": {
                "precision": 8,
                "scale": 2
            },
            "rawType": "decimal(8,2)"
        }
      ]
  }	
]
```

Foreign Keys

```json
[
  {
    "name": "tbl_programs_budgets",
    "foreignKeys": [
        {
            "foreign": "program_id",
            "references": "id",
            "on": "tbl_programs",
            "onUpdate": "restrict",
            "onDelete": "restrict"
        }
    ]
  }
]

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
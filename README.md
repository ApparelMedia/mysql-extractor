# MySQL Extractor

This node package is to easily extract the MySQL Schema to a json format which then can be generated into various migration files.

## Usage
### Methods
#### `createTableFile()`
#### `createForeignKeyFile()`
#### `createIndexFile()`
#### `createIssueFile()`

### Options
#### `host, user, password, database`
configuration to connect to your database

#### `tableFile, keyFile, indexFile, issueFile`
file path to your json files

#### issues
An array of issues you would like to inspect.  If you do not specify an `issues` array, it will test against all available issues.

### Example
```javascript
var MySqlExtractor = require('mysql-extractor');

var opts = {
    host: 'hostip',
    user: 'user',
    password: 'pass',
    database: 'dbname',
    tableFile: 'output/tablesExample.json',
    keyFile: 'output/keysExample.json',
    indexFile: 'output/indexExample.json',
    issueFile: 'output/issueExample.json',
    issues: [
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
        'column_lowercase_warning'
    ],
    filterTableNames: function (tableNames) {
        return tableNames.filter(function (tableName) {
            return true;
        });
    }
};

mySqlExtractor = new MySqlExtractor(opts);

mySqlExtractor.createTableFile();
mySqlExtractor.createForeignKeyFile();
mySqlExtractor.createIndexFile();
mySqlExtractor.createIssueFile();

```

## Getting Table/Column Structure

### Supported Data Types
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


### Example Output

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

## Foreign Key Constraints

### Example Output

```json
[
  {
    "name": "budgets",
    "foreignKeys": [
        {
            "foreign": "program_id",
            "references": "id",
            "on": "programs",
            "onUpdate": "restrict",
            "onDelete": "restrict"
        }
    ]
  }
]

```

## Indexes

### Example Output

```json
[
  {
  		"name": "budgets",
  		"indexes": [
  			{
  				"column": "program_id",
  				"unique": false,
  				"indexType": "BTREE"
  			},
  			{
  				"column": "create_by",
  				"unique": false,
  				"indexType": "BTREE"
  			},
  			{
  				"column": "status_id",
  				"unique": false,
  				"indexType": "BTREE"
  			}
  		]
  	}
  	...
]
```

## Finding Issues

There are some standards to follow when setting up our database.

### Rules To Inspect in Database (checked are implemented)

#### General
- [x] `one_key_error` - A table **must** have only one primary key or one composite key

#### Primary Key Rules
- [x] `integer_primary_error` - Primary Key **must** be integer or bigInteger
- [x] `unsigned_primary_error` - Primary Key **must** be unsigned
- [x] `unique_primary_error` - Primary Key **must** be uniquely index
- [x] `incrementing_primary_warning` - Primary Key should be auto-incrementing.
- [x] `id_primary_warning` - Primary Key column should be named `id` //need to see if the key is composite

#### Foreign Key Rules
- [x] `reference_integer_foreign_error` - Foreign Key **must** reference to an integer (or bigInteger) column
- [x] `reference_unsigned_foreign_error` - Foreign Key **must** reference to an unsigned column
- [x] `reference_unique_foreign_error` - Foreign Key **must** reference to a column with an unique index
- [x] `integer_foreign_error` - Foreign Key **must** be integer or bigInteger
- [x] `unsigned_foreign_error` - Foreign Key **must** be unsigned
- [x] `index_foreign_warning` - Foreign Key should be indexed
- [x] `foreign_to_id_warning` - Foreign keys should point to `id` column
- [x] `reference_primary_foreign_warning` - Foreign Key should reference to a Primary Key.
- [ ] `foreign_ending_id_warning` - Foreign key columns should end with `_id`.


#### Formatting
- [x] `column_lowercase_warning` - lower snakecase for all and column names
- [ ] `table_lowercase_warning` - lower snakecase for all and column names
- [ ] `ending_id_warning` - All column names that ends with `_id` should be a foreign key

### Example Output
```json

[
    {
		"name": "budgets",
		"issues": [
			{
				"type": "error",
				"column": "id",
				"issueName": "unsigned_primary_error",
				"reason": "id is a primary key. it has a type of int(11), but it is not unsigned"
			},
			{
				"type": "error",
				"column": "id",
				"issueName": "reference_unsigned_foreign_error",
				"reason": "id is being referenced elsewhere, but it is not unsigned"
			},
			{
				"type": "error",
				"column": "program_id",
				"issueName": "unsigned_foreign_error",
				"reason": "program_id is a foreign key, but is not unsigned"
			}
		]
	}
]
```

## TODO
- [ ] Add Env File Consumption
- [x] Add Indexes File Feature
- [ ] Add Database Inspection Feature
- [ ] Add Unit Tests
- [ ] Add Events
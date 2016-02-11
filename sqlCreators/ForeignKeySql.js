/*
COLUMN_NAME (user_id)
REFERENCED_TABLE_NAME (tbl_users)
REFERENCED_COLUMN_NAME (id)
COLUMN_TYPE (int(10) unsigned)
EXTRA (auto_increment)
COLUMN_KEY (PRI)
IS_NULLABLE (YES, NO)
UPDATE_RULE (RESTRICT)
DELETE_RULE (RESTRICT)
 */

function ForeignKeySql (tableName, dbName) {
    return 'select FRGN.COLUMN_NAME, FRGN.REFERENCED_TABLE_NAME, FRGN.REFERENCED_COLUMN_NAME, COL.COLUMN_TYPE, COL.EXTRA, COL.COLUMN_KEY, COL.IS_NULLABLE, FRGN.UPDATE_RULE, FRGN.DELETE_RULE ' +
        'from (select A.COLUMN_NAME, A.REFERENCED_TABLE_NAME, A.REFERENCED_COLUMN_NAME, B.UPDATE_RULE, B.DELETE_RULE ' +
    'from (select COLUMN_NAME,CONSTRAINT_NAME,REFERENCED_TABLE_NAME,REFERENCED_COLUMN_NAME ' +
    'from information_schema.KEY_COLUMN_USAGE as KEYTABLE where TABLE_SCHEMA = "' + dbName+ '" ' +
    'and TABLE_NAME ="'+ tableName +'" and referenced_column_name is not NULL) as A ' +
    'left join information_schema.REFERENTIAL_CONSTRAINTS as B on (A.CONSTRAINT_NAME = B.CONSTRAINT_NAME)) ' +
    'as FRGN ' +
    'left join (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = "' + dbName+ '") as COL ' +
    'on (FRGN.REFERENCED_COLUMN_NAME = COL.COLUMN_NAME) and (FRGN.REFERENCED_TABLE_NAME = COL.TABLE_NAME);';
}

module.exports = ForeignKeySql;
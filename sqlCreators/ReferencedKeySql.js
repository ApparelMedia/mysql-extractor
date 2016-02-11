/*
 REFERENCED_TABLE_NAME (tbl_users)
 REFERENCED_COLUMN_NAME (id)
 TABLE_NAME (tbl_activity_log)
 COLUMN_NAME (user_id)
 UPDATE_RULE (RESTRICT)
 DELETE_RULE (RESTRICT)
 Type (int(10) unsigned)
 Extra (auto_increment)
 Key (PRI)
 Null (YES)
 */

function ReferencedKeySql (tableName, dbName) {
    return 'SELECT A.REFERENCED_TABLE_NAME, A.REFERENCED_COLUMN_NAME, A.TABLE_NAME, A.COLUMN_NAME , A.UPDATE_RULE, A.DELETE_RULE, B.COLUMN_KEY as "Key", B.COLUMN_TYPE as "Type", B.Extra, B.IS_NULLABLE as "Null" ' +
    'From ' +
    '(select REF.REFERENCED_TABLE_NAME, INFO.REFERENCED_COLUMN_NAME, INFO.TABLE_NAME, INFO.COLUMN_NAME , REF.UPDATE_RULE, REF.DELETE_RULE ' +
    'from ' +
    '( select * from information_schema.REFERENTIAL_CONSTRAINTS WHERE CONSTRAINT_SCHEMA = "' + dbName+ '" and REFERENCED_TABLE_NAME = "'+ tableName +'" ) as REF ' +
    'left join ' +
    '( select * from information_schema.KEY_COLUMN_USAGE WHERE CONSTRAINT_SCHEMA = "' + dbName+ '") as INFO ' +
    'on (REF.CONSTRAINT_NAME = INFO.CONSTRAINT_NAME)) ' +
    'AS A left join ' +
    '(select * from information_schema.COLUMNS where TABLE_SCHEMA = "' + dbName +'" ) as B on (A.TABLE_NAME = B.TABLE_NAME) and (A.COLUMN_NAME = B.COLUMN_NAME);';
}

module.exports = ReferencedKeySql;
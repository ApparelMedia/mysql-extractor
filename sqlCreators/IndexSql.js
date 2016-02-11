/*
Table (tbl_awards)
Non_unique (1)
Key_name (PRIMARY, user_id)
Seq_in_index (1)
Column_name (user_id)
Collation (A)
Cardinality (149)
Sub_part (NULL)
Packed (NULL)
Null (YES)
Index_type (BTREE, SPATIAL)
Comment
Index_comment
 */

function IndexSql (tableName, dbName) {
    return 'SHOW INDEX from ' + dbName + '.' + tableName + ';';
}

module.exports = IndexSql;
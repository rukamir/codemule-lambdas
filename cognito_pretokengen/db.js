var mysql = require('mysql');

const SQL_ADDRESS = process.env.SQL_ADDRESS;
const SQL_USER = process.env.SQL_USER;
const SQL_PASS = process.env.SQL_PASS;
const SQL_DB_NAME = process.env.SQL_DB_NAME;

var connection = mysql.createConnection({
    host     : SQL_ADDRESS,
    user     : SQL_USER,
    password : SQL_PASS,
    database : SQL_DB_NAME
  });
connection.connect();

var query = function( sql, args ) {
  return new Promise( ( resolve, reject ) => {
    connection.query( sql, args, ( err, rows ) => {
      connection.end();
      if ( err )
        return reject( err );
      resolve( rows );
    } );
  } );
}

module.exports = {
  getUser(userId) {
    return query('SELECT * FROM user WHERE id = ?', [userId]);
  },
  getUserBySub(subId) {
    return query('SELECT * FROM user WHERE sub = ?', [subId]);
  },
}
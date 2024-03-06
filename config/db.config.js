'use strict';
const mysql = require('mysql');
//local mysql db connection
/*
const dbConn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root1234',
  database : 'simplysplit_db'
});
*/
const dbConn = mysql.createConnection({
  host     : 'srv999.hstgr.io',
  user     : 'u254608202_admin',
  password : 'G85a5seQjvy2avB',
  database : 'u254608202_simplysplit'
});

dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = dbConn;
'use strict';
const mysql = require('mysql');
const mysqlConfig = {
  host     : 'srv999.hstgr.io',
  user     : 'u254608202_admin',
  password : 'G85a5seQjvy2avB',
  database : 'u254608202_simplysplit'
};
//local mysql db connection
/*
const dbConn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root1234',
  database : 'simplysplit_db'
});
*/
var dbConn = mysql.createConnection(mysqlConfig);

const db = {
  execute : ()=>{
    return new Promise(async (resolve , reject)=>{
      dbConn = await mysql.createConnection(mysqlConfig);
      await dbConn.connect((err) => {
        console.log("DB Connected!");
        if (!err) {
          resolve(dbConn)
        }else{
          console.log("DB Error =>",err)
          //reject(err)
        }
      })
    })
    
  }

}
//module.exports = dbConn;
module.exports = db;
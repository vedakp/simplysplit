"use strict";
const db = require('./../config/db.config');

//User object create
var User = function (user) {
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.username = user.username;
  this.email = user.email;
  this.phone = user.phone;
  this.created_at = new Date();
  this.updated_at = new Date();
};


User.findAll = async function (result) {
  db.execute().then(dbConn =>{
    dbConn.query("Select * from users", function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
      dbConn.end(err=>{ console.log("DB connection Closed!")});
    })
  })

}

User.findById = function (id, result) {
  db.execute().then(dbConn =>{
    dbConn.query("Select * from users where id = ? ", id, function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          result(null, res);
        }
        dbConn.end(err=>{console.log("DB connection Closed!");});
      }
    );
  });
};

User.create = function (newUser, result) {
  db.execute().then(dbConn =>{
    dbConn.query("INSERT INTO users set ?", newUser, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res.insertId);
      }
      dbConn.end(err=>{console.log("DB connection Closed!");});
    });
  });
};

User.update = function (id, user, result) {
  let dateTime = +new Date();
  db.execute().then(dbConn =>{
    dbConn.query("UPDATE users SET first_name=?,last_name=?,email=?,phone=?,username=?,updated_at=? WHERE id = ?",
      [
        user.first_name,
        user.last_name,
        user.email,
        user.phone,
        user.username,
        (user.updated_at = dateTime),
        id,
      ],
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(null, err);
        } else {
          result(null, res);
        }
        dbConn.end(err=>{console.log("DB connection Closed!");});
      }
    );
  });
};

User.delete = function (id, result) {
  db.execute().then(dbConn =>{
    dbConn.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    });
    dbConn.end(err=>{console.log("DB connection Closed!")});
  });
};

module.exports = User;

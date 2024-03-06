"use strict";
var dbConn = require("./../config/db.config");
var db = require("./../config/db.config");

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

User.findAll = function (result) {
  // db.connect();
  dbConn.connect(function (err) {
    if (!err) {
      console.log("Connected!");
      dbConn.query("Select * from users", function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(null, err);
        } else {
          console.log("Users : ", res);
          result(null, res);
        }
        dbConn.end((error) => {
          console.log("Closed connection");
        });
      });
    } else {
      console.log("DB Connect error");
    }
  });

  //db.diconnect();
};

User.findById = function (id, result) {
  dbConn.connect(function (err) {
    if (!err) {
      console.log("Connected!");
      dbConn.query(
        "Select * from users where id = ? ",
        id,
        function (err, res) {
          if (err) {
            console.log("error: ", err);
            result(err, null);
          } else {
            result(null, res);
          }
          dbConn.end((error) => {
            console.log("Closed connection");
          });
        }
      );
    } else {
      console.log("DB Connect error");
    }
  });
};

User.create = function (newUser, result) {
  dbConn.query("INSERT INTO users set ?", newUser, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

User.update = function (id, user, result) {
  let dateTime = +new Date();
  dbConn.query(
    "UPDATE users SET first_name=?,last_name=?,email=?,phone=?,username=?,updated_at=? WHERE id = ?",
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
    }
  );
};

User.delete = function (id, result) {
  dbConn.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = User;

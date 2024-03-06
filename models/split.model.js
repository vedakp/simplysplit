"use strict";
var dbConn = require("../config/db.config");
var db = require("../config/db.config");

//User object create
var Split = function (split) {
  this.trx_id = split.trx_id;
  this.from_user_id = split.from_user_id;
  this.to_user_id = split.to_user_id;
  this.amount = split.amount;
  this.share_percentage = split.share_percentage;
  this.share_qnt = split.share_qnt;
  this.created_at = split.created_at;
  this.updated_at = new Date();
};

Split.findAll = function (result) {
  dbConn.query("Select * from splits", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("Users : ", res);
      result(null, res);
    }
  });
};

Split.findById = function (id, result) {
  dbConn.query("Select * from splits where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Split.findByUserId = function (id, result) {
  dbConn.query("Select * from splits where user_id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Split.findByTransactionId = function (id, result) {
  dbConn.query("Select * from splits where trx_id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Split.create = function (newSplit, result) {
  dbConn.query("INSERT INTO splits set ?", newSplit, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Split.update = function (id, split, result) {
    let dateTime = +new Date();
  dbConn.query(
    "UPDATE splits SET trx_id=?,from_user_id=?,to_user_id=?,amount=?,share_percentage=?,share_qnt=?,updated_at=? WHERE id = ?",
    [
      split.trx_id,
      split.from_user_id,
      split.to_user_id,
      split.amount,
      split.share_percentage,
      split.share_qnt,
      split.updated_at = dateTime,
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

Split.delete = function (id, result) {
  dbConn.query("DELETE from splits WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Split;


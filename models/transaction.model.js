"use strict";
var dbConn = require("../config/db.config");

//User object create
var Transaction = function (transaction) {
  this.user_id = transaction.user_id;
  this.group_id = transaction.group_id;
  this.amount = transaction.amount;
  this.currency = transaction.currency;
  this.currency_symbol = transaction.currency_symbol;
  this.created_at = transaction.created_at;
  this.updated_at = new Date();
  this.is_deleted = transaction.is_deleted;
};

Transaction.findAll = function (result) {
  dbConn.query("Select * from transactions", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("Users : ", res);
      result(null, res);
    }
  });
};

Transaction.findById = function (id, result) {
  dbConn.query("Select * from transactions where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Transaction.findByUserId = function (id, result) {
  dbConn.query("Select * from transactions where user_id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Transaction.findByGroupId = function (id, result) {
  dbConn.query("Select * from transactions where group_id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Transaction.getActiveTractionsByUser = function (id, result) {
  dbConn.query("Select * from transactions where is_deleted != 1 AND user_id = ?", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Transaction.create = function (newTransaction, result) {
  dbConn.query("INSERT INTO transactions set ?", newTransaction, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Transaction.update = function (id, transaction, result) {
    let dateTime = +new Date();
  dbConn.query(
    "UPDATE transactions SET user_id=?,group_id=?,amount=?,currency=?,currency_symbol=?,updated_at=? WHERE id = ?",
    [
      transaction.user_id,
      transaction.group_id,
      transaction.amount,
      transaction.currency,
      transaction.currency_symbol,
      transaction.updated_at = dateTime,
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

Transaction.delete = function (id, result) {
  dbConn.query("UPDATE transactions SET is_deleted=1 WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Transaction;


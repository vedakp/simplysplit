"use strict";
const db = require('./../config/db.config');
const Split = require('./../models/split.model');

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
  db.execute().then(dbConn =>{
    dbConn.query("Select * from transactions", function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("Users : ", res);
        result(null, res);
      }
      dbConn.end(err=>{ console.log("DB connection Closed!")});
    })
  });
};

Transaction.findById = function (id, result) {
  db.execute().then(dbConn =>{
    dbConn.query("Select * from transactions where id = ? ", id, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
      dbConn.end(err=>{ console.log("DB connection Closed!")});
    })
  });
};

Transaction.findByUserId = function (id, result) {
  db.execute().then(dbConn =>{
    dbConn.query("Select * from transactions where user_id = ? ", id, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
      dbConn.end(err=>{ console.log("DB connection Closed!")});
    })
  });
};

Transaction.findByGroupId = function (id, result) {
  db.execute().then(dbConn =>{
    dbConn.query("Select * from transactions where group_id = ? ", id, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
      dbConn.end(err=>{ console.log("DB connection Closed!")});
    })
  });
};

Transaction.getActiveTractionsByUser = function (id, result) {
  db.execute().then(dbConn =>{
    dbConn.query("Select * from transactions where is_deleted != 1 AND user_id = ?", id, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
      dbConn.end(err=>{ console.log("DB connection Closed!")});
    })
  });
};

Transaction.create = function (transactionData,splitData, result) {
  db.execute().then(dbConn =>{
    dbConn.query("INSERT INTO transactions set ?", transactionData, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res.insertId);
        console.log("Splits",splitData)
        for(let i = 0; i < splitData.length; i++){
          splitData[i].push(res.insertId)
        }
        let splitSql = "INSERT INTO splits (from_user_id,to_user_id,amount,share_percentage,share_qnt,trx_id) VALUES ?";
        dbConn.query(splitSql, [splitData], function (err, splitres) {
          if (err) {
            console.log("error: ", err);
            result(err, null);
          }else{
            console.log("Split created",splitres)
          }
        })
        result(null, res.insertId);
      }
      dbConn.end(err=>{ console.log("DB connection Closed!")});
    })
  });
};

Transaction.update = function (id, transaction, result) {
  let dateTime = +new Date();
  db.execute().then(dbConn =>{
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
      dbConn.end(err=>{ console.log("DB connection Closed!")});
    })
  });
};

Transaction.delete = function (id, result) {
  db.execute().then(dbConn =>{
    dbConn.query("UPDATE transactions SET is_deleted=1 WHERE id = ?", [id], function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
      dbConn.end(err=>{ console.log("DB connection Closed!")});
    })
  });
};

module.exports = Transaction;


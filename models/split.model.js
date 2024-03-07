"use strict";
const db = require('./../config/db.config');

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
  db.execute().then(dbConn =>{
    dbConn.query("Select * from splits", function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("Users : ", res);
        result(null, res);
      }
      dbConn.end(err=>{ console.log("DB connection Closed!")});
    });
  });
};

Split.findById = function (id, result) {
  db.execute().then(dbConn =>{
    dbConn.query("Select * from splits where id = ? ", id, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
      dbConn.end(err=>{ console.log("DB connection Closed!")});
    });
  });
};

Split.findByUserId = function (id, result) {
  db.execute().then(dbConn =>{
    dbConn.query("Select * from splits where user_id = ? ", id, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
      dbConn.end(err=>{ console.log("DB connection Closed!")});
    });
  });
};

Split.findByTransactionId = function (id, result) {
  db.execute().then(dbConn =>{
    var res = {};
    dbConn.query("Select * from transactions where id = ? ", id, function (err, transactionRes) {
      if (!err) {
        if(transactionRes.length > 0){
          res = transactionRes[0];
          dbConn.query("Select * from splits where trx_id = ? ", id, function (err, splitRes) {
            if (err) {
              console.log("error: ", err);
              result(err, null);
            } else {
              res['splits'] = splitRes;
              result(null, res);
            }
            dbConn.end(err=>{ console.log("DB connection Closed!")});
          });
        }else{
          result(null, {});
          dbConn.end(err=>{ console.log("DB connection Closed!")});
        }
      }else{
        console.log("error: ", err);
        result(err, null);
        dbConn.end(err=>{ console.log("DB connection Closed!")});
      }
    });
  });
};

Split.create = function (newSplit, result) {
  db.execute().then(dbConn =>{
    dbConn.query("INSERT INTO splits set ?", newSplit, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res.insertId);
        result(null, res.insertId);
      }
      dbConn.end(err=>{ console.log("DB connection Closed!")});
    });
  });
};

Split.update = function (id, split, result) {
  let dateTime = +new Date();
  db.execute().then(dbConn =>{
    dbConn.query("UPDATE splits SET trx_id=?,from_user_id=?,to_user_id=?,amount=?,share_percentage=?,share_qnt=?,updated_at=? WHERE id = ?",
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
        dbConn.end(err=>{ console.log("DB connection Closed!")});
      });
  });
};

Split.delete = function (id, result) {
  db.execute().then(dbConn =>{
    dbConn.query("DELETE from splits WHERE id = ?", [id], function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
      dbConn.end(err=>{ console.log("DB connection Closed!")});
    });
  });
};

module.exports = Split;


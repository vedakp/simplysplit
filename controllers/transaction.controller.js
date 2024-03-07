"use strict";
const Transaction = require("../models/transaction.model");

exports.findAll = function (req, res) {
  Transaction.findAll(function (err, user) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", user);
    res.send(user);
  });
};

exports.findById = function (req, res) {
  Transaction.findById(req.params.id, function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.create = function (req, res) {
  const new_transaction = new Transaction(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } 

  else if (!req.body.splits || req.body.splits.length <= 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required users" });
  } 

  else if (req.body.amount <= 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide valid split amount" });
  } 

  else if (!req.body.user_id) {
    res
      .status(400)
      .send({ error: true, message: "Please provide valid user info" });
  } 
  
  else {
    let transactionData = {
      user_id: new_transaction.user_id,
      group_id: new_transaction.group_id,
      amount: new_transaction.amount,
      currency: new_transaction.currency,
      currency_symbol: new_transaction.currency_symbol,
    }

    let splitData = [];

    req.body.splits.forEach((element) => {
      splitData.push([
        element.from_user_id,
        element.to_user_id,
        element.amount,
        element.share_percentage,
        element.share_qnt,
      ])
    })

    Transaction.create(transactionData,splitData, function (err, user) {
      if (err) res.send(err);
      res.json({
        error: false,
        message: "Transaction added successfully!",
        data: user,
      });
    });
  }
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Transaction.update(
      req.params.id,
      new User(req.body),
      function (err, user) {
        if (err) res.send(err);
        res.json({ error: false, message: "Transaction successfully updated" });
      }
    );
  }
};

exports.delete = function (req, res) {
  Transaction.delete(req.params.id, function (err, user) {
    if (err) res.send(err);
    res.json({ error: false, message: "Transaction successfully deleted" });
  });
};

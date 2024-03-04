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
  } else {
    Transaction.create(new_transaction, function (err, user) {
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

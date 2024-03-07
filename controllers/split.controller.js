"use strict";
const Split = require("../models/split.model");

exports.findAll = function (req, res) {
  Split.findAll(function (err, user) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", user);
    res.send(user);
  });
};

exports.findByTransactionId = function (req, res) {
  Split.findByTransactionId(req.params.id, function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.create = function (req, res) {
  const new_transaction = new Split(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Split.create(new_transaction, function (err, user) {
      if (err) res.send(err);
      res.json({
        error: false,
        message: "Split added successfully!",
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
    Split.update(
      req.params.id,
      new User(req.body),
      function (err, user) {
        if (err) res.send(err);
        res.json({ error: false, message: "Split successfully updated" });
      }
    );
  }
};

exports.delete = function (req, res) {
  Split.delete(req.params.id, function (err, user) {
    if (err) res.send(err);
    res.json({ error: false, message: "Split successfully deleted" });
  });
};

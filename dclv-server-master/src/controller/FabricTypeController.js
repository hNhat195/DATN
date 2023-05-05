const express = require("express");
const mongoose = require("mongoose");
const { FabricType } = require("../models/FabricType");

const getListFabricType = (req, res) => {
  FabricType.find({}).exec(function (err, result) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};

module.exports = { getListFabricType };

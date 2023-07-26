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

const getFabricTypesByMaterial = async (req, res) => {
  await FabricType.find({ material: req.params.material })
    .exec()
    .then((fabricTypes) => {
      res.status(200).json(fabricTypes);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

module.exports = { getListFabricType, getFabricTypesByMaterial };

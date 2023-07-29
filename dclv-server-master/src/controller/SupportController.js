const { Order } = require("../models/Order");
const mongoose = require("mongoose");
const { Support } = require("../models/Support");
const { OrderStatus, SubOrderStatus } = require("../constant/OrderStatus");

const mailer = require("../utils/mailer");

async function getNextSequenceValue(sequenceName) {
  let seq = await Counter.findOneAndUpdate(
    { counter_type: sequenceName },
    { $inc: { sequence_value: 1 } }
  ).exec();
  return seq.sequence_value;
}

const createSupport = async (req, res) => {
  try {
    let result = await Support.create({
      orderCode: req.body.orderCode,
      clientId: req.body.clientId,
      content: req.body.content,
      status: "requested",
      requestedAt: Date.now(),
    });

    res.send({ status: 200, result });
  } catch (err) {
    res.json({ status: 400, message: err });
  }
};

const getSupportsByClientId = async (req, res) => {
  Support.find({
    clientId: req.params.clientId,
  })

    .populate({
      path: "clientId",
      select: "name email address phone",
    })
    .exec(function (err, result) {
      if (err) res.json(err);
      else {
        res.json(result);
      }
    });
};

const getAllSupports = async (req, res) => {
  Support.find()
    .populate({
      path: "clientId",
      select: "name email address phone",
    })
    .exec(function (err, result) {
      if (err) res.json(err);
      else {
        res.json(result);
      }
    });
};

const responseSupport = async (req, res) => {
  Support.findOneAndUpdate(
    { _id: req.body.supportId },
    {
      feedback: req.body.feedback,
      staffId: req.body.staffId,
      responsedAt: Date.now(),
      status: "responsed",
    },
    function (err, result) {
      if (err) {
        return res.json({ message: "Error" });
      } else {
        return res.json(result);
      }
    }
  );
};

const getSupport = (req, res) => {
  Order.findOne({ _id: mongoose.Types.ObjectId(req.params.id) })
    .populate({
      path: "products",
      populate: {
        path: "fabricID",
        select: "fabricType color price -_id",
      },
      select: "quantity shipped -_id",
    })
    .populate({
      path: "clientID",
      select: "name email address phone",
    })
    .populate({
      path: "detailBill",
      populate: { path: "salesmanID", select: "name -_id" },
    })
    .populate({
      path: "subOrder",
      populate: {
        path: "products",
        populate: {
          path: "fabricID",
          select: "fabricType color price -_id",
        },
        select: "quantity shipped -_id",
      },
      select: "",
    })
    .exec(function (err, result) {
      if (err) res.json(err);
      else {
        res.json(result);
      }
    });
};

const updateSupport = (req, res) => {
  Order.findOneAndUpdate(
    { orderId: req.body.id },
    {
      note: req.body.note,
      receiverName: req.body.receiverName,
      receiverPhone: req.body.receiverPhone,
      receiverAddress: req.body.receiverAddress,
    },
    function (err, result) {
      if (err) {
        return res.json({ message: "Error" });
      } else {
        return res.json(result);
      }
    }
  );
};

module.exports = {
  updateSupport,
  createSupport,
  getSupport,
  getSupportsByClientId,
  getAllSupports,
  responseSupport,
};

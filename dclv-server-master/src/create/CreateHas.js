const mongoose = require("mongoose");
const { Has } = require("../models/Has");
const { getOneProduct } = require("../services/FabricRollService");
const { getOneOrder, getListOrderId } = require("../services/OrderService");

async function InsertToHas() {
  const listOrderId = await getListOrderId();

  listOrderId.forEach(async (item) => {
    const order = await getOneOrder(item);

    order.products.forEach(async (element) => {
      const fabricRoll = await getOneProduct(element);
    });
  });
}

async function IncreaseHas() {
  const data = await Has.find({}).exec();
  data.forEach((item) =>
    Has.updateOne(
      { _id: item._id },
      { $inc: { length: Math.floor(Math.random() * 5) } },
      { multi: true }
    ).exec(function (err, response) {
      if (err) console.log(err);
      else console.log(response);
    })
  );
}

module.exports = { InsertToHas, IncreaseHas };

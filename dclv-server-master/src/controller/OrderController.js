const { Order } = require("../models/Order");
const { Has } = require("../models/Has");
const { Item } = require("../models/Item");
const { FabricType } = require("../models/FabricType");
const { Customer } = require("../models/Customer");
const { Counter } = require("../models/Counter");
const mongoose = require("mongoose");
const { Bill } = require("../models/Bill");

async function getNextSequenceValue(sequenceName) {
  let seq = await Counter.findOneAndUpdate(
    { counter_type: sequenceName },
    { $inc: { sequence_value: 1 } }
  ).exec();
  return seq.sequence_value;
}

module.exports = {
  list: async (req, res) => {
    
    const page = Number.parseInt(req.query.page) || 0;
    const limit = Number.parseInt(req.query.limit) || 6;
    
    Order.find()
      .populate({
        path: "products",
        populate: {
          path: "colorCode",
          //   populate: {
          //     path: "typeId",
          //     select: "name -_id",
          //   },
          select: "colorCode typeId name -_id",
        },
        select: "colorCode length shippedLength -_id",
      })
      .populate({
        path: "detailBill",
        populate: [
          { path: "salesmanID", select: "name -_id" },
          { path: "clientID", select: "name -_id" },
        ],
      })
      .populate({
        path: "clientID",
        select: "name -_id",
      })
      // .skip(page * limit)
      // .limit(limit)
      .exec(function (err, result) {
        if (err) res.json(err);
        else {
          res.json(result);
        }
      });
  },
  create: async (req, res) => {
    try {
      const id = await getNextSequenceValue("orderId");
      const asyncRes = await Promise.all(
        req.body.products.map(async (item, idx) => {
          let colorIdList = await Item.find({
            colorCode: item.colorCode,
            // typeId: item.typeId,
          }).exec();

          let colorId = colorIdList[0];
          for (let i = 0; i < colorIdList.length; i++) {
            colorId = colorIdList[i];
            if (colorIdList[i].typeId === item.typeId) {
              break;
            }
          }
          let a = await Has.create({
            // orderId: id,
            colorCode: colorId._id,
            length: item.length,
            shippedLength: 0,
          });

          return a._id;
        })
      );
      let result = await Order.create({
        orderId: id,
        orderStatus: [
          {
            name: "pending",
            date: Date.now(),
          },
        ],
        note: req.body.note,
        receiverName: req.body.receiverName,
        receiverPhone: req.body.receiverPhone,
        receiverAddress: req.body.receiverAddress,
        deposit: req.body.deposit,
        clientID: mongoose.Types.ObjectId(req.body.clientID),
        detailBill: [],
        products: asyncRes,
      });
      asyncRes.forEach((item) => {
        Has.findOneAndUpdate({ _id: item }, { orderId: result._id }).exec();
      });
      //Update Has order id
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  },

  detail: (req, res) => {
    Order.findOne({ _id: mongoose.Types.ObjectId(req.params.id) })
      .populate({
        path: "products",
        populate: {
          path: "colorCode",
          populate: [
            {
              path: "typeId",
              select: "name -_id",
            },
            {
              path: "marketPriceId",
              options: { sort: { dayApplied: "desc" }, limit: 1 },
              select: "price -_id",
            },
          ],
          select: "colorCode typeId name -_id",
        },
        select: "colorCode length shippedLength -_id",
      })
      .populate({
        path: "clientID",
        select: "name email address phone",
      })
      .populate({
        path: "detailBill",
        populate: { path: "salesmanID", select: "name -_id" },
      })
      .exec(function (err, result) {
        if (err) res.json(err);
        else {
          res.json(result);
        }
      });
  },

  getListProductsById: (req, res) => {
    Order.findOne({ _id: mongoose.Types.ObjectId(req.params.id) }, "products")
      .populate({
        path: "products",
        populate: {
          path: "colorCode",
          populate: {
            path: "typeId",
            select: "name -_id",
          },
          select: "colorCode typeId name -_id",
        },
        select: "colorCode length shippedLength -_id",
      })
      .exec(function (err, result) {
        if (err) res.json(err);
        else res.json(result);
      });
  },

  updateInfo: (req, res) => {
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
  },

  updateStatus: async (req, res) => {
    const status = await Order.findOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      "orderStatus"
    ).exec();

    // if (status.orderStatus[status.orderStatus.length - 1].name !== "processing")
    //   Order.findOneAndUpdate(
    //     { _id: mongoose.Types.ObjectId(req.params.id) },
    //     {
    //       $push: {
    //         orderStatus: { name: req.body.status, reason: req.body.reason },
    //       },
    //     },
    //     function (err, result) {
    //       if (err) {
    //         return res.json({ message: "Error" });
    //       } else {
    //         return res.json(result);
    //       }
    //     }
    //   );
    if (status.orderStatus[status.orderStatus.length - 1].name === "pending" && req.body.status === "cancel") {
      Order.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.params.id) },
        {
          $push: {
            orderStatus: { name: req.body.status, reason: req.body.reason },
          },
        },
        function (err, result) {
          if (err) {
            return res.json({ message: "Error" });
          } else {
            return res.json(result);
          }
        }
      );
    }
      
  },

  cancleExportBill: async (req, res) => {
    const status = await Order.findOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      "orderStatus"
    ).exec();

    if (status.orderStatus[status.orderStatus.length - 1].name === "processing")
      Order.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.params.id) },
        {
          $pop: {
            orderStatus: 1,
          },
        },
        function (err, result) {
          if (err) {
            return res.json({ message: "Error" });
          } else {
            return res.json(result);
          }
        }
      );
  },

  deposit: async (req, res) => {
    try {
      if (req.query.date) {
        selectDate = req.query.date;
        yearSel = Number(selectDate.slice(0, 4));
        monthSel = Number(selectDate.slice(5, 7));
      } else {
        selectDate = new Date();
        monthSel = selectDate.getMonth() + 1;
        yearSel = selectDate.getFullYear();
      }
      const depositBillTotal = await Bill.aggregate([
        { $unwind: "$status" },
        { $match: { "status.name": "completed" } },
        { $addFields: { month: { $month: "$status.date" } } },
        { $addFields: { year: { $year: "$status.date" } } },
        { $match: { year: yearSel } },
        { $match: { month: monthSel } },
        {
          $group: {
            _id: null,
            depositBill: { $sum: "$valueBill" },
          },
        },
      ]);

      let resultBill;
      if (depositBillTotal?.length === 0) resultBill = 0;
      else {
        depositBillTotal.map((item) => (resultBill = item.depositBill));
      }

      const depositOrderTotal = await Order.aggregate([
        { $project: { _id: 1, orderTime: 1, deposit: 1 } },
        { $addFields: { month: { $month: "$orderTime" } } },
        { $addFields: { year: { $year: "$orderTime" } } },
        { $match: { year: yearSel } },
        { $match: { month: monthSel } },
        {
          $group: {
            _id: null,
            totalDeposit: { $sum: "$deposit" },
          },
        },
      ]);

      let resultOrder;
      if (depositOrderTotal?.length === 0) resultOrder = 0;
      else {
        depositOrderTotal.map((item) => (resultOrder = item.totalDeposit));
      }

      let result;
      result = resultBill + resultOrder;
      if (result === 0) result = "0";

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err });
    }
  },

  getTotalOrderbyMonth: async (req, res) => {
    try {
      if (req.query.date) {
        selectDate = req.query.date;
        yearSel = Number(selectDate.slice(0, 4));
        monthSel = Number(selectDate.slice(5, 7));
      } else {
        selectDate = new Date();
        monthSel = selectDate.getMonth() + 1;
        yearSel = selectDate.getFullYear();
      }
      const resultTotalOrder = await Order.aggregate([
        { $project: { _id: 1, orderTime: 1 } },
        { $addFields: { month: { $month: "$orderTime" } } },
        { $addFields: { year: { $year: "$orderTime" } } },
        { $match: { year: yearSel } },
        { $match: { month: monthSel } },
        {
          $group: {
            _id: null,
            monthlyorder: { $sum: 1 },
          },
        },
      ]);

      let result;
      if (resultTotalOrder?.length === 0) result = "0";
      else {
        resultTotalOrder.map((item) => (result = item.monthlyorder));
      }

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err });
    }
  },

  getFabricTypeOrder: (req, res) => {
    Order.find()
      .select("products")
      .populate({
        path: "products",
        populate: {
          path: "colorCode",
          //   populate: {
          //     path: "typeId",
          //     select: "name -_id",
          //   },
          select: "colorCode typeId name -_id",
        },
        select: "colorCode length shippedLength -_id",
      })
      .exec(function (err, result) {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
  },

  getOrderStatus: async (req, res) => {
    try {
      if (req.query.date) {
        selectDate = req.query.date;
        yearSel = Number(selectDate.slice(0, 4));
        monthSel = Number(selectDate.slice(5, 7));
      } else {
        selectDate = new Date();
        monthSel = selectDate.getMonth() + 1;
        yearSel = selectDate.getFullYear();
      }
      const result = await Order.aggregate([
        { $project: { _id: 1, orderTime: 1, orderStatus: 1 } },
        { $addFields: { month: { $month: "$orderTime" } } },
        { $addFields: { year: { $year: "$orderTime" } } },
        { $addFields: { lastStatus: { $last: "$orderStatus" } } },
        { $match: { year: yearSel } },
        { $match: { month: monthSel } },
        {
          $group: {
            _id: "$lastStatus.name",
            lastStatusOrder: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err });
    }
  },

  //query order hàng tháng (mỗi ngày trong 1 tháng)
  getOrderDaily: async (req, res) => {
    try {
      if (req.query.date) {
        selectDate = req.query.date;
        yearSel = Number(selectDate.slice(0, 4));
        monthSel = Number(selectDate.slice(5, 7));
      } else {
        selectDate = new Date();
        monthSel = selectDate.getMonth() + 1;
        yearSel = selectDate.getFullYear();
      }
      const result = await Order.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$orderTime" },
              month: { $month: "$orderTime" },
              date: { $dayOfMonth: "$orderTime" },
            },
            Total: { $sum: 1 },
          },
        },
        { $match: { "_id.year": yearSel } },
        { $match: { "_id.month": monthSel } },
        { $sort: { "_id.date": 1 } },
      ]);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err });
    }
  },

  getOrderFabricType: async (req, res) => {
    try {
      const result = await Order.aggregate([
        { $project: { _id: 1, orderTime: 1, products: 1 } },
        { $addFields: { month: { $month: "$orderTime" } } },
        { $addFields: { year: { $year: "$orderTime" } } },
        { $unwind: "$products" },
        {
          $lookup: {
            from: "FabricRoll",
            let: { bill_fabricRoll: "$fabricRoll" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$bill_fabricRoll"] } } },
              {
                $lookup: {
                  from: "Item",
                  let: { color_code: "$colorCode" },
                  pipeline: [
                    {
                      $match: {
                        $expr: { $eq: ["$colorCode", "$$color_code"] },
                      },
                    },
                    {
                      $lookup: {
                        from: "FabricType",
                        let: { type_id: "$typeId" },
                        pipeline: [
                          {
                            $match: { $expr: { $eq: ["$_id", "$$type_id"] } },
                          },
                        ],
                        as: "fabricType",
                      },
                    },
                    { $unwind: "$fabricType" },
                    {
                      $group: {
                        _id: "$fabricType.name",
                      },
                    },
                  ],
                  as: "item",
                },
              },
              { $unwind: "$item" },
            ],
            as: "fabricTypeSell",
          },
        },
        // { $unwind: "$fabricTypeSell" },
        // {
        //   $group: {
        //     _id: "$fabricTypeSell.item._id",
        //     countFabrictype: { $sum: 1 },
        //   },
        // },
        // { $sort: { countFabrictype: -1 } },
        // { $limit: 5 },
      ]);

      res.status(200).json(result);
      // {result.map((item) => (
      //   res.status(200).json(item.fabricRoll)
      // ))}
    } catch (err) {
      res.status(500).json({ err });
    }
  },
};

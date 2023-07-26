const { Order } = require("../models/Order");
const { FabricType } = require("../models/FabricType");
const { Customer } = require("../models/Customer");
const { Counter } = require("../models/Counter");
const mongoose = require("mongoose");
const { Bill } = require("../models/Bill");
const { OrderItem } = require("../models/OrderItem");
const { FabricRoll } = require("../models/FabricRoll");
const { Color } = require("../models/Color");
const { SubOrder } = require("../models/SubOrder");
const { SubOrderItem } = require("../models/SubOrderItem");
const { OrderStatus, SubOrderStatus } = require("../constant/OrderStatus");

const mailer = require("../utils/mailer");

async function getNextSequenceValue(sequenceName) {
  let seq = await Counter.findOneAndUpdate(
    { counter_type: sequenceName },
    { $inc: { sequence_value: 1 } }
  ).exec();
  return seq.sequence_value;
}

const list = async (req, res) => {
  const page = Number.parseInt(req.query.page) || 0;
  const limit = Number.parseInt(req.query.limit) || 6;
  Order.find()
    .populate({
      path: "products",
      populate: {
        path: "fabricID",
        populate: [
          {
            path: "fabricTypeId",
            select: "name -_id",
          },
          {
            path: "colorId",
            select: "colorCode -_id",
          },
        ],
        select: "fabricTypeId colorId -_id",
      },
      select: "quantity shipped -_id",
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
};

const create = async (req, res) => {
  try {
    const id = await getNextSequenceValue("orderId");
    const subOrderList = [];
    const productList = [];
    let totalQuantity = 0;

    let temp = await Order.create({
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
      products: productList,
      subOrder: subOrderList,
      totalQuantity: totalQuantity
    });
    await Promise.all(
      req.body.products.map(async (item, idx) => {
        let colorId = await Color.findOne({
          colorCode: item.colorCode,
        }).exec();

        let matId = await FabricType.findOne({
          name: item.typeId,
        }).exec();
        totalQuantity += item.length;

        let roll = await FabricRoll.findOne({
          fabricTypeId: matId,
          colorId: colorId,
        });

        let a = await OrderItem.create({
          orderId: temp._id,
          fabricID: roll._id,
          quantity: item.length,
          shipped: 0,
        });

        productList.push(a);

        return roll._id;
      })
    );

    let result = await Order.findOneAndUpdate(
      { _id: temp._id },
      {
        products: productList,
        totalQuantity: totalQuantity,
        // subOrder: subOrder,
      },
      { new: true }
    );

    res.send({ status: 200, result });
  } catch (err) {
    console.log(err);
    res.json({ status: 400, message: err });
  }
};

const detail = (req, res) => {
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

const createSubOrder = async (req, res) => {
  try {
    const productList = [];
    let totalQuantity = 0;

    let temp = await SubOrder.create({
      orderId: mongoose.Types.ObjectId(req.body.orderId),
      note: req.body.note,
      products: productList,
      totalQty: totalQuantity,
      subOrderStatus: [{ name: "ready", date: Date.now(), reason: "" }],
    });

    await Promise.all(
      req.body.products.map(async (item, idx) => {
        let colorId = await Color.findOne({
          colorCode: item.colorCode,
        }).exec();

        let matId = await FabricType.findOne({
          name: item.typeId,
        }).exec();
        totalQuantity += item.quantity;

        let roll = await FabricRoll.findOne({
          fabricTypeId: matId,
          colorId: colorId,
        });

        let a = await SubOrderItem.create({
          subOrderId: temp._id,
          fabricID: roll._id,
          quantity: item.quantity,
          shipped: 0,
        });

        productList.push(a);

        return roll._id;
      })
    );

    let result = await SubOrder.findOneAndUpdate(
      { _id: temp._id },
      {
        products: productList,
        totalQty: totalQuantity,
      },
      { new: true }
    );

    await Order.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.body.orderId) },
      {
        $push: {
          subOrder: result._id,
        },
      },
      {
        new: true,
      }
    );

    res.send({ status: 200, result });
  } catch (err) {
    console.log(err);
    res.json({ status: 400, message: err });
  }
};

const getListProductsById = (req, res) => {
  Order.findOne({ _id: mongoose.Types.ObjectId(req.params.id) }, "products")
    .populate({
      path: "products",
      populate: {
        path: "fabricID",
        select: "fabricType color price -_id",
      },
      select: "quantity shipped -_id",
    })
    .exec(function (err, result) {
      if (err) res.json(err);
      else res.json(result);
    });
};

const updateInfo = (req, res) => {
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

const updateStatusCancelOrder = async (req, res) => {
  try {
    const newOrderStatus = await Order.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      {
        $push: {
          orderStatus: { name: OrderStatus.CANCELED, reason: req.body.reason },
        },
      },
      {
        new: true,
      }
    );

    const listSubOrder = await SubOrder.find({
      orderId: mongoose.Types.ObjectId(req.params.id),
    });

    await Promise.all(
      listSubOrder.map((ele) => {
        return ele.update({
          $push: {
            subOrderStatus: {
              name: SubOrderStatus.CANCELED,
              reason: req.body.reason,
            },
          },
        });
      })
    );

    return res.json({
      message: "Cập nhật trạng thái đơn hàng thành công",
      status: 200,
      data: newOrderStatus,
    });
  } catch (error) {
    return res.json({
      message: "Cập nhật trạng thái thất bại",
      status: 400,
    });
  }
};

const cancelSubOrder = async (req, res) => {
  try {
    const newSubOrderStatus = await SubOrder.findOne({
      _id: mongoose.Types.ObjectId(req.params.id),
    }).exec();
    const latestStatus =
      newSubOrderStatus.subOrderStatus[
        newSubOrderStatus.subOrderStatus.length - 1
      ].name;

    if (
      latestStatus == SubOrderStatus.READY ||
      latestStatus == SubOrderStatus.IN_PROGRESS
    ) {
      const updatedStatus = await SubOrder.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.params.id) },
        {
          $push: {
            subOrderStatus: {
              name: OrderStatus.CANCELED,
              reason: req.body.reason,
            },
          },
        },
        {
          new: true,
        }
      );

      return res.json({
        message: "Hủy sub order thành công",
        status: 200,
        data: updatedStatus,
      });
    } else {
      return res.json({
        message: "Không thể hủy sub order này",
        status: 400,
      });
    }
  } catch (error) {
    return res.json({
      message: "Hủy sub order thất bại",
      status: 400,
    });
  }
};

const cancleExportBill = async (req, res) => {
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
};

const deposit = async (req, res) => {
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
};

const getTotalOrderbyMonth = async (req, res) => {
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
};

const updateStatus = async (req, res) => {
  const status = await Order.findOne(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    "orderStatus"
  ).exec();
  const lastStatus = status.orderStatus[status.orderStatus.length - 1].name;
  switch (lastStatus) {
    case OrderStatus.PENDING:
      Order.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.params.id) },
        {
          $push: {
            orderStatus: {
              name: OrderStatus.READY,
              reason: req.body.reason || "",
            },
          },
        },
        {
          new: true,
        },
        function (err, result) {
          if (err) {
            return res.json({ message: "Error" });
          } else {
            return res.json(result);
          }
        }
      );
      break;
    case OrderStatus.READY:
      Order.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.params.id) },
        {
          $push: {
            orderStatus: {
              name: OrderStatus.IN_PROGRESS,
              reason: req.body.reason || "",
            },
          },
        },
        {
          new: true,
        },
        function (err, result) {
          if (err) {
            return res.json({ message: "Error" });
          } else {
            return res.json(result);
          }
        }
      );
      break;
    case OrderStatus.IN_PROGRESS:
      Order.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.params.id) },
        {
          $push: {
            orderStatus: {
              name: OrderStatus.COMPLETED,
              reason: req.body.reason || "",
            },
          },
        },
        {
          new: true,
        },
        function (err, result) {
          if (err) {
            return res.json({ message: "Error" });
          } else {
            return res.json(result);
          }
        }
      );
      break;
    default:
      break;
  }
};

const updateSubOrderStatus = async (req, res) => {
  const status = await SubOrder.findOne(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    "subOrderStatus"
  ).exec();
  const lastStatus =
    status.subOrderStatus[status.subOrderStatus.length - 1].name;
  switch (lastStatus) {
    case SubOrderStatus.READY:
      SubOrder.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.params.id) },
        {
          $push: {
            subOrderStatus: {
              name: SubOrderStatus.IN_PROGRESS,
              reason: req.body.reason || "",
            },
          },
        },
        {
          new: true,
        },
        function (err, result) {
          if (err) {
            return res.json({ message: "Error" });
          } else {
            return res.json(result);
          }
        }
      );
      break;
    case SubOrderStatus.IN_PROGRESS:
      SubOrder.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.params.id) },
        {
          $push: {
            subOrderStatus: {
              name: SubOrderStatus.COMPLETED,
              reason: req.body.reason || "",
            },
          },
        },
        {
          new: true,
        },
        function (err, result) {
          if (err) {
            return res.json({ message: "Error" });
          } else {
            return res.json(result);
          }
        }
      );
      await SubOrderItem.updateMany(
        { subOrderId: mongoose.Types.ObjectId(req.params.id) },
        [
          {
            $set: {
              shipped: {
                $toInt: "$quantity"
              }
            }
          }
        ]
      );
      const subOrderItemList = await SubOrderItem.find(
        { subOrderId: mongoose.Types.ObjectId(req.params.id) },
      )
      const fabricIdList = subOrderItemList.map((item) => item.fabricID)
      const quantityList = subOrderItemList.map((item) => item.quantity)

      const foundSubOrder = await SubOrder.findOne(
        { _id: mongoose.Types.ObjectId(req.params.id) },
      )
      const orderId = foundSubOrder.orderId

      for (let i = 0; i < fabricIdList.length; i++) {
        await OrderItem.findOneAndUpdate(
          {
            orderId: orderId,
            fabricID: fabricIdList[i]
          },
          {
            $inc: { shipped: quantityList[i] }
          },
          { new: true }
        )
      }

      const subOrderList = await SubOrder.find({ orderId: orderId })
      const filtered = subOrderList.filter(item => item.subOrderStatus[item.subOrderStatus.length - 1].name == "completed")

      if (filtered.length > 0) {
        let total = 0
        for (let i = 0; i < filtered.length; i++) {
          total += filtered[i].totalQty
        }

        const currentOrder = await Order.findOne({ _id: orderId })

        if (total == currentOrder.totalQuantity) {
          Order.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(orderId) },
            {
              $push: {
                orderStatus: {
                  name: OrderStatus.COMPLETED,
                  reason: req.body.reason || "",
                },
              },
            },
            {
              new: true,
            },
          );
        }
      }

      break;
    default:
      break;
  }
};

const getFabricTypeOrder = (req, res) => {
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
};

const getOrderStatus = async (req, res) => {
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
};

//query order hàng tháng (mỗi ngày trong 1 tháng)
const getOrderDaily = async (req, res) => {
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
};

const getOrderFabricType = async (req, res) => {
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
};

const testUpdateSubOrder = async (req, res) => {
  try {
    const subOrderItemList = await SubOrderItem.find(
      { subOrderId: mongoose.Types.ObjectId(req.params.id) },
    )

    const foundSubOrder = await SubOrder.findOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
    )
    const orderId = foundSubOrder.orderId

    const subOrderList = await SubOrder.find({ orderId: orderId })
    const filtered = subOrderList.filter(item => item.subOrderStatus[item.subOrderStatus.length - 1].name == "completed")

    if (filtered.length > 0) {
      let total = 0
      for (let i = 0; i < filtered.length; i++) {
        total += filtered[i].totalQty
      }

      const currentOrder = await Order.findOne({ _id: orderId })

      if (total == currentOrder.totalQuantity) {
        Order.findOneAndUpdate(
          { _id: mongoose.Types.ObjectId(orderId) },
          {
            $push: {
              orderStatus: {
                name: OrderStatus.COMPLETED,
                reason: req.body.reason || "",
              },
            },
          },
          {
            new: true,
          },

        );
      }
    }
    res.status(200).json(filtered);
  } catch (err) {
    res.status(500).json({ err });
  }
}

const getSubOrder = async (req, res) => {
  SubOrder.findOne({ _id: mongoose.Types.ObjectId(req.params.id) })
    .populate({
      path: "products",
      populate: {
        path: "fabricID",
        select: "fabricType color price -_id",
      },
      select: "quantity shipped -_id",
    })
    .exec(function (err, result) {
      if (err) res.json(err);
      else res.json(result);
    });
}

const getCompletedOrder = async (req, res) => {
  Order.find({ orderStatus: { $elemMatch: { name: 'completed' } }  })
    .exec(function (err, result) {
      if (err) res.json(err);
      else res.json(result);
    });
}

const getCompletedSubOrder = async (req, res) => {
  SubOrder.find({ subOrderStatus: { $elemMatch: { name: 'completed' } }  })
  .exec(function (err, result) {
    if (err) res.json(err);
    else res.json(result);
  });
}

const getCompletedSubOrderItem = async (req, res) => {
  SubOrder.find({ subOrderStatus: { $elemMatch: { name: 'completed' } }  })
  .populate({
    path: "products",
    populate: {
      path: "fabricID",
      select: "fabricType color price -_id",
    },
    select: "quantity shipped -_id",
  })
  .exec(function (err, result) {
    if (err) res.json(err);
    else res.json(result);
  });
}

module.exports = {
  getTotalOrderbyMonth,
  deposit,
  cancleExportBill,
  updateStatusCancelOrder,
  updateInfo,
  getListProductsById,
  list,
  create,
  detail,
  getFabricTypeOrder,
  getOrderStatus,
  getOrderDaily,
  getOrderFabricType,
  updateStatus,
  createSubOrder,
  cancelSubOrder,
  updateSubOrderStatus,
  testUpdateSubOrder,
  getSubOrder,
  getCompletedOrder,
  getCompletedSubOrder,
  getCompletedSubOrderItem,
};

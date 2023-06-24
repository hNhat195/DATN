const { SubOrder } = require("../models/SubOrder");
const { SubOrderItem } = require("../models/SubOrderItem");
const { Order } = require("../models/Order");
const { OrderItem } = require("../models/OrderItem");
const { OrderStatus, SubOrderStatus } = require("../constant/OrderStatus");

async function getNextSequenceValue(sequenceName) {
  let seq = await Counter.findOneAndUpdate(
    { counter_type: sequenceName },
    { $inc: { sequence_value: 1 } }
  ).exec();
  return seq.sequence_value;
}

const createSubOrder = async (req, res) => {
  try {
    const id = await getNextSequenceValue("SubOrderId");
    const subOrderList = [];
    const productList = [];
    let totalQuantity = 0;
    const orderId = mongoose.Types.ObjectId(req.params.id);

    let temp = await SubOrder.create({
      orderId: id,
      subOrderStatus: [
        {
          name: "ready",
          date: Date.now(),
        },
      ],
      note: req.body.note,
      products: productList,
      subOrder: subOrderList,
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

    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

const updateStatusSubOrder = async (req, res) => {
  const subOrderId = mongoose.Types.ObjectId(req.params.id);

  try {
    const subOrder = await SubOrder.find({
      id: subOrderId,
    }).exec();

    switch (subOrder.subOrderStatus[subOrder.subOrderStatus.length - 1]) {
      case SubOrderStatus.READY:
        await SubOrder.updateOne(
          {
            id: subOrderId,
          },
          {
            $push: {
              subOrderStatus: {
                name: SubOrderStatus.IN_TRANSIT,
                reason: req.body.reason || "",
              },
            },
          }
        );
        break;
      case SubOrderStatus.IN_TRANSIT:
        break;
      default:
        break;
    }

    const order = await Order.findOne({
      id: subOrder.orderId,
    });
  } catch (error) {}
};

const cancelSubOrder = async (req, res) => {
  const subOrderId = mongoose.Types.ObjectId(req.params.id);
  try {
    const newSub = await SubOrder.findByIdAndUpdate(subOrderId, {
      $push: {
        subOrderStatus: {
          name: SubOrderStatus.CANCELED,
          reason: req.body.reason || "",
        },
      },
    });
    res.json({
      status: 200,
      message: "Success",
      data: newSub,
    });
  } catch (err) {
    res.json({
      status: 400,
      message: err,
    });
  }
};

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

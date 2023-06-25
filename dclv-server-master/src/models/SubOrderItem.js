const mongoose = require("mongoose");
const { Schema } = mongoose;
const SubOrderItemSchema = new Schema(
  {
    subOrderId: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    fabricID: {
      type: Schema.Types.ObjectId,
      default: null,
      required: true,
      ref: "FabricRoll",
    },
    quantity: {
      type: Number,
      default: 0,
      required: true,
    },
    shipped: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { collection: "SubOrderItem" }
);
const SubOrderItem = mongoose.model("SubOrderItem", SubOrderItemSchema);
module.exports = { SubOrderItem };

const mongoose = require("mongoose");
const { Schema } = mongoose;
const SubOrderSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
    subOrderStatus: [
      {
        name: { type: String, default: "ready" },
        date: { type: Date, default: Date.now() },
        reason: { type: String, default: "" },
      },
    ],
    note: {
      type: String,
      default: "",
      required: false,
    },
    totalQty: {
      type: Number,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "OrderItem",
      },
    ],
  },
  { collection: "SubOrder" }
);
const Order = mongoose.model("SubOrder", SubOrderSchema);
module.exports = { Order };

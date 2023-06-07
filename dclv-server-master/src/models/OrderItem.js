const mongoose = require("mongoose");
const { Schema } = mongoose;
const OrderItemSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    fabricID: {
      type: Schema.Types.ObjectId,
      default: null,
      required: true,
      ref: "Fabric",
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
  { collection: "OrderItem" }
);
const Has = mongoose.model("OrderItem", OrderItemSchema);
module.exports = { Has };

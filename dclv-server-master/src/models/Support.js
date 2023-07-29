const mongoose = require("mongoose");
const { Schema } = mongoose;
const SupportSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      default: null,
      required: true,
    },
    clientID: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: "Customer",
      required: true,
    },
    staffId: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: "Staff",
    },
    content: {
      type: String,
      default: "",
      required: true,
    },
    feedback: {
      type: String,
      default: "",
    },
    requestedAt: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    responsedAt: {
      type: Date,
      default: Date.now(),
      required: true,
    },
  },
  { collection: "Support" }
);

const Support = mongoose.model("Support", SupportSchema);
module.exports = { Support };

const mongoose = require("mongoose");
const { Schema } = mongoose;
const SupportSchema = new Schema(
  {
    // orderId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Order",
    //   default: null,
    //   required: true,
    // },
    orderCode: {
      type: Number,
      default: null,
      required: true,
    },
    clientId: {
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
    status: {
      type: String,
      enum: ["requested", "responsed", "canceled"],
      default: "requested",
      required: true,
    },
    requestedAt: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    responsedAt: {
      type: Date,
      default: null,
    },
  },
  { collection: "Support" }
);

const Support = mongoose.model("Support", SupportSchema);
module.exports = { Support };

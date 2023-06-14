const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ColorSchema = new Schema(
  {
    dayAdded: { type: Date, default: Date.now() },
    colorCode: {
      type: String,
      default: "",
      required: true,
    },
  },
  { collection: "FabricRoll" }
);

const FabricRoll = mongoose.model("Color", ColorSchema);

module.exports = { FabricRoll };

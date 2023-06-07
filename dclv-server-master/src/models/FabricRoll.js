const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FabricRollSchema = new Schema(
  {
    status: { type: Boolean, default: true },
    dayAdded: { type: Date, default: Date.now() },
    warehouseId: { type: String, default: "" },
    fabricTypeId: {
      type: mongoose.Types.ObjectId,
      ref: "FabricType",
      require: true,
    },
    colorId: { type: mongoose.Types.ObjectId, ref: "Color", require: true },
    price: { type: Number, require: true },
    image: [{ type: String, default: "" }],
  },
  { collection: "FabricRoll" }
);

const FabricRoll = mongoose.model("FabricRoll", FabricRollSchema);

module.exports = { FabricRoll };

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
    fabricType: { type: String, require: true },
    colorId: { type: mongoose.Types.ObjectId, ref: "Color", require: true },
    color: { type: String, require: true },

    price: { type: Number, require: true },
    image: [{ type: String, default: "" }],
    descriptions: { type: String, default: "" },
  },
  { collection: "FabricRoll" }
);
FabricRollSchema.index({ fabricTypeId: 1, colorId: 1 }, { unique: true });

const FabricRoll = mongoose.model("FabricRoll", FabricRollSchema);

module.exports = { FabricRoll };

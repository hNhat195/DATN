const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FabricTypeSchema = new Schema(
  {
    id: { type: String, default: "", required: true },
    name: { type: String, default: "", required: true },
  },
  { collection: "FabricType" },
  { toJSON: { virtuals: true }}
);

FabricTypeSchema.virtual("Item", {
  ref: "Item",
  foreignField: "typeId",
  localField: "_id"
});
const FabricType = mongoose.model("FabricType", FabricTypeSchema);

module.exports = { FabricType };

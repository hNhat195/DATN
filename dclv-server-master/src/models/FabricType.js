const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FabricTypeSchema = new Schema(
  {
    name: { type: String, default: "", required: true, unique: true },
    material: { type: String, default: "", required: true },
    slug: { type: String, required: true, unique: true },
  },
  { collection: "FabricType" },
  { toJSON: { virtuals: true } }
);

FabricTypeSchema.virtual("Item", {
  ref: "Item",
  foreignField: "typeId",
  localField: "_id",
});
const FabricType = mongoose.model("FabricType", FabricTypeSchema);

module.exports = { FabricType };

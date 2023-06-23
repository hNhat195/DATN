const { FabricType } = require("../models/FabricType");
const fabricList1 = require("../../data/linen-fabric.json");
const fabricList2 = require("../../data/merino-fabric.json");
const fabricList3 = require("../../data/silk-fabric.json");
const { Color } = require("../models/Color");
const { FabricRoll } = require("../models/FabricRoll");
const createFabricType = async () => {
  fabricList3
    .map((ele) => {
      return { name: ele.material };
    })
    .forEach(async (ele) => {
      FabricType.create(ele);
    });
};

const createColor = async () => {
  fabricList1
    .concat(fabricList2)
    .concat(fabricList3)
    .map((ele) => {
      return { colorCode: ele.color };
    })
    .forEach(async (ele) => {
      await Color.create(ele);
    });
};

const CreateFabricRoll = async () => {
  const F = fabricList1.map(async (ele) => {
    const colorId = await Color.findOne({ colorCode: ele.color });

    const fabricTypeId = await FabricType.findOne({ name: ele.material });
    console.log(colorId, fabricTypeId);
    // if (colorId.colorCode == null) {
    //   console.log("OK");
    // }
    // if (colorId.colorCode && fabricTypeId.name)
    //   return {
    //     fabricTypeId: fabricTypeId._id,
    //     colorId: colorId._id,
    //     image: ele.images,
    //   };
  });
  // console.log(F);
  // FabricRoll.insertMany(F);
};
module.exports = { createFabricType, createColor, CreateFabricRoll };

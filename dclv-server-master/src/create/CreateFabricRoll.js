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

const upsertFabricRoll = async () => {
  fabricList1
    .concat(fabricList2)
    .concat(fabricList3)
    .forEach(async (fabric, index) => {
      const color = await Color.findOne({ colorCode: fabric.color });
      const fabricType = await FabricType.findOne({ name: fabric.material });

      FabricRoll.findOneAndUpdate(
        { fabricTypeId: fabricType._id, colorId: color._id },
        {
          $set: {
            name: fabric.product_name,
            descriptions: fabric.description,
            color: fabric.color,
            fabricType: fabric.material,
          },
        },
        { new: true }
      )
        .then((updatedRoll) => {
          console.log(updatedRoll);
        })
        .catch((error) => {
          console.log(error);
        });
    });
};

function convertToSlug(text) {
  return text
    .trim() // Remove leading and trailing spaces
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace consecutive hyphens with a single hyphen
}

const createSlugForFabricRoll = async () => {
  try {
    const fabrics = await FabricRoll.find({});
    for (const fabric of fabrics) {
      fabric.slug = convertToSlug(fabric.name);

      await fabric.save();
    }
    console.log("Field updated for all fabrics.");
  } catch (error) {
    console.error("Error updating field:", error);
  }
};

const findKeyword = (string, keywords) => {
  for (let i = 0; i < keywords.length; i++) {
    if (string.includes(keywords[i])) {
      return keywords[i];
    }
  }
  return "silk";
};

const upsertMaterialAndSlugForFabricType = async () => {
  const currentMaterial = ["linen", "merino", "silk"];
  try {
    const fabricTypes = await FabricType.find({});
    console.log(fabricTypes, "fabricTypesfabricTypesfabricTypes");
    for (const fabricType of fabricTypes) {
      fabricType.slug = convertToSlug(fabricType.name);
      fabricType.material = findKeyword(
        fabricType.name.toLowerCase(),
        currentMaterial
      );
      await fabricType.save();
    }
    console.log("Field updated for all fabricTypes.");
  } catch (error) {
    console.error("Error updating field:", error);
  }
};

module.exports = {
  createFabricType,
  createColor,
  CreateFabricRoll,
  upsertFabricRoll,
  createSlugForFabricRoll,
  upsertMaterialAndSlugForFabricType,
};

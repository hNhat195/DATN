const { json } = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const qs = require("qs");
var _ = require("lodash");

const { FabricRoll } = require("../models/FabricRoll");
const { FabricType } = require("../models/FabricType");
const { Item } = require("../models/Item");
const { MarketPrice } = require("../models/MarketPrice");
const { Color } = require("../models/Color");
const ObjectId = require("mongoose").Types.ObjectId;

const getProductsHomePage = async (req, res) => {
  try {
    const products = await FabricRoll.find().limit(6);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProductsByMaterialSlug = async (req, res) => {
  try {
    // Find the Type with the given name
    const types = await FabricType.find({
      material: req.params.materialSlug,
    });
    if (!types) {
      res.status(500).json("Material not found!");
    }
    const typeIds = types.map((type) => type._id);
    // Find all products that have the found type's _id as their typeid
    const products = await FabricRoll.find({
      fabricTypeId: { $in: typeIds },
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProductsByCollectionId = async (req, res) => {
  await FabricRoll.find({ fabricTypeId: req.params.id })
    .exec()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

const getProductBySlug = async (req, res) => {
  await FabricRoll.findOne({ slug: req.params.slug })
    .exec()
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

const searchProductBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const foundProducts = await FabricRoll.find({
      slug: { $regex: slug },
    }).exec();
    return res.json({
      message: "Thành công",
      status: 200,
      data: foundProducts,
    });
  } catch (error) {
    return res.json({
      message: "Thất bại",
      status: 400,
    });
  }
};

const getProductById = async (req, res) => {
  await FabricRoll.findById(req.params.id)
    .exec()
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

const getProductList1 = async (req, res) => {
  try {
    const products = await FabricType.aggregate([
      {
        $lookup: {
          from: "FabricRoll",
          let: { type_id: "$id" },
          pipeline: [
            {
              $match: {
                $and: [
                  {
                    $expr: {
                      $eq: ["$$type_id", { $substr: ["$colorCode", 0, 2] }],
                    },
                  },
                  { $expr: { $eq: ["$status", true] } },
                ],
              },
            },
            {
              $group: {
                _id: "$lot",
                count: { $sum: 1 },
                colorCode: { $first: "$colorCode" },
              },
            },
            {
              $lookup: {
                from: "Item",
                let: { color_code: "$colorCode" },
                pipeline: [
                  {
                    $match: { $expr: { $eq: ["$colorCode", "$$color_code"] } },
                  },
                  {
                    $group: {
                      _id: null,
                      name: { $first: "$name" },
                    },
                  },
                ],
                as: "itemName",
              },
            },
            { $unwind: "$itemName" },
          ],
          as: "fabricRoll",
        },
      },
    ]);

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ err });
  }
};

//Get all product in db
const getProductList = async (req, res) => {
  try {
    const products = await FabricRoll.aggregate([
      {
        $lookup: {
          from: "Item",
          let: { color_code: "$colorCode" },
          pipeline: [
            { $match: { $expr: { $eq: ["$colorCode", "$$color_code"] } } },
            { $unwind: { path: "$marketPriceId" } },
            {
              $lookup: {
                from: "MarketPrice",
                let: { market_price_id: "$marketPriceId" },
                pipeline: [
                  {
                    $match: { $expr: { $eq: ["$_id", "$$market_price_id"] } },
                  },
                ],
                as: "marketPrice",
              },
            },

            { $unwind: "$marketPrice" },

            {
              $lookup: {
                from: "FabricType",
                let: { type_id: "$typeId" },
                pipeline: [
                  {
                    $match: { $expr: { $eq: ["$_id", "$$type_id"] } },
                  },
                ],
                as: "fabricType",
              },
            },
            { $unwind: "$fabricType" },
            {
              $group: {
                _id: "$_id",
                colorCode: { $first: "$colorCode" },
                name: { $first: "$name" },
                marketPrice: { $push: "$marketPrice" },
                fabricType: { $first: "$fabricType" },
              },
            },
          ],
          as: "item",
        },
      },
      { $unwind: "$item" },
    ]);

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ err });
  }
};

//Get specific product with its id
// const getProductById = async (req, res) => {
//   try {
//     const product = await FabricRoll.aggregate([
//       { $match: { _id: mongoose.Types.ObjectId(req.query.id) } },
//       {
//         $lookup: {
//           from: "Item",
//           let: { color_code: "$colorCode" },
//           pipeline: [
//             { $match: { $expr: { $eq: ["$colorCode", "$$color_code"] } } },
//             { $unwind: { path: "$marketPriceId" } },
//             {
//               $lookup: {
//                 from: "MarketPrice",
//                 let: { market_price_id: "$marketPriceId" },
//                 pipeline: [
//                   {
//                     $match: { $expr: { $eq: ["$_id", "$$market_price_id"] } },
//                   },
//                 ],
//                 as: "marketPrice",
//               },
//             },

//             { $unwind: "$marketPrice" },

//             {
//               $lookup: {
//                 from: "FabricType",
//                 let: { type_id: "$typeId" },
//                 pipeline: [
//                   {
//                     $match: { $expr: { $eq: ["$_id", "$$type_id"] } },
//                   },
//                 ],
//                 as: "fabricType",
//               },
//             },
//             { $unwind: "$fabricType" },
//             {
//               $group: {
//                 _id: "$_id",
//                 colorCode: { $first: "$colorCode" },
//                 name: { $first: "$name" },
//                 marketPrice: { $push: "$marketPrice" },
//                 fabricType: { $first: "$fabricType" },
//               },
//             },
//           ],
//           as: "item",
//         },
//       },
//       { $unwind: "$item" },
//     ]);

//     res.status(200).json(product[0]);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

//Get list fabric with ids
const getListFabricRollWithIds = async (req, res) => {
  const body = qs.parse(req.body);
  const ids = body.ids || [];
  ids.forEach((item) => ids.push(mongoose.Types.ObjectId(item)));
  try {
    const result = await FabricRoll.aggregate([
      { $match: { _id: { $in: ids } } },
      {
        $lookup: {
          from: "Item",
          let: { color_code: "$colorCode" },
          pipeline: [
            { $match: { $expr: { $eq: ["$colorCode", "$$color_code"] } } },
            { $unwind: { path: "$marketPriceId" } },
            {
              $lookup: {
                from: "MarketPrice",
                let: { market_price_id: "$marketPriceId" },
                pipeline: [
                  {
                    $match: { $expr: { $eq: ["$_id", "$$market_price_id"] } },
                  },
                ],
                as: "marketPrice",
              },
            },

            { $unwind: "$marketPrice" },

            {
              $lookup: {
                from: "FabricType",
                let: { type_id: "$typeId" },
                pipeline: [
                  {
                    $match: { $expr: { $eq: ["$_id", "$$type_id"] } },
                  },
                ],
                as: "fabricType",
              },
            },
            { $unwind: "$fabricType" },
            {
              $group: {
                _id: "$_id",
                colorCode: { $first: "$colorCode" },
                name: { $first: "$name" },
                marketPrice: { $push: "$marketPrice" },
                fabricType: { $first: "$fabricType" },
              },
            },
          ],
          as: "item",
        },
      },
      { $unwind: "$item" },
    ]);
    res.status(200).json(result);
    // res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get sort list fabric roll with ids
const getFabricRollOfBill = async (req, res) => {
  const body = qs.parse(req.body);

  const ids = body.ids || [];
  ids.forEach((item) => ids.push(mongoose.Types.ObjectId(item)));
  try {
    const result = await FabricRoll.aggregate([
      { $match: { _id: { $in: ids } } },
      {
        $lookup: {
          from: "Item",
          let: { color_code: "$colorCode" },
          pipeline: [
            { $match: { $expr: { $eq: ["$colorCode", "$$color_code"] } } },
            { $unwind: { path: "$marketPriceId" } },
            {
              $lookup: {
                from: "MarketPrice",
                let: { market_price_id: "$marketPriceId" },
                pipeline: [
                  {
                    $match: { $expr: { $eq: ["$_id", "$$market_price_id"] } },
                  },
                ],
                as: "marketPrice",
              },
            },

            { $unwind: "$marketPrice" },

            {
              $lookup: {
                from: "FabricType",
                let: { type_id: "$typeId" },
                pipeline: [
                  {
                    $match: { $expr: { $eq: ["$_id", "$$type_id"] } },
                  },
                ],
                as: "fabricType",
              },
            },
            { $unwind: "$fabricType" },
            {
              $group: {
                _id: "$_id",
                colorCode: { $first: "$colorCode" },
                name: { $first: "$name" },
                marketPrice: { $push: "$marketPrice" },
                fabricType: { $first: "$fabricType" },
              },
            },
          ],
          as: "item",
        },
      },
      { $unwind: "$item" },
    ]);

    var lastResult = _.mapValues(_.groupBy(result, "colorCode"), (clist) =>
      clist.map((item) => _.omit(item, "colorCode"))
    );
    res.status(200).json(Object.values(lastResult));
    // res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Update product status
const updateProductStatus = async (req, res) => {
  try {
    const body = req.body;
    const id = mongoose.Types.ObjectId(req.params.id);

    FabricRoll.findOneAndUpdate({ _id: id }, body, function (err, data) {
      if (!err) res.status(200).json("Update Status successfully!");
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

// Update market price
const updateMarketPrice = async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;

    const newMarketPrice = new MarketPrice({
      dayApplied: Date.now(),
      price: body.price,
    });

    newMarketPrice.save(function (err) {
      if (!err) console.log(newMarketPrice);
      else console.log(err);
    });
    Item.findByIdAndUpdate(
      { _id: id },
      {
        $push: { marketPriceId: newMarketPrice._id },
      },
      function (err, data) {
        if (!err) res.status(200).json("Update Market Price successfully!");
      }
    );
  } catch (err) {
    res.status(500).json({ err });
  }
};
const getChartWarehouseTrue = async (req, res) => {
  try {
    const result = await FabricRoll.aggregate([
      // {$unwind: "$status"},
      // // {$unwind: "$status.name"},
      { $match: { status: true } },
      // {$project: {status: 1}},
      // {$unwind: "$fabricRoll"},
      {
        $group: {
          _id: "$warehouseId",
          countFabric: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      // }}
      // { $count: "warehouseId" }
    ]);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};

// const getFabricTypeSell = async (req, res) => {
//   try {
//     const result = await FabricRoll.aggregate([
//       // {$unwind: "$status"},
//       // // {$unwind: "$status.name"},
//       { $match: { status: false } },
//       { $project: { colorCode: 1 } },
//       {
//         $lookup: {
//           from: "Item",
//           let: { color_code: "$colorCode" },
//           pipeline: [
//             { $match: { $expr: { $eq: ["$colorCode", "$$color_code"] } } },
//             {
//               $lookup: {
//                 from: "FabricType",
//                 let: { type_id: "$typeId" },
//                 pipeline: [
//                   {
//                     $match: { $expr: { $eq: ["$_id", "$$type_id"] } },
//                   },
//                 ],
//                 as: "fabricType",
//               },
//             },
//             { $unwind: "$fabricType" },
//             {
//               $group: {
//                 _id: "$fabricType.name",
//               },
//             },
//           ],
//           as: "item",
//         },
//       },
//       { $unwind: "$item" },
//       {
//         $group: {
//           _id: "$item._id",
//           countFabrictype: { $sum: 1 },
//         },
//       },
//       { $sort: { countFabrictype: -1 } },
//       { $limit: 5 },
//     ]);
//     console.log("Get Fabric Type Sell successfully");
//     // console.log(result);
//     res.status(200).json(result);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ err });
//   }
// };

//chưa test xong
const getFabricTypeWarehouse = async (req, res) => {
  try {
    const result = await FabricRoll.aggregate([
      // {$unwind: "$status"},
      // // {$unwind: "$status.name"},
      // { $match: { status: false } },
      { $project: { warehouseId: 1, status: 1 } },
      // {$unwind: "$fabricRoll"},
      // {$group: {
      //   _id: "$warehouseId",
      //   countFabric : {$sum: 1},
      // }},
      // {$sort: {_id:1}},
      // }}
      // { $count: "colorCode" }
      // {
      //   $lookup: {
      //     from: "Item",
      //     let: { color_code: "$colorCode" },
      //     pipeline: [
      //       { $match: { $expr: { $eq: ["$colorCode", "$$color_code"] } } },
      //       {
      //         $lookup: {
      //           from: "FabricType",
      //           let: { type_id: "$typeId" },
      //           pipeline: [
      //             {
      //               $match: { $expr: { $eq: ["$_id", "$$type_id"] } },
      //             },
      //           ],
      //           as: "fabricType",
      //         },
      //       },
      //       { $unwind: "$fabricType" },
      //       {
      //         $group: {
      //           _id: "$fabricType.name",
      //         },
      //       },
      //     ],
      //     as: "item",
      //   },
      // },
      // { $unwind: "$item" },
      // {
      //   $group: {
      //     _id: "$item._id",
      //     countFabrictype: { $sum: 1 },
      //   },
      // },
      // { $sort: { countFabrictype: -1 } },
      // { $limit: 7 },
    ]);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};
const getFullListFabricType = (req, res) => {
  const listType = [
    { id: "co", name: "cotton" },
    { id: "ka", name: "kaki" },
    { id: "je", name: "jeans" },
    { id: "kt", name: "kate" },
    { id: "ni", name: "nỉ" },
    { id: "le", name: "len" },
    { id: "th", name: "thô" },
    { id: "vo", name: "voan" },
    { id: "la", name: "lanh" },
    { id: "du", name: "dũi" },
    { id: "lu", name: "lụa tự nhiên" },
    { id: "re", name: "ren" },
    { id: "nl", name: "ni lông" },
    { id: "tm", name: "tuyết mưa" },
    { id: "ch", name: "chiffon" },
  ];
  return res.status(200).json(listType);
};
const getListColorcode = (req, res) => {
  const listColor = [
    { code: "01", name: "Cam lợt" },
    { code: "02", name: "Bò" },
    { code: "03", name: "Xám lợt" },
    { code: "04", name: "Lục Bình" },
    { code: "05", name: "Đen" },
    { code: "06", name: "Trắng" },
    { code: "07", name: "Cà lợt" },
    { code: "08", name: "Cẩm" },
    { code: "09", name: "Cam ngói" },
    { code: "10", name: "Vàng chanh" },
    { code: "11", name: "Trắng gạo" },
    { code: "12", name: "Cánh sen" },
    { code: "13", name: "Nâu" },
    { code: "14", name: "Ngói" },
    { code: "15", name: "Biển" },
    { code: "16", name: "Tím huế" },
    { code: "17", name: "Bơ" },
    { code: "18", name: "Xanh đen" },
    { code: "19", name: "Hồng phấn" },
    { code: "20", name: "Xám đậm" },
    { code: "21", name: "Cà phê" },
    { code: "22", name: "Hoa đào" },
    { code: "23", name: "Đỏ" },
    { code: "24", name: "Xanh rêu" },
  ];
  return res.status(200).json(listColor);
};

async function getAllColorCode(req, res) {
  var colorMap = await Color.find({});
  return res.status(200).json(colorMap);
}

async function getAllMaterialCode(req, res) {
  var materialMap = await FabricType.find({});
  return res.status(200).json(materialMap);
}

async function getMaterialById(typeId) {
  try {
    const mat = await FabricType.findOne({ _id: typeId }).exec();
    return mat;
  } catch (err) {
    throw err;
  }
}

async function getMaterialByColor(req, res) {
  const body = req.body;
  console.log(body);
  const itemList = await Item.find({ colorCode: body.colorCode });

  const reformattedArray = await Promise.all(
    itemList.map(async (item) => {
      return await getMaterialById(item.typeId);
    })
  );
  return res.status(200).json(reformattedArray);
}

async function getColorByMaterial(req, res) {
  const body = req.body;
  const ftype = body.materialId;

  const ftypeList = await FabricRoll.find({
    fabricTypeId: ftype,
  });

  const colorList = ftypeList.map((x) => x.colorId);
  const colorListResponse = await Promise.all(
    colorList.map(async (x) => {
      const item = await Color.findOne({
        _id: x,
      }).exec();
      return item;
    })
  );

  return res.status(200).json(colorListResponse);
  // return res.status(200).json([]);
}

async function getAll(req, res) {
  try {
    const data = await FabricRoll.find({}, "slug name");
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(404).json([]);
  }
}

async function createNewFabric(req, res) {
  const body = req.body;
  console.log(body);

  try {
    const existedType = false;
    let foundType = await FabricType.findOne({ name: body.fabricType }).exec();
    if (foundType !== null) {
      existedType = true;
    }
    const existedColor = false;
    let foundColor = await Color.findOne({ colorCode: body.colorCode }).exec();
    if (foundColor !== null) {
      existedColor = true;
    }

    if(existedType == false) {
      foundType = await FabricType.create({
        material: body.collection,
        slug: body.slug,
        name: body.fabricType,
      })
    }

    if(existedColor == false) {
      foundColor = await Color.create({
        colorCode: body.colorCode
      })
    }

    const newFabric = await FabricRoll.create({
      name: body.name,
      fabricTypeId: foundType._id,
      fabricType: body.fabricType,
      colorId: foundColor._id,
      color: body.colorCode,
      price: body.price || 10000,
      description: body.name,
      slug: body.slug
    })

    return res.status(200).json(newFabric);
  } catch (e) {
    console.log(e);
    return res.status(500).json({message: "Internal server error or existed fabric"});
  }
}

module.exports = {
  getProductsByCollectionId,
  getProductList,
  getProductList1,
  getProductById,
  updateProductStatus,
  updateMarketPrice,
  getListFabricRollWithIds,
  getFabricRollOfBill,
  getChartWarehouseTrue,
  // getFabricTypeSell,
  getFabricTypeWarehouse,
  getFullListFabricType,
  getListColorcode,
  getAllColorCode,
  getAllMaterialCode,
  getMaterialByColor,
  getColorByMaterial,
  getProductsByMaterialSlug,
  getProductBySlug,
  getProductsHomePage,
  searchProductBySlug,
  getAll,
  createNewFabric,
};

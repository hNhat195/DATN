"use strict";
const express = require("express");

const router = express.Router();
const verify = require("../auth/checkToken");

const OrderController = require("../controller/OrderController");

const {
  getListFabricType,
  getFabricTypesByMaterial,
} = require("../controller/FabricTypeController");

/*----order route------*/
router.get("/api/order", OrderController.list);
router.post("/api/order/create", OrderController.create);
router.get("/api/order/completed", OrderController.getCompletedOrder);
router.get("/api/order/completed-sub", OrderController.getCompletedSubOrder);
router.get(
  "/api/order/completed-sub-item",
  OrderController.getCompletedSubOrderItem
);
router.get("/api/user-orders/:userId", OrderController.getOrdersByUserId);
router.get("/api/order/:id", OrderController.detail);
router.get("/api/order/:id/products", OrderController.getListProductsById);
router.put("/api/order/update_info", OrderController.updateInfo);
router.put("/api/order/:id/update_status", OrderController.updateStatus);
router.get("/api/deposit", OrderController.deposit);
router.get("/api/getfabrictypeorder", OrderController.getFabricTypeOrder);
router.get("/api/getorderstatus", OrderController.getOrderStatus);
router.get("/api/getorderdaily", OrderController.getOrderDaily);
router.get("/api/getorderbymonth", OrderController.getTotalOrderbyMonth);
router.get("/api/getorderfabrictype", OrderController.getOrderFabricType);
router.put("/api/order/cancle-status/:id", OrderController.cancleExportBill);
router.put(
  "/api/order/:id/update_status_cancel_order",
  OrderController.updateStatusCancelOrder
);
router.post("/api/order/create-sub-order", OrderController.createSubOrder);
router.put("/api/order/cancel-sub-order/:id", OrderController.cancelSubOrder);
router.put(
  "/api/order/update-sub-order-status/:id",
  OrderController.updateSubOrderStatus
);
router.put("/api/order/test/:id", OrderController.testUpdateSubOrder);
router.get("/api/order/sub-order/:id", OrderController.getSubOrder);

const {
  createNewCustomer,
  login,
} = require("../controller/CustomerController");
const {
  createNewStaff,
  loginstaff,
  // updateInfo,
  listStaff,
  infoStaffById,
} = require("../controller/StaffController");

//for customer
router.post("/api/register", createNewCustomer);
router.post("/api/user/customer/login", login);

//for Staff
router.post("/api/user/staff/login", loginstaff);
router.post("/api/user/admin/createstaff", createNewStaff);
// router.put("/updatePassword/:id", updatePassword);

//for admin
router.get("/api/admin/liststaff", listStaff);
router.get("/api/admin/staffInfo/:id", infoStaffById);

/*-----FabricType route------*/
router.get("/api/fabrictypes", getListFabricType);
router.get("/api/fabrictypes/:material", getFabricTypesByMaterial);

/*---------------------*/

/*-----Fabric Roll route------*/
const {
  getProductsByCollectionId,
  getProductList,
  getProductList1,
  getProductById,
  updateProductStatus,
  updateMarketPrice,
  getListFabricRollWithIds,
  getFabricRollOfBill,
  getChartWarehouseTrue,
  getFabricTypeWarehouse,
  getListColorcode,
  getFullListFabricType,
  getAllMaterialCode,
  getAllColorCode,
  getMaterialByColor,
  getColorByMaterial,
  getProductsByMaterialSlug,
  getProductBySlug,
  getProductsHomePage,
  searchProductBySlug,
} = require("../controller/FabricRollController");

router.get("/api/collections/:materialSlug", getProductsByMaterialSlug);
router.get("/api/product/list-type", getFullListFabricType);
router.get("/api/product/colorcode", getListColorcode);
router.get("/api/product/allmaterialcode", getAllMaterialCode);
router.get("/api/product/allcolorcode", getAllColorCode);
router.get("/api/product/matbycolor", getMaterialByColor);
router.post("/api/product/colorbymat", getColorByMaterial);
router.get("/api/product/homepage", getProductsHomePage);
router.get("/api/product/search/:slug", searchProductBySlug);
router.get("/api/product/:slug", getProductBySlug);
router.get("/api/products/:id", getProductById);

router.get("/api/product", getProductList);
router.get("/api/product1", getProductList1);
router.post("/api/product/list", getListFabricRollWithIds);
router.post("/api/product/fabricroll-bill", getFabricRollOfBill);
// router.put("/api/product/:id", updateProductStatus);
router.put("/api/product/item/:id", updateMarketPrice);
router.get("/api/chartwarehouse", getChartWarehouseTrue);
router.get("/api/getfabricwarehouse", getFabricTypeWarehouse);

/*------------------------*/

router.get("/api/user/admin/liststaff", listStaff);

/*-------------------------*/
//Support routes

const SupportController = require("../controller/SupportController");
router.post("/api/support/create", SupportController.createSupport);
router.get(
  "/api/supports/client/:clientId",
  SupportController.getSupportsByClientId
);
router.get("/api/supports/get-all", SupportController.getAllSupports);
router.put("/api/support/response", SupportController.responseSupport);
module.exports = router;

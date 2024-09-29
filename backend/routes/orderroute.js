const express = require("express");
const { isAuthUser, AuthRoles } = require("../middleware/Auth");
const { newOrder, getSingleOrder, myorder, getallorder, updateorder, removeOrder } = require("../controller/ordercontroller");
const { DeleteProduct } = require("../controller/productController");

const router = express.Router();


router.route("/order/new").post(isAuthUser , newOrder)
router.route("/order/:id").post(isAuthUser, getSingleOrder);
router.route("/orders/me").post(isAuthUser, myorder);
router.route("/admin/orders").get(isAuthUser , AuthRoles("admin") , getallorder);
router.route("/admin/order/:id").get(isAuthUser , AuthRoles("admin") , updateorder)
.delete(isAuthUser , AuthRoles("admin") , removeOrder);


module.exports = router;


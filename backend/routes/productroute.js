const express = require("express");
const { getAdminProducts , getAllProducts, createProduct, UpdateProduct, DeleteProduct, GetProductDetails, CreateProductReview, getAllProductReviews, DeleteProductReview } = require("../controller/productController");
const { isAuthUser , AuthRoles } = require("../middleware/Auth");

const router = express.Router();


router.route("/products").get( getAllProducts); // getAdminProducts
router.route("/admin/product/new").post(isAuthUser ,  AuthRoles("admin") , createProduct);
router.route("/admin/products").get(isAuthUser ,  AuthRoles("admin") , getAdminProducts);
router.route("/admin/product/:id").put(isAuthUser ,  AuthRoles("admin") , UpdateProduct);
router.route("/admin/product/:id").delete(isAuthUser ,  AuthRoles("admin") , DeleteProduct);
router.route("/product/:id").get(GetProductDetails);
router.route("/review").put(isAuthUser , CreateProductReview);
router.route("/reviews").get(getAllProductReviews).delete(isAuthUser , DeleteProductReview)

module.exports = router;
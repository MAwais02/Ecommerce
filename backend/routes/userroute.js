const express = require("express");
const { registerUser, LoginUser, Logout, forgotPassword, resetPassword, getUserDetails, UpdatePassword, UpdateProfile, getAllUsers , getsingleuser, UpdateUserRole, DeleteUser } = require("../controller/Usercontroller");

const {isAuthUser , AuthRoles}= require("../middleware/Auth")
const router = express.Router();


router.route("/register").post(registerUser);
router.route("/login").post(LoginUser);
router.route("/logout").get(Logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:resetToken").put(resetPassword);
router.route("/me").get(isAuthUser , getUserDetails);
router.route("/password/update").put(isAuthUser , UpdatePassword);
router.route("/me/update").put(isAuthUser , UpdateProfile);
router.route("/admin/users").get(isAuthUser , AuthRoles("admin") , getAllUsers);
router.route("/admin/user/:id").get(isAuthUser , AuthRoles("admin") , getsingleuser)
.put(isAuthUser , AuthRoles("admin") , UpdateUserRole)
.delete(isAuthUser , AuthRoles("admin") , DeleteUser);
module.exports = router;
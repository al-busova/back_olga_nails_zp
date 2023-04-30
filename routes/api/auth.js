const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  current,
  updateSubscription,
  updateAvatar,
  verify,
  resendVerifyEmail,
} = require("../../controllers/auth");
const { validationUsers, authenticate, upload } = require("../../middlewares");

router.post("/register", validationUsers.registerValidation, register);
router.post("/login", validationUsers.loginValidation, login);
router.post("/logout", authenticate, logout);
router.get("/current", authenticate, current);
router.patch(
  "/",
  authenticate,
  validationUsers.subscriptionValidation,
  updateSubscription
);
router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);
router.get("/verify/:verificationToken", verify);
router.post("/verify", validationUsers.emailValidation, resendVerifyEmail);

module.exports = router;

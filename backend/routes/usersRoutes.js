const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getme,
} = require("../controller/userController.js");
const { protect } = require("../middleware/authMiddleware.js");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getme);

module.exports = router;

const router = require("express").Router();
require('dotenv').config();

const {
  registerUser,
  loginUser,
  updateUser,
  resetPassword,
} = require("../controllers/user");
const validateToken = require("../middleware/validateToken");

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.put("/update", validateToken, updateUser);
router.put("/reset", validateToken, resetPassword);
 
module.exports = router; 
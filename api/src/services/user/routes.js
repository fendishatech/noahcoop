const express = require("express");
const userController = require("./controller");
const { verifyToken } = require("../../middlewares/verifyToken");
const refreshToken = require("../../middlewares/refreshToken");
const { inputValidation } = require("./validation");

const router = express.Router();

router.get("/users", verifyToken, userController.getUsers);

router.post(
  "/users/register",
  verifyToken,
  inputValidation,
  userController.register
);
router.post("/users/login", userController.login);
router.get("/users/token", refreshToken);
router.delete("/users/logout", verifyToken, userController.logout);

router.put("/users/login", verifyToken, inputValidation, userController.update);
router.delete("/users/logout", verifyToken, userController.destroy);

module.exports = router;

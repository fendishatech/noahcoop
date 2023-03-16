const express = require("express");
const memberController = require("../controllers/memberController");

const { verifyToken } = require("../../../middlewares/verifyToken");
const refreshToken = require("../../../middlewares/refreshToken");

const { memberValidator } = require("../validators/memberValidator");

const router = express.Router();

router.get("/members", memberController.getMembers);
router.get("/members/:id", memberController.getMember);

router.post("/members", memberValidator, memberController.insert);

router.put("/members/:id", memberValidator, memberController.update);
router.delete("/members/:id", memberController.destroy);

module.exports = router;

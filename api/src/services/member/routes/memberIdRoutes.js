const express = require("express");
const memberIdController = require("../controllers/memberIdController");

const { verifyToken } = require("../../../middlewares/verifyToken");
const refreshToken = require("../../../middlewares/refreshToken");

const { memberIdValidator } = require("../validators/memberIdValidator");

const router = express.Router();

router.get("/member_ids", memberIdController.getMemberIds);
router.get("/member_ids/:id", memberIdController.getMemberId);

router.post("/member_ids", memberIdValidator, memberIdController.insert);

router.put("/member_ids/:id", memberIdValidator, memberIdController.update);
router.delete("/member_ids/:id", memberIdController.destroy);

module.exports = router;

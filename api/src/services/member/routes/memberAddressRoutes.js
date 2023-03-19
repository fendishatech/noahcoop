const express = require("express");
const memberAddressController = require("../controllers/memberAddressController");

const { verifyToken } = require("../../../middlewares/verifyToken");
const refreshToken = require("../../../middlewares/refreshToken");

const {
  memberAddressValidator,
} = require("../validators/memberAddressValidator");

const router = express.Router();

router.get("/member_addresses", memberAddressController.getMemberAddresses);
router.get("/member_addresses/:id", memberAddressController.getMemberAddress);

router.post(
  "/member_addresses",
  memberAddressValidator,
  memberAddressController.insert
);

router.put(
  "/member_addresses/:id",
  memberAddressValidator,
  memberAddressController.update
);
router.delete("/member_addresses/:id", memberAddressController.destroy);

module.exports = router;

const express = require("express");
const memberJobController = require("../controllers/membersJobController");

const { verifyToken } = require("../../../middlewares/verifyToken");
const refreshToken = require("../../../middlewares/refreshToken");

const { memberJobValidator } = require("../validators/memberJobValidator");

const router = express.Router();

router.get("/member_jobs", memberJobController.getMemberJobs);
router.get("/member_jobs/:id", memberJobController.getMemberJob);

router.post("/member_jobs", memberJobValidator, memberJobController.insert);

router.put("/member_jobs/:id", memberJobValidator, memberJobController.update);
router.delete("/member_jobs/:id", memberJobController.destroy);

module.exports = router;

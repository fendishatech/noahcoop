const express = require("express");
const eduStatusController = require("../controllers/eduStatusController");

const { verifyToken } = require("../../../middlewares/verifyToken");
const refreshToken = require("../../../middlewares/refreshToken");

const { eduStatusValidator } = require("../validators/eduStatusValidator");

const router = express.Router();

router.get("/edu_statuses", eduStatusController.getEducationalStatuses);
router.get("/edu_statuses/:id", eduStatusController.getEducationalStatus);

router.post("/edu_statuses", eduStatusValidator, eduStatusController.insert);

router.put("/edu_statuses/:id", eduStatusValidator, eduStatusController.update);
router.delete("/edu_statuses/:id", eduStatusController.destroy);

module.exports = router;

const express = require("express");
const cityController = require("../controllers/cityController");

const { verifyToken } = require("../../../middlewares/verifyToken");
const refreshToken = require("../../../middlewares/refreshToken");

const { cityValidator } = require("../validators/cityValidator");

const router = express.Router();

router.get("/cities", cityController.getCities);
router.get("/cities/:id", cityController.getCity);

router.post("/cities", cityValidator, cityController.insert);

router.put("/cities/:id", cityValidator, cityController.update);
router.delete("/cities/:id", cityController.destroy);

module.exports = router;

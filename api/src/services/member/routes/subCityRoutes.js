const express = require("express");
const subCityController = require("../controllers/subCityController");

const { verifyToken } = require("../../../middlewares/verifyToken");
const refreshToken = require("../../../middlewares/refreshToken");

const { subCityValidator } = require("../validators/subCityValidator");

const router = express.Router();

router.get("/sub_cities", subCityController.getSubCities);
router.get("/sub_cities/:id", subCityController.getSubCity);

router.post("/sub_cities", subCityValidator, subCityController.insert);

router.put("/sub_cities/:id", subCityValidator, subCityController.update);
router.delete("/sub_cities/:id", subCityController.destroy);

module.exports = router;

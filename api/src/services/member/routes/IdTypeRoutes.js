const express = require("express");
const idTypeController = require("../controllers/idTypeController");

const { verifyToken } = require("../../../middlewares/verifyToken");
const refreshToken = require("../../../middlewares/refreshToken");

const { idTypeValidator } = require("../validators/idTypeValidator");

const router = express.Router();

router.get("/id_types", idTypeController.getIdTypes);
router.get("/id_types/:id", idTypeController.getIdType);

router.post("/id_types", idTypeValidator, idTypeController.insert);

router.put("/id_types/:id", idTypeValidator, idTypeController.update);
router.delete("/id_types/:id", idTypeController.destroy);

module.exports = router;

const express = require("express");
const clientController = require("./clientController.js");

const { verifyToken } = require("../../middlewares/verifyToken");
const refreshToken = require("../../middlewares/refreshToken");

const { clientValidator } = require("./clientValidator");

const router = express.Router();

router.get("/clients", clientController.getClients);
router.get("/clients/:id", clientController.getClient);

router.post("/clients", clientValidator, clientController.insert);

router.put("/clients/:id", clientValidator, clientController.update);
router.delete("/clients/:id", clientController.destroy);

module.exports = router;

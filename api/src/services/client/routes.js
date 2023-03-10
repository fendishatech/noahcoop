const express = require("express");
const clientController = require("./clientController.js");

const { verifyToken } = require("../../middlewares/verifyToken");
const refreshToken = require("../../middlewares/refreshToken");

const { insertValidator, updateValidator } = require("./clientValidator");

const router = express.Router();

router.get("/clients", clientController.getClients);
router.get("/clients/:id", clientController.getClient);

router.post("/clients", insertValidator, clientController.insert);

router.put("/clients/:id", updateValidator, clientController.update);
router.delete("/clients/:id", clientController.deleteClient);

module.exports = router;

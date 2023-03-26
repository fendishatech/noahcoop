const City = require("../member/model");
const express = require("express");
const routes = express.Router();

const userRouter = require("../user/routes");
const cityRoutes = require("../member/routes/cityRoutes");
const idTypeRoutes = require("../member/routes/idTypeRoutes");
const subCityRoutes = require("../member/routes/subCityRoutes");
const memberRoutes = require("../member/routes/memberRoutes");
const memberAddressRoutes = require("../member/routes/memberAddressRoutes");
const emergencyContactRoutes = require("../member/routes/emergencyContactRoutes");
const eduStatusRoutes = require("../member/routes/eduStatusRoutes");
const memberIdRoutes = require("../member/routes/memberIdRoutes");
const memberJobRoutes = require("../member/routes/memberJobRoutes");
const clientRoutes = require("../client/routes");
const clientRoute = require("./Client");

routes.use("/api/", userRouter);
routes.use("/api/", cityRoutes);
routes.use("/api/", subCityRoutes);
routes.use("/api/", idTypeRoutes);
routes.use("/api/", clientRoutes);
routes.use("/api/", clientRoute); // swagger
routes.use("/api/", memberRoutes);
routes.use("/api/", memberAddressRoutes);
routes.use("/api/", memberIdRoutes);
routes.use("/api/", emergencyContactRoutes);
routes.use("/api/", eduStatusRoutes);
routes.use("/api/", memberJobRoutes);

module.exports = routes;

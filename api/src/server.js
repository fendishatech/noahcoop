const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./helper/database");
const userRouter = require("./services/user/routes");
const cityRoutes = require("./services/member/routes/cityRoutes");
const idTypeRoutes = require("./services/member/routes/idTypeRoutes");
const subCityRoutes = require("./services/member/routes/subCityRoutes");
const memberRoutes = require("./services/member/routes/memberRoutes");
const memberAddressRoutes = require("./services/member/routes/memberAddressRoutes");
const memberIdRoutes = require("./services/member/routes/memberIdRoutes");
const emergencyContactRoutes = require("./services/member/routes/emergencyContactRoutes");
const clientRoutes = require("./services/client/routes");
// DEBUG
const { migrateSchema } = require("./helper/migrate");

// APP
const app = express();

// MIDDLE WARES
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
dotenv.config();

// migrateSchema();

// ROUTES
app.use("/api/", userRouter);
app.use("/api/", cityRoutes);
app.use("/api/", subCityRoutes);
app.use("/api/", idTypeRoutes);
app.use("/api/", clientRoutes);
app.use("/api/", memberRoutes);
app.use("/api/", memberAddressRoutes);
app.use("/api/", memberIdRoutes);
app.use("/api/", emergencyContactRoutes);

// SERVER
app.listen(3333, () => console.log("Server running at http://localhost:3333"));

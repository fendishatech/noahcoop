const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./helper/database");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const routes = require("./services/routes");

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
app.use("/", routes);

// SWAGGER SETUP
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Noahcoop Express API with Swagger",
      version: "0.1.0",
      description: "This is the official website of noahcoop",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Contact us",
        url: "noahcoop.com",
        email: "info@noahcoop.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3333/",
      },
    ],
  },
  apis: ["./src/services/routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// SERVER
app.listen(3333, () => console.log("Server running at http://localhost:3333"));

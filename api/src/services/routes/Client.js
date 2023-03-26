/**
 * @swagger
 * components:
 *   schemas:
 *     Clients:
 *       type: object
 *       required:
 *           - firstName
 *           - middleName
 *           - lastName
 *           - email
 *           - phoneNo
 *       properties:
 *           firstName :
 *              type : string
 *              description :
 *           middleName :
 *              type : string
 *              description :
 *           lastName :
 *              type : string
 *              description :
 *           email :
 *              type : string
 *              description :
 *           phoneNo :
 *              type : string
 *              description : Clients phone Number
 *
 */
/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: The clients managing API
 * /api/clients_new:
 *   get:
 *     summary: Lists all the clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: The list of the clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Clients'
 *       500:
 *         description: Some server error
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: The list of the clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Clients'
 *       500:
 *         description: Some server error
 *
 */

const express = require("express");
const router = express.Router();

const { getClients } = require("../client/clientController");
const { getClient } = require("../client/clientController");
const { insert } = require("../client/clientController");
const { update } = require("../client/clientController");
const { deleteClient } = require("../client/clientController");

router.get("/clients_new", getClients);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       required:
 *         - firstName
 *        - middleName
 *        - lastName
 *        - email
 *        - phoneNo
 *       properties
 *  ````firstName :
 *          type : string
 *         description
 *       middleName :
 *         type : string
 *         description
 *       lastName :
 *         type : string
 *         description
 *       email :
 *         type : string
 *         description
 *       phoneNo :
 *         type : string
 *         description
 *      type : String
 *          description : Amazing rapid id
 *
 */
/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 * /book:
 *   get:
 *     summary: Lists all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Books'
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Books'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Books'
 *       500:
 *         description: Some server error
 * /book/{id}:
 *   get:
 *     summary: Get the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Books'
 *       404:
 *         description: The book was not found
 *   put:
 *    summary: Update the book by the id
 *    tags: [Books]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The book id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Books'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Books'
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
 */
const { sendError } = require("../../helper/functions");
const Clients = require("./model");
const { Client } = require("./model");
// const jwt = require("jsonwebtoken");

const attributes = [
  "id",
  "firstName",
  "middleName",
  "lastName",
  "email",
  "phoneNo",
];

const getClients = async (req, res) => {
  try {
    const clients = await Clients.findAll({
      attributes: attributes,
    });
    res.status(200).json({
      success: true,
      payload: clients,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getClient = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await Clients.findByPk(id, {
      attributes: attributes,
    });
    res.status(200).json({
      success: true,
      payload: client,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.errors[0].message,
    });
  }
};

const insert = async (req, res) => {
  try {
    const client = await Clients.create({
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNo: req.body.phoneNo,
    });
    return res.status(200).json({
      success: true,
      payload: client,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error.errors[0].message,
    });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await Clients.update(req.body, {
      where: {
        id: id,
      },
    });
    res.status(200).json({
      success: true,
      payload: client,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.errors[0].message,
    });
  }
};

const deleteClient = async (req, res) => {
  try {
    const id = req.params.id;

    const client = await Clients.findOne({
      where: { id: id },
    });

    if (client) {
      const deletedClient = await Clients.destroy({
        where: { id: id },
      });
      return res.status(200).json({
        success: true,
        payload: deletedClient,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Client could not be found.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.errors[0].message,
    });
  }
};

module.exports = {
  getClients,
  getClient,
  insert,
  update,
  deleteClient,
};

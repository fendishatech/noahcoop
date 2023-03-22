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

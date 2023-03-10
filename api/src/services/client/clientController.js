const { sendError } = require("../../helper/functions");
const Clients = require("./model");
const { Client } = require("./model");
// const jwt = require("jsonwebtoken");

const getClients = async (req, res) => {
  try {
    const clients = await Clients.findAll({
      attributes: ["id", "first_name", "last_name", "email", "phone_no"],
    });
    res.status(200).json({
      success: true,
      payload: clients,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};

const getClient = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await Clients.findByPk(id, {
      attributes: ["id", "first_name", "last_name", "email", "phone_no"],
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
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone_no: req.body.phone_no,
    });
    return res.status(200).json({
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

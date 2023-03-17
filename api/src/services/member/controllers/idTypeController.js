const { IdType } = require("../model");
// const jwt = require("jsonwebtoken");

const attributes = ["id", "name"];

const getIdTypes = async (req, res) => {
  try {
    const idTypes = await IdType.findAll({
      attributes: attributes,
    });
    res.status(200).json({
      success: true,
      payload: idTypes,
    });
  } catch (error) {
    res.status(500);
  }
};

const getIdType = async (req, res) => {
  try {
    const id = req.params.id;
    const idType = await IdType.findByPk(id, {
      attributes: attributes,
    });
    res.status(200).json({
      success: true,
      payload: idType,
    });
  } catch (error) {
    res.status(500);
  }
};

const insert = async (req, res) => {
  try {
    const idType = await IdType.create({
      name: req.body.name,
    });
    return res.status(200).json({
      success: true,
      payload: idType,
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
    const idType = await IdType.update(req.body, {
      where: {
        id: id,
      },
    });
    res.status(200).json({
      success: true,
      payload: idType,
    });
  } catch (error) {
    res.status(500);
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const idType = await IdType.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      success: true,
      payload: idType,
    });
  } catch (error) {
    res.status(500);
  }
};

module.exports = {
  getIdTypes,
  getIdType,
  insert,
  update,
  destroy,
};

const { SubCity } = require("../model");
// const jwt = require("jsonwebtoken");

const attributes = ["id", "name", "woredas"];

const getSubCities = async (req, res) => {
  try {
    const subCities = await SubCity.findAll({
      attributes: attributes,
    });
    res.status(200).json({
      success: true,
      payload: subCities,
    });
  } catch (error) {
    res.status(500);
  }
};

const getSubCity = async (req, res) => {
  try {
    const id = req.params.id;
    const subCity = await SubCity.findByPk(id, {
      attributes: attributes,
    });
    res.status(200).json({
      success: true,
      payload: subCity,
    });
  } catch (error) {
    res.status(500);
  }
};

const insert = async (req, res) => {
  try {
    const { name, woredas } = req.body;

    const subCity = await SubCity.create({
      name: name,
      woredas: woredas,
    });
    return res.status(200).json({
      success: true,
      payload: subCity,
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
    const subCity = await SubCity.update(req.body, {
      where: {
        id: id,
      },
    });
    res.status(200).json({
      success: true,
      payload: subCity,
    });
  } catch (error) {
    res.status(500);
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const subCity = await SubCity.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      success: true,
      payload: subCity,
    });
  } catch (error) {
    res.status(500);
  }
};

module.exports = {
  getSubCities,
  getSubCity,
  insert,
  update,
  destroy,
};

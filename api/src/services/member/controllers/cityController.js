const { City } = require("../model");
// const jwt = require("jsonwebtoken");

const getCities = async (req, res) => {
  try {
    const cities = await City.findAll({
      attributes: ["id", "name"],
    });
    res.status(200).json({
      success: true,
      payload: cities,
    });
  } catch (error) {
    res.status(500);
  }
};

const getCity = async (req, res) => {
  try {
    const id = req.params.id;
    const city = await City.findByPk(id, {
      attributes: ["id", "name"],
    });
    res.status(200).json({
      success: true,
      payload: city,
    });
  } catch (error) {
    res.status(500);
  }
};

const insert = async (req, res) => {
  try {
    const city = await City.create({
      name: req.body.name,
    });
    return res.status(200).json({
      success: true,
      payload: city,
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
    const city = await City.update(req.body, {
      where: {
        id: id,
      },
    });
    res.status(200).json({
      success: true,
      payload: city,
    });
  } catch (error) {
    res.status(500);
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const city = await City.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      success: true,
      payload: city,
    });
  } catch (error) {
    res.status(500);
  }
};

module.exports = {
  getCities,
  getCity,
  insert,
  update,
  destroy,
};

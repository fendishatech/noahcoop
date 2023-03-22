const EducationalStatus = require("../../models/educationalStatus");
// const jwt = require("jsonwebtoken");

const getEducationalStatuses = async (req, res) => {
  try {
    console.log(EducationalStatus);
    const educationalStatuses = await EducationalStatus.findAll({
      attributes: ["id", "name"],
    });
    return res.status(200).json({
      success: true,
      payload: educationalStatuses,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEducationalStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const educationalStatus = await EducationalStatus.findByPk(id, {
      attributes: ["id", "name"],
    });
    res.status(200).json({
      success: true,
      payload: educationalStatus,
    });
  } catch (error) {
    res.status(500);
  }
};

const insert = async (req, res) => {
  try {
    const educationalStatus = await EducationalStatus.create({
      name: req.body.name,
    });
    return res.status(200).json({
      success: true,
      payload: educationalStatus,
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
    const educationalStatus = await EducationalStatus.update(req.body, {
      where: {
        id: id,
      },
    });
    res.status(200).json({
      success: true,
      payload: educationalStatus,
    });
  } catch (error) {
    res.status(500);
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const educationalStatus = await EducationalStatus.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      success: true,
      payload: educationalStatus,
    });
  } catch (error) {
    res.status(500);
  }
};

module.exports = {
  getEducationalStatuses,
  getEducationalStatus,
  insert,
  update,
  destroy,
};

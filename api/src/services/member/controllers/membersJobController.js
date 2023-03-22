const { MemberJob } = require("../model");
// const jwt = require("jsonwebtoken");

const getMemberJobs = async (req, res) => {
  try {
    const memberJobs = await MemberJob.findAll({
      attributes: ["id"],
    });
    return res.status(200).json({
      success: true,
      payload: memberJobs,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getMemberJob = async (req, res) => {
  try {
    const id = req.params.id;
    const memberJob = await MemberJob.findByPk(id, {
      attributes: ["id"],
    });
    res.status(200).json({
      success: true,
      payload: memberJob,
    });
  } catch (error) {
    res.status(500);
  }
};

const insert = async (req, res) => {
  try {
    const memberJob = await MemberJob.create({
      name: req.body.name,
    });
    return res.status(200).json({
      success: true,
      payload: memberJob,
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
    const memberJob = await MemberJob.update(req.body, {
      where: {
        id: id,
      },
    });
    res.status(200).json({
      success: true,
      payload: memberJob,
    });
  } catch (error) {
    res.status(500);
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const memberJob = await MemberJob.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      success: true,
      payload: memberJob,
    });
  } catch (error) {
    res.status(500);
  }
};

module.exports = {
  getMemberJobs,
  getMemberJob,
  insert,
  update,
  destroy,
};

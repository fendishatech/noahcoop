const { Member } = require("../model");
// const jwt = require("jsonwebtoken");

const getCities = async (req, res) => {
  try {
    const cities = await Member.findAll({
      attributes: [
        "id",
        "firstName",
        "middleName",
        "lastName",
        "title",
        "gender",
        "dob",
        "martialStatus",
        "familyMembers_no",
        "familyMembersGender",
        "eduStatus",
        "jobTitle",
        "jobExperience",
        "phoneNo",
        "willList",
        "password",
        "memberType",
      ],
    });
    res.status(200).json({
      success: true,
      payload: cities,
    });
  } catch (error) {
    res.status(500);
  }
};

const getMember = async (req, res) => {
  try {
    const id = req.params.id;
    const member = await Member.findByPk(id, {
      attributes: ["id", "name"],
    });
    res.status(200).json({
      success: true,
      payload: member,
    });
  } catch (error) {
    res.status(500);
  }
};

const insert = async (req, res) => {
  try {
    const member = await Member.create({
      name: req.body.name,
    });
    return res.status(200).json({
      success: true,
      payload: member,
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
    const member = await Member.update(req.body, {
      where: {
        id: id,
      },
    });
    res.status(200).json({
      success: true,
      payload: member,
    });
  } catch (error) {
    res.status(500);
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const member = await Member.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      success: true,
      payload: member,
    });
  } catch (error) {
    res.status(500);
  }
};

module.exports = {
  getCities,
  getMember,
  insert,
  update,
  destroy,
};

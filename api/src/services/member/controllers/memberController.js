const { Member } = require("../model");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const attributes = [
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
  "phoneNo",
  "willList",
  "memberType",
];

const getMembers = async (req, res) => {
  try {
    const members = await Member.findAll({
      attributes: attributes,
    });
    res.status(200).json({
      success: true,
      payload: members,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMember = async (req, res) => {
  try {
    const id = req.params.id;
    const member = await Member.findByPk(id, {
      attributes: attributes,
    });
    res.status(200).json({
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

const insert = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      title,
      gender,
      dob,
      martialStatus,
      familyMembers_no,
      familyMembersGender,
      phoneNo,
      password,
      willList,
      memberType,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const member = await Member.create({
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      title: title,
      gender: gender,
      dob: dob,
      martialStatus: martialStatus,
      familyMembers_no: familyMembers_no,
      familyMembersGender: familyMembersGender,
      phoneNo: phoneNo,
      password: hashedPassword,
      willList: willList,
      memberType: memberType,
    });

    return res.status(200).json({
      success: true,
      payload: member,
      message: "Member was created successfully",
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
      message: "Member was Updated successfully",
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
  getMembers,
  getMember,
  insert,
  update,
  destroy,
};

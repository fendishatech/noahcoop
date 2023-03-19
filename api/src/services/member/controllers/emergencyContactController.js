const { EmergencyContact } = require("../model");

const attributes = [
  "id",
  "firstName",
  "middleName",
  "lastName",
  "woreda",
  "houseNo",
  "phoneNo",
  "memberId",
];

const getEmergencyContacts = async (req, res) => {
  try {
    const emergencyContacts = await EmergencyContact.findAll({
      attributes: attributes,
    });
    res.status(200).json({
      success: true,
      payload: emergencyContacts,
    });
  } catch (error) {
    res.status(500);
  }
};

const getEmergencyContact = async (req, res) => {
  try {
    const id = req.params.id;
    const emergencyContact = await EmergencyContact.findByPk(id, {
      attributes: attributes,
    });
    res.status(200).json({
      success: true,
      payload: emergencyContact,
    });
  } catch (error) {
    res.status(500);
  }
};

const insert = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      woreda,
      houseNo,
      phoneNo,
      memberId,
    } = req.body;
    const emergencyContact = await EmergencyContact.create({
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      woreda: woreda,
      houseNo: houseNo,
      phoneNo: phoneNo,
      memberId: memberId,
    });
    return res.status(200).json({
      success: true,
      payload: emergencyContact,
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
    const emergencyContact = await EmergencyContact.update(req.body, {
      where: {
        id: id,
      },
    });
    res.status(200).json({
      success: true,
      payload: emergencyContact,
    });
  } catch (error) {
    res.status(500);
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const emergencyContact = await EmergencyContact.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      success: true,
      payload: emergencyContact,
    });
  } catch (error) {
    res.status(500);
  }
};

module.exports = {
  getEmergencyContacts,
  getEmergencyContact,
  insert,
  update,
  destroy,
};

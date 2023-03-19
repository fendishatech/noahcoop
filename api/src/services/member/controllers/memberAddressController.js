const { MemberAddress } = require("../model");

const attributes = [
  "id",
  "placeName",
  "woreda",
  "houseNo",
  "phoneNo2",
  "memberId",
  "cityId",
  "subCityId",
];

const getMemberAddresses = async (req, res) => {
  try {
    const memberAddresses = await MemberAddress.findAll({
      attributes: attributes,
    });
    res.status(200).json({
      success: true,
      payload: memberAddresses,
    });
  } catch (error) {
    res.status(500);
  }
};

const getMemberAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const memMemberAddress = await MemberAddress.findByPk(id, {
      attributes: attributes,
    });
    res.status(200).json({
      success: true,
      payload: memMemberAddress,
    });
  } catch (error) {
    res.status(500);
  }
};

const insert = async (req, res) => {
  try {
    const {
      placeName,
      woreda,
      houseNo,
      phoneNo2,
      memberId,
      cityId,
      subCityId,
    } = req.body;
    const memMemberAddress = await MemberAddress.create({
      woreda: woreda,
      houseNo: houseNo,
      placeName: placeName,
      phoneNo2: phoneNo2,
      memberId: memberId,
      cityId: cityId,
      subCityId: subCityId,
    });
    return res.status(200).json({
      success: true,
      payload: memMemberAddress,
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
    const memMemberAddress = await MemberAddress.update(req.body, {
      where: {
        id: id,
      },
    });
    res.status(200).json({
      success: true,
      payload: memMemberAddress,
    });
  } catch (error) {
    res.status(500);
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const memMemberAddress = await MemberAddress.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      success: true,
      payload: memMemberAddress,
    });
  } catch (error) {
    res.status(500);
  }
};

module.exports = {
  getMemberAddresses,
  getMemberAddress,
  insert,
  update,
  destroy,
};

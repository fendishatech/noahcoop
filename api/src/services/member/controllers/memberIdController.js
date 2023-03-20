const { MemberId } = require("../model");

const attributes = ["idTypeId", "idNumber", "idPath", "memberId"];

const getMemberIds = async (req, res) => {
  try {
    const memberIds = await MemberId.findAll({
      attributes: attributes,
    });
    return res.status(200).json({
      success: true,
      payload: memberIds,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      // message: error.errors[0].message,
    });
  }
};

const getMemberId = async (req, res) => {
  try {
    const id = req.params.id;
    const memberIMemberId = await MemberId.findByPk(id, {
      attributes: attributes,
    });
    res.status(200).json({
      success: true,
      payload: memberIMemberId,
    });
  } catch (error) {
    res.status(500);
  }
};

const insert = async (req, res) => {
  try {
    const { idTypeId, idNumber, idPath, memberId } = req.body;
    const memberIMemberId = await MemberId.create({
      idTypeId: idTypeId,
      memberId: memberId,
      idNumber: idNumber,
      idPath: idPath,
    });
    return res.status(200).json({
      success: true,
      payload: memberIMemberId,
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
    const memberIMemberId = await MemberId.update(req.body, {
      where: {
        id: id,
      },
    });
    res.status(200).json({
      success: true,
      payload: memberIMemberId,
    });
  } catch (error) {
    res.status(500);
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const memberIMemberId = await MemberId.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      success: true,
      payload: memberIMemberId,
    });
  } catch (error) {
    res.status(500);
  }
};

module.exports = {
  getMemberIds,
  getMemberId,
  insert,
  update,
  destroy,
};

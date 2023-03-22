const Joi = require("joi");

const schema = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  middleName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  title: Joi.string().min(3).max(60).required(),
  gender: Joi.string().required(),
  dob: Joi.string().required(),
  martialStatus: Joi.string().required(),
  familyMembers_no: Joi.string().required(),
  familyMembersGender: Joi.string().required(),
  eduStatus: Joi.string().required(),
  phoneNo: Joi.string().required(),
  password: Joi.string().required(),
  willList: Joi.string().required(),
  memberType: Joi.string().required(),
});

const memberValidator = (req, res, next) => {
  try {
    const { body } = req;

    Joi.assert(body, schema);
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      type: error.name,
      detail: error.details[0].type,
      message: error.details[0].message,
    });
  }
};

module.exports = {
  memberValidator,
};

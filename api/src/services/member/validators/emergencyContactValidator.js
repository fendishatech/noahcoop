const Joi = require("joi");

const schema = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  middleName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  woreda: Joi.number().required(),
  houseNo: Joi.number().required(),
  phoneNo: Joi.string().required(),
  memberId: Joi.number().required(),
  cityId: Joi.number().required(),
  subCityId: Joi.number().required(),
});

const emergencyContactValidator = (req, res, next) => {
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
  emergencyContactValidator,
};

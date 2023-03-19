const Joi = require("joi");

const schema = Joi.object({
  idTypeId: Joi.number().required(),
  idNumber: Joi.string().required(),
  idPath: Joi.string().required(),
  memberId: Joi.number().required(),
});

const memberIdValidator = (req, res, next) => {
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
  memberIdValidator,
};

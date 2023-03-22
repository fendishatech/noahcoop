const Joi = require("joi");

const schema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  exp_year: Joi.number().required(),
  exp_month: Joi.number().required(),
  memberID: Joi.number().required(),
});

const memberJobValidator = (req, res, next) => {
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
  memberJobValidator,
};

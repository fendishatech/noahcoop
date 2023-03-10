const Joi = require("joi");

const schema = Joi.object({
  first_name: Joi.string().alphanum().min(3).max(30).required(),
  last_name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone_no: Joi.string().required(),
});

const updateSchema = Joi.object({
  first_name: Joi.string().alphanum().min(3).max(30),
  last_name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email(),
  phone_no: Joi.string(),
});

const insertValidator = (req, res, next) => {
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

const updateValidator = (req, res, next) => {
  try {
    const { body } = req;

    Joi.assert(body, updateSchema);
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
  insertValidator,
  updateValidator,
};

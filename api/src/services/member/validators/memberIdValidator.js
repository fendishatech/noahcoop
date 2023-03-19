const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});

const idTypeValidator = (req, res, next) => {
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
  idTypeValidator,
};

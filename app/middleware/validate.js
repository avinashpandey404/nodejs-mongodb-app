const Joi = require('joi');

exports.validateItem = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().optional()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  next();
};

const { schemas } = require("../models/contact");

const contactValidation = (req, res, next) => {
  const validationBodyContact = schemas.addContactSchema.validate(req.body);
  if (validationBodyContact.error) {
    return res
      .status(400)
      .json({ status: validationBodyContact.error.details });
  }
  next();
};
const updateFavoriteValidation = (req, res, next) => {
  const validationBodyContact = schemas.updateFavoriteSchema.validate(req.body);
  if (validationBodyContact.error) {
    return res
      .status(400)
      .json({ status: validationBodyContact.error.details });
  }
  next();
};

module.exports = {
  contactValidation,
  updateFavoriteValidation,
};

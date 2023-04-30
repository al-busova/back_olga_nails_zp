const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const getById = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId, owner);
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({
      status: "success",
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;

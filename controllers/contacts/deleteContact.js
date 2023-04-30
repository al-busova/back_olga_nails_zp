const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const deleteContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndRemove(contactId, owner);
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const updateContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { contactId } = req.params;
    const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
      owner,
    });
    if (!updateContact) {
      throw HttpError(404, "Not found");
    }
    
    res.status(200).json({
      status: "success",
      data: updateContact,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = updateContact;

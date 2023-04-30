const { Contact } = require("../../models/contact");

const addContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const newContact = await Contact.create({ ...req.body, owner });

    res.status(201).json({
      status: "success",
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;

const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, favorite: favoriteQuery } = req.query;
    let filterFavorite = { $eq: favoriteQuery };
    if (!favoriteQuery) {
      filterFavorite = { $exists: true };
    }
    const skip = (page - 1) * limit;
    const contacts = await Contact.find(
      { owner, favorite: filterFavorite },
      "-createdAt -updatedAt",
      {
        skip,
        limit,
      }
    ).populate("owner", "email subscription");

    res.status(200).json({
      status: "success",
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;

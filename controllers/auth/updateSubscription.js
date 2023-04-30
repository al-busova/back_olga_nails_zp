const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const updateSubscription = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const updateUser = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updateUser) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({
      status: "success",
      data: updateUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;

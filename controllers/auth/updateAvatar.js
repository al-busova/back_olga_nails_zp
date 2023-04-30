const { User } = require("../../models/user");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tmpUpload, originalname } = req.file;

    await Jimp.read(tmpUpload)
      .then((avatar) => {
        avatar.cover(250, 250);
        avatar.write(tmpUpload);
      })
      .catch((err) => {
        console.log(err);
      });

    const avatarDir = path.join(__dirname, "../../", "public", "avatars");
    const fileName = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarDir, fileName);
    await fs.rename(tmpUpload, resultUpload);

    const avatarURL = path.join("avatars", fileName);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.status(200).json({
      status: "success",
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateAvatar;

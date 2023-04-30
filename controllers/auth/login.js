const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    if (!user.verify) {
      throw HttpError(401, "Email not verify");
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw HttpError(401, "Email or password is wrong");
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "23h",
    });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;

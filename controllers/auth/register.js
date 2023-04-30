const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");
const { v4: uuidv4 } = require("uuid");
const gravatar = require("gravatar");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = uuidv4();
    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });
    const verifyEmail = {
      to: email,
      subject: "Verify your email",
      html: `<a href="${process.env.BASE_URL}/api/users/verify/${verificationToken}" target="_blank">Click verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.status(201).json({
      status: "success",
      user: { email: newUser.email, subscription: newUser.subscription },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;

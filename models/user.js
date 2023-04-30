const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const subscriptions = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    subscription: {
      type: String,
      enum: subscriptions,
      default: "starter",
    },
    token: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string().min(3).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, allowFullyQualified: true })
    .required(),
  subscription: Joi.string()
    .valid(...subscriptions)
    .required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(3).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, allowFullyQualified: true })
    .required(),
});

const emailSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, allowFullyQualified: true })
    .required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptions)
    .required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  emailSchema,
  updateSubscriptionSchema,
};

module.exports = {
  User,
  schemas,
};

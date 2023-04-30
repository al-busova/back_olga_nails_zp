const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: /^\(\d{3}\) \d{3}-\d{4}$/,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

contactSchema.post("save", handleMongooseError);

const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, allowFullyQualified: true })
    .required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
  favorite: Joi.boolean(),
  owner: Joi.string(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addContactSchema,
  updateFavoriteSchema,
};

module.exports = {
  Contact,
  schemas,
};

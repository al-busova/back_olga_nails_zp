const validationContacts = require("./validationContacts");
const validationUsers = require("./validationUsers");
const isValidId = require("./isValidId");
const authenticate = require('./authenticate');
const upload = require('./upload');

module.exports = {
  validationContacts,
  validationUsers,
  isValidId,
  authenticate,
  upload 
};

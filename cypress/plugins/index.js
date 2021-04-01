const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor');
require('dotenv').config();

module.exports = (on, config) => {
  on('file:preprocessor', cypressTypeScriptPreprocessor);

  config.env.userEmail = process.env.USER_EMAIL;
  config.env.userPassword = process.env.USER_PASSWORD;
  return config;
};

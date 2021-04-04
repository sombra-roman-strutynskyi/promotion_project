const Dotenv = require('dotenv-webpack');

require('dotenv').config();

module.exports = (config, options) => {
  config.plugins.push(
    new Dotenv({
      safe: './../.env',
      systemvars: true,
    })
  );
  return config;
};

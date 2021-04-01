// https://www.npmjs.com/pPKGage/@angular-builders/custom-webpack#custom-webpack-config-function
const Dotenv = require('dotenv-webpack');

require('dotenv').config();

module.exports = (config, options) => {
  config.plugins.push(
    new Dotenv({
      safe: './../.env', // load .env.example
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
    })
  );
  return config;
};

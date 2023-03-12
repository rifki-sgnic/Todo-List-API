const axios = require("axios");

const { TIMEOUT } = process.env;

module.exports = (baseUrl) => {
  return axios.create({
    baseUrl,
    timeout: parseInt(TIMEOUT),
  });
};

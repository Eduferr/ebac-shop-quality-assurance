require('dotenv').config();

const API_CONFIG = {
  baseUrl: process.env.BASE_URL,
  auth: process.env.BASIC_AUTH
};

module.exports = { API_CONFIG };

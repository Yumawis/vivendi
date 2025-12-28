const { PORT, ALLOWED_CORS } = require("./app.config.json");

const appConfig = {
  port: PORT ?? 5000,
  allowedCors: ALLOWED_CORS ?? [],
};

module.exports = { appConfig };

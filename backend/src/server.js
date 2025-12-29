require("dotenv").config();

const { appConfig } = require("./config/app.config");

const express = require("express");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const transactionRoutes = require("./routes/transactionRouter");

const app = express();

const ALLOWED_CORS = appConfig.allowedCors;
const PORT = appConfig.port;

app.use(express.json());

connectDB();

const prefix = "/api/v1/vivendi";

app.use(`${prefix}/auth`, authRoutes);
app.use(`${prefix}/user`, userRoutes);
app.use(`${prefix}/property`, propertyRoutes);
app.use(`${prefix}/transaction`, transactionRoutes);

app.listen(PORT, () => {
  console.log(
    "Servidor iniciado correctamente:",
    `http://localhost:${PORT}${prefix}`,
    ALLOWED_CORS
  );
});

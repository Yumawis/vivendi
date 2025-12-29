const express = require("express");
const router = express.Router();

const {
  createProperty,
  getProperty,
} = require("../controllers/propertyController");

router.post("/create", createProperty);
router.get("/", getProperty);

module.exports = router;

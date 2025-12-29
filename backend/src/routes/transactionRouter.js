const express = require("express");
const router = express.Router();

router.put("/property/:userId", addTransaction);

module.exports = router;

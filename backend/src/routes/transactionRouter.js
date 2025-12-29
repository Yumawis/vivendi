const express = require("express");
const router = express.Router();

const { addTransaction } = require("../controllers/transactionController");

router.put("/property/:userId", addTransaction);

module.exports = router;

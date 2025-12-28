const mongoose = require("mongoose");
const STATUS = require("../constants/statusProperty");
const STATUSTYPE = require("../constants/statusTransaction");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  status: { type: String, enum: [STATUS], required: true },
  statusType: { type: String, enum: Object.values(STATUSTYPE) },
});

module.exports = mongoose.model("Transaction", transactionSchema);

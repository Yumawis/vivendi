const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  registrationNumber: { type: String, required: true, unique: true },
  name: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true },
  price: { type: Number, required: true },
  tags: [{ type: String }],
  size: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Property", propertySchema);

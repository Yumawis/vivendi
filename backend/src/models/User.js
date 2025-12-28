const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, trim: true, required: true },
  lastName: { type: String, trim: true, required: true },
  documentType: { type: String, required: true },
  documentNumber: { type: String, trim: true, required: true, unique: true },
  propertyRegistration: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);

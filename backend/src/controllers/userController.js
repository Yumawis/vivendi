const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("propertyRegistration");

    const response = {
      data: {
        message: "Usuarios encontrados correctamente",
        result: users,
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    const errorMessage = error.message;

    const response = {
      data: {
        message: "Error encontrando los usuarios",
        error: errorMessage,
      },
    };

    return res.status(420).json(response);
  }
};

module.exports = { getUsers };

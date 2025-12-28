const User = require("../models/User");

const signUp = async (req, res) => {
  try {
    const { firstName, lastName, documentNumber } = req.body;

    const existingUser = await User.findOne({ documentNumber });

    if (existingUser) {
      return res.status(400).json({
        data: { message: "El usuario ya existe" },
      });
    }

    const newUser = new User({
      firstName,
      lastName,
      documentNumber,
    });

    const savedUser = await newUser.save();
    const currentUser = { id: savedUser._id };

    const response = {
      data: {
        message: "Usuario registrado correctamente",
        result: currentUser,
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    const errorMessage = error.message;

    const response = {
      data: {
        message: "Ocurrió un error iniciando sesión",
        error: errorMessage,
      },
    };

    return res.status(420).json(response);
  }
};

const login = async (req, res) => {
  try {
    const { documentNumber } = req.body;

    const user = await User.findOne({ documentNumber });

    if (!user) {
      return res.status(400).json({
        data: { message: "Usuario no encontrado" },
      });
    }

    console.log("Inicio de sesión:", email);

    const response = {
      data: {
        message: "Inicio de sesión existoso",
        resutl: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          documentNumber: user.documentNumber,
        },
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    const errorMessage = error.message;

    const response = {
      data: {
        message: "Ocurrió un error al iniciar sesión",
        error: errorMessage,
      },
    };

    return res.status(420).json(response);
  }
};

module.exports = { signUp, login };

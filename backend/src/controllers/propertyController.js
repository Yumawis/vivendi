const Property = require("../models/Property");
const User = require("../models/User");

const createProperty = async (req, res) => {
  try {
    const { userId } = req.params;
    const { registrationNumber, name, description, price, tags, size } =
      req.body;

    const userExists = await User.exists({ _id: userId });

    if (!userExists) {
      return res.status(400).json({
        data: { message: "El usuario no existe" },
      });
    }

    const property = await Property.findOne({ registrationNumber });

    if (property) {
      return res.status(400).json({
        data: { message: "La propiedad ya existe" },
      });
    }

    const newProperty = new Property({
      registrationNumber,
      name,
      description,
      price,
      tags,
      size,
    });

    const savedProperty = await newProperty.save();

    const response = {
      data: {
        message: "Propiedad creada exitosamente",
        result: savedProperty,
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    const errorMessage = error.message;

    const response = {
      data: {
        message: "Ocurrió un error creando la propiedad",
        error: errorMessage,
      },
    };

    return res.status(420).json(response);
  }
};

const getProperty = async (req, res) => {
  try {
    const properties = await Property.find();

    const response = {
      data: {
        message: "Propiedades encontradas correctamente",
        result: properties,
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    const errorMessage = error.message;

    const response = {
      data: {
        message: "Error al encontrar las propiedades",
        error: errorMessage,
      },
    };

    return res.status(400).json(response);
  }
};

module.exports = { createProperty, getProperty };

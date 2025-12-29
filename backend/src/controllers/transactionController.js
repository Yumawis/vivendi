const User = require("../models/User");
const Property = require("../models/Property");
const Transactions = require("../models/Transactions");

const STATUS = require("../constants/statusProperty");

const addTransaction = async (req, res) => {
  try {
    const { userId } = req.params;
    const { propertyId, statusType } = req.body;

    const userExists = await User.exists({ _id: userId });

    if (!userExists) {
      return res.status(400).json({
        data: { message: "El usuario no existe" },
      });
    }

    const property = await Property.findOne({
      _id: propertyId,
      status: STATUS.AVAILABLE,
    });

    if (!property) {
      return res.status(400).json({
        data: { message: "La propiedad no existe o no está disponible" },
      });
    }

    const transaction = await Transactions.updateOne(
      { userId, propertyId },
      { $setOnInsert: { userId, propertyId, statusType } },
      { upsert: true }
    );

    if (transaction.matchedCount === 1 && transaction.upsertCount === 0) {
      return res.status(400).json({
        data: { message: "Ya realizaste una operación en la misma propiedad" },
      });
    }

    const response = {
      data: {
        message: "Operación realizada correctamente",
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    const errorMessage = error.message;

    const response = {
      data: {
        message: "Ocurrió un error al realizar la operación",
        error: errorMessage,
      },
    };

    return res.status(420).json(response);
  }
};

module.exports = { addTransaction };

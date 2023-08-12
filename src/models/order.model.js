const mongoose = require("mongoose");
const product = require("./product.model");
const account = require("./account.model");

const orderSchema = new mongoose.Schema({
  idAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "account",
    required: true,
  },
  idSeller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "account",
    required: true,
  },
  detail: [
    {
      idProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      isEvaluated: {
        type: Boolean,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    enum: ["cancelled", "pending", "successful"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  message: {
    type: String,
  },
});

module.exports = mongoose.model("order", orderSchema);

const mongoose = require("mongoose");
const product = require("./product.model");

const accountSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["Admin", "Buyer", "Seller"],
      default: "Buyer",
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    avatar: { type: String },
    job: { type: String, default: "" },
    address: { type: String, default: "" },
    shopName: { type: String, default: "" },
    requestStatus: {
      type: String,
      enum: ["Become-seller", "None"],
    },
    accountStatus: {
      type: String,
      enum: ["None", "Pending", "Reported", "Banned"],
    },
    cart: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        quantity: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("account", accountSchema);

const mongoose = require("mongoose");
const AdminSchema=new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, 
    },
    password: {
      type: String,
      required: true,
    },
    Buzzes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Buzz",
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Admin",AdminSchema);
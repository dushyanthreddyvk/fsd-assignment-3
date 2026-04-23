const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a member name'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Please provide a role'],
      trim: true,
    },
    registerNumber: {
      type: String,
      required: [true, 'Please provide a register number'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    contactNumber: {
      type: String,
      required: [true, 'Please provide a contact number'],
      trim: true,
    },
    image: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Member', memberSchema);

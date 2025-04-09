const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    // name: {
    //   type: String,
    //   required: [true, 'Please add a name'],
    // },
    name: {
      type: String,
      required: [true, 'Please add a name'],
      validate: {
        validator: function (v) {
          return /^[a-zA-Z ]{2,30}$/.test(v) // Name should only contain letters and spaces, 2-30 characters
        },
        message: (props) => `${props.value} is not a valid name! Only letters and spaces are allowed, and it must be 2-30 characters long.`,
      },
    },
    // email: {
    //   type: String,
    //   required: [true, 'Please add an email'],
    //   unique: true,
    // },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) // Basic email format
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    // phone: {
    //   type: String,
    //   required: [true, 'Please add a phone number'],
    // },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
      validate: {
        validator: function (v) {
          return /^[0-9]{10}$/.test(v); // Example: 10-digit phone number
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    // password: {
    //   type: String,
    //   required: [true, 'Please add a password'],
    //   min: [6, 'password must contain at least 6 numbers'],
    //   max: 12,
    // },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      validate: {
        validator: function (v) {
          return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/.test(v) // Password: 6-12 characters, at least one letter and one number
        },
        message: (props) => `Password must be 6-12 characters long, and include at least one letter and one number.`,
      },
    },
    identificationType: {
      type: String,
      required: [true, 'Please add identification type'],
      enum: ['driver license', 'passport', 'national ID'],
    },
    identificationNumber: {
      type: String,
      required: [true, 'Please add the identification number'],
      min: [6, 'at least 6 numbers'],
      max: 12,
      unique: true,
    },
    balance: {
      type: Number,
      default: 1000,
    },
    moneySend: {
      type: Number,
      default: 0,
    },
    moneyReceived: {
      type: Number,
      default: 0,
    },
    requestReceived: {
      type: Number,
      default: 0,
    },
    transactionLimit: {
      type: Number,
      default: 5000, // Daily transaction limit in rupees
    },
    address: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keysecret = process.env.KEY_SECRET

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("not valid email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  cpassword: {
    type: String,
    required: true,
    minlength: 6,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// hash password

//mongodb save method call and before this password is being hashed.
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }

  next();
});

//token generate

userSchema.methods.generateAuthtoken = async function () {
  try {
    let token_2 = jwt.sign({ _id: this._id }, keysecret, {
      expiresIn: "1d",
    });

    this.tokens = this.tokens.concat({ token: token_2 });
    await this.save();
    return token_2;
  } catch (error) {
    res.status(422).json(error);
  }
};

// creating model

const userdb = new mongoose.model("users", userSchema);

module.exports = userdb;

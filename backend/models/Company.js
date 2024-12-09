const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

mongoose.Schema.Types.String.set("trim", true);

const CompanySchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 31,
    unique: true,
  },
  username: {
    type: String,
    minLength: 1,
    maxLength: 31,
    unique: true,
  },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    required: true,
    minLength: 1,
    maxLength: 31,
    unique: true,
  },
  password: { type: String, required: true, minLength: 1, maxLength: 31 },
  address: { type: String, required: true, minLength: 1, maxLength: 31 },
  size: { type: Number, required: true, min: 1, max: 100 },
  phone: { type: String, required: true, minLength: 1, maxLength: 31 },
  website: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid website url!`,
    },
    required: true,
    minLength: 1,
    maxLength: 31,
  },
  departments: {
    type: [String],
    required: true,
    minLength: 1,
    maxLength: 31,
    // set: stringToArray,
  },
});

// function stringToArray(departmentsString) {
//   return departmentsString.split(",").map((item) => item.trim());
// }

CompanySchema.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

const Company = mongoose.model("Company", CompanySchema);
module.exports = Company;

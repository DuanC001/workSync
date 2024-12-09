const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

mongoose.Schema.Types.String.set("trim", true);

const EmployeeSchema = new Schema({
  companyID: { type: mongoose.ObjectId, ref: "Company" },
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50,
  },
  address: { type: String, required: true, minLength: 1, maxLength: 31 },
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
    default: "12345",
  },
  phone: { type: String, required: true, minLength: 1, maxLength: 50 },
  education: { type: String, required: true, minLength: 1, maxLength: 50 },
  jobTitle: { type: String, required: true, minLength: 1, maxLength: 50 },
  department: { type: String, required: true, minLength: 1, maxLength: 50 },
  sin: { type: String, required: true, minLength: 1, maxLength: 50 },
  managerName: { type: String, required: true, minLength: 1, maxLength: 50 },
  managerEmail: {
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
    maxLength: 50,
  },
  startDate: { type: String, required: true, minLength: 1, maxLength: 50 },
  salary: { type: String, required: true, minLength: 1, maxLength: 50 },
  salaryType: { type: String, required: true, minLength: 1, maxLength: 50 },
  profilePicture: {
    type: String,
    minLength: 1,
    maxLength: 256,
    default: "null",
  },
  password: { type: String, required: true, minLength: 1, maxLength: 50 },
  status: {
    type: String,
    enum: ["active", "inactive"],
    required: true,
    minLength: 1,
    maxLength: 10,
    default: "active",
  },
  jobType: {
    type: String,
    required: true,
    enum: ["employee", "contractor"],
    minLength: 1,
    maxLength: 50,
  },
  isJoined: {type: String, minLength: 1, maxLength: 50, default: "Awaiting Join"},
  isManager: { type: Boolean, required: true, default: false },
  duration: { type: String, minLength: 1, maxLength: 50, default: "6 Months" },
  country: { type: String, minLength: 1, maxLength: 50, default: "Canada" },
  province: { type: String, minLength: 1, maxLength: 50, default: "BC" },
  payPeriod: { type: String, minLength: 1, maxLength: 50, default: "Hourly" },
  offBoardingReason: {
    type: String,
    minLength: 1,
    maxLength: 31,
    default: "null",
  },
  lastEmploymentDay: {
    type: String,
    minLength: 1,
    maxLength: 31,
    default: "null",
  },
  lastWorkingDay: {
    type: String,
    minLength: 1,
    maxLength: 31,
    default: "null",
  },
  documentImage: {
    type: String,
    minLength: 1,
    maxLength: 1000,
    default: null,
  },
  documentName: {
    type: String,
    minLength: 1,
    maxLength: 100,
    default: null,
  },
  documentDate: {
    type: String,
    minLength: 1,
    maxLength: 100,
    default: null,
  },
  documentNotes: {
    type: String,
    minLength: 1,
    maxLength: 200,
    default: null,
  },
  allergies: {
    type: String,
    minLength: 1,
    maxLength: 31,
    default: "none",
  },
  workSchedule: {
    type: String,
    enum: ["Day Shift", "Night Shift"],
    minLength: 1,
    maxLength: 50,
    default: "Day Shift",
  },
});

EmployeeSchema.pre("save", function (next) {
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
  } else if (this.isModified("sin") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.sin, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.sin = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;

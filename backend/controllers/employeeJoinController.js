const Employee = require("../models/Employee");
const Company = require("../models/Company");
require("dotenv").config();

const employeeJoin = async (req, res) => {
  const { companyId, employeeId } = req.params;
  try {
    const employee = await Employee.findOneAndUpdate(
      { _id: employeeId, companyID: companyId },
      { $set: { isJoined: "joined" } },
      { new: true }
    );
    if (!employee) {
      return res.status(404).send("Employee not found.");
    }
    return res.redirect(process.env.FRONTEND_URL + "/employee-join");
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred.");
  }
};

module.exports = {
  employeeJoin,
};

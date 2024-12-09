const express = require("express");
const router = express.Router();

// import the controller, make sure it is exported
const { employeeJoin } = require("../controllers/employeeJoinController");

// GET: /employees/:id/email
router.get("/companies/:companyId/employees/:employeeId/active", employeeJoin);

// Export the router
module.exports = router;

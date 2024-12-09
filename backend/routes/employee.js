const express = require("express");
const router = express.Router();
const { authorization } = require("../middlewares/verifyUser");
// import the controller, make sure it is exported
const {
  getEmployee,
  onboardEmployee,
  offboardEmployee,
  editEmployee,
} = require("../controllers/employeeController");

// GET: /employees
router.get("/companies/:cid/employees", authorization, getEmployee);
// GET: /employees/:id
router.get("/companies/:cid/employees/:id", authorization, getEmployee);
// POST: /employees
router.post("/companies/:cid/employees", authorization, onboardEmployee);
//
// PUT: /employees/:id
router.post("/companies/:cid/employees/:id", authorization, offboardEmployee);

// PUT: /employees/:id
router.put("/companies/:cid/employees/:id", authorization, editEmployee);

// Export the router
module.exports = router;

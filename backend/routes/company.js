const express = require("express");
const router = express.Router();
const { authorization } = require("../middlewares/verifyUser");
// import the controller, make sure it is exported
const {
  getCompany,
  registerCompany,
} = require("../controllers/companyController");
// GET: /company
router.get("/companies", authorization, getCompany);
// GET: /company/:id
router.get("/companies/:id", authorization, getCompany);
// POST: /company
router.post("/companies", authorization, registerCompany);
// Export the router
module.exports = router;

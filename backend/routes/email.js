const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/verifyUser");
// import the controller, make sure it is exported
const { sendReminder } = require("../controllers/emailController");


// GET: /employees/:id/email
router.get("/companies/:cid/employees/:id/email", sendReminder);


// Export the router
module.exports = router;

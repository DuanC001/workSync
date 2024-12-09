const express = require("express");
const router = express.Router();
// import the controller, make sure it is exported
const { login, signout } = require("../controllers/authUserController");
// POST: /login
router.post("/login", login);
// GET: /signout
router.get("/signout", signout);

module.exports = router;

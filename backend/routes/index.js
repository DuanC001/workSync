const express = require("express");
const router = express.Router({ mergeParams: true });
// import the different routers
const employeeRouter = require("./employee");
const companyRouter = require("./company");
const userRouter = require("./user");
const emailRouter =  require("./email");
const employeeJoinlRouter = require("./employeeJoin");
// nest the routers
router.use(employeeRouter);
router.use(companyRouter);
router.use(userRouter);
router.use(emailRouter);
router.use(employeeJoinlRouter);
module.exports = router;

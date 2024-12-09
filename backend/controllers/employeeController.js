const Employee = require("../models/Employee");

const getEmployee = (req, res) => {
  const employeeId = req.params.id;
  const companyId = req.params.cid;

  // if (req.userId !== companyId) {
  //   return res.status(401).json("You can get only your employees");
  // }

  if (typeof employeeId == "undefined") {
    // console.log("companyID", companyId);

    Employee.find({ companyID: companyId })
      .exec()
      .then((results) => {
        res.status(201).json(results);
        // console.log("results", results);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  } else {
    Employee.findOne({ companyID: companyId, _id: employeeId })
      .exec()
      .then((results) => {
        if (results == null) {
          res.status(404).json(results);
        } else {
          res.status(200).json(results);
        }
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  }
};

const onboardEmployee = (req, res) => {
  // if (req.userId !== req.params.cid) {
  //   return res
  //     .status(401)
  //     .json("You can only onboard employees in your company");
  // }

  req.body.companyID = req.params.cid;

  const newEmployee = new Employee(req.body);

  newEmployee
    .save()
    .then((results) => {
      res.status(201).json(results);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

const offboardEmployee = async (req, res, next) => {
  // if (req.userId !== req.params.cid) {
  //   return res.status(401).json("You can offboard only your employees");
  // }

  try {
    const { offBoardingReason, lastEmploymentDay, lastWorkingDay } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status: "inactive",
          offBoardingReason,
          lastEmploymentDay,
          lastWorkingDay,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedEmployee);
  } catch (error) {
    next(error);
  }
};

const editEmployee = async (req, res, next) => {
  // if (req.userId !== req.params.cid) {
  //   return res.status(401).json("You can edit only your employees");
  // }

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedEmployee);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEmployee,
  onboardEmployee,
  offboardEmployee,
  editEmployee,
};

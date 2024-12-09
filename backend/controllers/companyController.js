const Company = require("../models/Company");

const getCompany = (req, res) => {
  const id = req.params.id;

  if (typeof id == "undefined") {
    Company.find({})
      .exec()
      .then((results) => {
        res.status(201).json(results);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  } else {
    Company.findOne({ _id: id })
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

const registerCompany = (req, res) => {
  const newCompany = new Company(req.body);
  // console.log(newCompany)
  newCompany
    .save()
    .then((results) => {
      res.status(201).json(results);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

module.exports = {
  getCompany,
  registerCompany,
};

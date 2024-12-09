const Employee = require("../models/Employee");
const Company = require("../models/Company");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
require("dotenv").config();

const sendReminder = async (req, res) => {
  const employeeId = req.params.id;
  const companyId = req.params.cid;

  try {
    const employee = await Employee.findOne({
      companyID: companyId,
      _id: employeeId,
    }).exec();
    if (!employee) {
      return res.status(404).send("Employee not found");
    }

    const company = await Company.findById(companyId).exec();
    if (!company) {
      return res.status(404).send("Company not found");
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: company.name,
        link: company.website,
      },
    });

    let emailBody = {
      body: {
        name: employee.name,
        intro: `You have been invited to join ${company.name} as a full-time employee. Click on the button below to accept the employment invitation.`,
        action: {
          button: {
            color: "#FA6432", // Green button
            text: "Accept Invitation",
            link:
              process.env.VITE_API_ENDPOINT +
              `/companies/${companyId}/employees/${employeeId}/active`,
          },
        },
        outro: `<br><br>If you don't want to continue or are not aware of this, simply ignore this email.`,
      },
    };

    let emailText = MailGenerator.generate(emailBody);
    let message = {
      from: process.env.EMAIL,
      to: employee.email,
      subject: "Joining Reminder",
      html: emailText,
    };

    await transporter.sendMail(message);
    res.status(200).json({ msg: "Reminder email sent successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while sending the email." });
  }
};

module.exports = {
  sendReminder,
};

const nodemailer = require("nodemailer"); // for sending emails

module.exports = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "habibatarekmohamed6@gmail.com",
    pass: "Thinktwice2",
  },
});

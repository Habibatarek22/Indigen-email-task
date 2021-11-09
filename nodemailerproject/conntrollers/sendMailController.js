const nodemailerTransporter = require("../config/nodemailerTransporter");
const fs = require("fs"); //delete image to not being stored in the image folder everytime
function deleteImage(path) {
  fs.unlink(path, (err) => {
    if (err) console.error(err);
  });
}

//sendemail that exists in index.html "action form"
module.exports = (req, res) => {
  // execute this middleware to upload image
  const { to, subject, body } = req.body;
  const { path } = req.file;
  console.log(req.body);

  const mailOptions = {
    from: "habibatarekmohamed6@gmail.com",
    to,
    subject,
    text: body,
    attachments: [
      {
        path: path,
      },
    ],
  };
  //transporter is the transport configuration object
  nodemailerTransporter.sendMail(mailOptions, function (err, info) {
    deleteImage(path);
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent " + info.response);
      return res.redirect("/result.html");
    }
  });
};

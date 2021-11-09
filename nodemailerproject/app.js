const nodemailer = require("nodemailer"); // for sending emails
const express = require("express"); //back end web application framework for Node.js
const bodyParser = require("body-parser"); //responsible for parsing the incoming request bodies in a middleware before handling it
const multer = require("multer");
const multerConfig = require("./config/multer.config");

const sendMailController = require("./conntrollers/sendMailController");

const storage = multer.diskStorage(multerConfig);

const upload = multer({
  storage,
}).single("image"); //multiple files or single files being uploaded

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("/index.html");
}); // getting input from index.html to,subject,message and attachments

app.post("/sendemail", upload, sendMailController); //upload ba2t request handler=sendmailcontroller, upload all files, then send mail

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("App started on port " + port);
});

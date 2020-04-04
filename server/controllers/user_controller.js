const passport = require("passport");
const dotenv = require("dotenv");
const strategy = require("passport-facebook");

const userModel = require("../models/user");
const { mailjet } = require("../config/mailerConfig");

const FacebookStrategy = strategy.Strategy;

dotenv.config();

const sendRegisterEmail = (email, token) => {
  mailjet
    .post("send", { version: "v3.1" })
    .request({
      Messages: [
        {
          From: {
            Email: "segolene.alquier@gmail.com",
            Name: "Hypertube team",
          },
          To: [
            {
              Email: email,
              Name: "You",
            },
          ],
          TemplateID: 1322275,
          TemplateLanguage: true,
          Subject: "Welcome to Hypertube",
          Variables: {
            firstname: "user",
            COMFIRMATION_TOKEN: token,
          },
        },
      ],
    })
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
};

module.exports.sendRegisterEmail = sendRegisterEmail;

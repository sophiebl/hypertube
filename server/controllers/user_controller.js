const passport = require("passport");
const dotenv = require("dotenv");
const strategy = require("passport-facebook");

const userModel = require("../models/user");
const { mailjet } = require("../config/mailerConfig");

const FacebookStrategy = strategy.Strategy;

dotenv.config();

const sendRegisterEmail = () => {
  console.log("EMAIL FUNCTION //////////");
  mailjet
    .post("send", { version: "v3.1" })
    .request({
      Messages: [
        {
          From: {
            Email: "segolene.alquier@gmail.com",
            Name: "Me"
          },
          To: [
            {
              Email: "segolene.alquier@yahoo.com",
              Name: "You"
            }
          ],
          TemplateID: 1322275,
          TemplateLanguage: true,
          Subject: "Welcome to Matcha",
          Variables: {
            firstname: "user",
            COMFIRMATION_TOKEN: ""
          }
        }
      ]
    })
    .then(result => {
      console.log(result.body);
    })
    .catch(err => {
      console.log(err.statusCode);
    });
};

module.exports.sendRegisterEmail = sendRegisterEmail;

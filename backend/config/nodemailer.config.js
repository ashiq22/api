require("dotenv").config();
const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD
  },
});

module.exports.sendConfirmationEmail = (fname, email, confirmationCode) => {
  transport.sendMail ({
    from: `${process.env.SMTP_FROM_NAME}  <${process.env.SMTP_FROM_EMAIL}>`,
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
        <h2>Bonjour ${fname}</h2>
        <h3>Bienvenue Chez Malabus</h3>
        <p>Pouvez vous confirmer votre email ?</p>
        <button class="button button1" style="  background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        -webkit-transition-duration: 0.4s; /* Safari */
        transition-duration: 0.4s;"><a href=https://malabus.net/confirm/${confirmationCode}>Confirmer mon email   </a>


        </button>
        </div>`,
  }).catch(err => console.log(err));
};




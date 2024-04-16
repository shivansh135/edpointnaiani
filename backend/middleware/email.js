const nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "educationpointnaini@gmail.com",
    pass: "ssih vdpc hsos eghm",
  },
});

function sendEmailMiddleware(req){
    const [receiverEmail, subject, body] = req;
    // Email options
    const mailOptions = {
      from: 'educationpointnaini@gmail.com', // Sender address
      to: receiverEmail, // List of receivers
      subject: subject, // Subject line
      text: body // Plain text body
    };
  
    // Sending email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        
      } else {
        console.log('Email sent:', info.response);
      }
    });
  };

  module.exports = sendEmailMiddleware;
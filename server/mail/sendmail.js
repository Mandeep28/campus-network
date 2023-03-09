const nodemailer = require('nodemailer');

const sendEmail = async ({to, subject ,html}) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

   transporter.sendMail({
    from: `"Team Campus Network" ${process.env.EMAIL}`, // sender address
    to,
    subject,
    html ,
  }
   ,(error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
};



module.exports = sendEmail;

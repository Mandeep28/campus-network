const sendEmail = require('./sendmail');

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;

  const message = `<p>Please confirm your email by clicking on the following link : 
  <a href="${verifyEmail}">Verify Email</a> </p>
  <br><br><br>
  <p>Thank You </p>
  <p>Team Campus Network</p>`;

  return sendEmail({
    to: email,
    subject: 'Email Confirmation ',
    html: `<h4>Hello, ${name}</h4>
    ${message}
    `,
  });
};

module.exports = sendVerificationEmail;

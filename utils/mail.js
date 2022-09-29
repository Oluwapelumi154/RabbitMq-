const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'c200e3d7c0a2b6',
    pass: '6fb8f37fde7a9b'
  }
});

const sendMail = async (data) => {
  const options = {
    from: `orebayopelumi@gmail.com <"Pelumi">`,
    subject: data.subject,
    to: data.email,
    text: data.message
  };
  await transporter.sendMail(options);
};
module.exports = sendMail;

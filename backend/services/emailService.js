import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const emailConfig = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
};


export const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport(emailConfig);

  const mailOptions = {
    from: emailConfig.auth.user,
    to,
    subject,
    html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h1 style="color: #4CAF50;">Hey ${userName} Welcome to <b>Blog App</b>!</h1>
      <p>Hi there,</p>
      <p>Thank you for registering with <b>Blog app</b>. We're excited to have you on board!</p>
      <p>Best regards,</p>
      <p>The <b>ba</b> Team</p>
    </div>
  `  };
      // Send email
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
      } catch (error) {
        console.error("Error sending email: " + error);
      }
};

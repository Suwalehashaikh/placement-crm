import nodemailer from "nodemailer";
import dns from "node:dns";

// Force Node.js to prefer IPv4 instead of IPv6
dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASS,
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

// Test SMTP connection
transporter.verify((error) => {
  if (error) {
    console.log("SMTP Error:", error.message);
  } else {
    console.log("SMTP Connected Successfully");
  }
});

export const sendEmail = async (
  recipient,
  subject,
  content
) => {
  const info = await transporter.sendMail({
    from: `"SS CRM" <${process.env.EMAIL_USER}>`,
    to: recipient,
    subject,
    text: subject,
    html: content,
  });

  console.log("Message sent:", info.messageId);

  return info;
};
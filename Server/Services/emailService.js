import nodemailer from "nodemailer";
import dotenv from "dotenv"

dotenv.config({path:"../.env"})
/* 
// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASS,
  },
}); */
const transporter = nodemailer.createTransport({
  service: "gmail",   // 👈 host + port ki jagah ye use karo
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP Error:", error);
  } else {
    console.log("SMTP Connected");
  }
});
//wrap in an IIFE so we can use await

    export const sendEmail = async(recepient,subject,content)=>{
     const info = await transporter.sendMail({
      from: '"SS CRM" <suwalehashaikh8@gmail.com>',
      to: recepient,
      subject:subject,
      text: subject,
      html: content,
     })
     console.log("Message sent:", info.messageId);
    };

    
  
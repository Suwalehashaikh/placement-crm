import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (recepient, subject, content) => {
  const { data, error } = await resend.emails.send({
    from: "SS CRM <onboarding@resend.dev>", // niche note dekho
    to: recepient,
    subject: subject,
    html: content,
  });

  if (error) {
    console.log("Resend Error:", error);
    throw error;
  }

  console.log("Message sent:", data.id);
};
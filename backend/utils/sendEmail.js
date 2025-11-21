// backend/utils/sendEmail.js
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text) => {
  try {
    await resend.emails.send({
      from: "AllergenScanner <allergenscannerai@gmail.com>", // Gmail as sender
      to,
      subject,
      text,
    });
    console.log(`✅ Email sent successfully to ${to}`);
  } catch (err) {
    console.error("❌ Error sending email:", err);
  }
};

export default sendEmail;

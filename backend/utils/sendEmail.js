import { Resend } from "resend";

const sendEmail = async (to, subject, html) => {
  if (!process.env.RESEND_API_KEY) {
    console.error("❌ RESEND_API_KEY is missing!");
    throw new Error("RESEND_API_KEY not found in environment variables.");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: "AllergenScanner <allergenscannerai@gmail.com>",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("❌ Error sending email:", error);
    } else {
      console.log("✅ Email sent successfully to ${to}");
    }
  } catch (err) {
    console.error("❌ Email sending failed:", err);
  }
};

export default sendEmail;
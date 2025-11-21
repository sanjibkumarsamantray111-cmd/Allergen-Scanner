// backend/utils/sendEmail.js
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'AllergenScanner <allergenscannerai@gmail.com>',
      to,
      subject,
      html,
    });
    if (error) console.error('❌ Error sending email:', error);
    else console.log(`✅ Email sent successfully to ${to}`, data);
  } catch (err) {
    console.error('❌ Error sending email:', err);
  }
};

export default sendEmail;

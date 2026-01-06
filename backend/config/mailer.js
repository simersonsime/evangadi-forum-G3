import transporter from "../config/email.js";

const sendEmail = async ({ to, subject, html }) => {
try {
    await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
    });
} catch (error) {
    console.error("Email error:", error);
}
};

export default sendEmail;
// email utility to send emails using nodemailer transporter
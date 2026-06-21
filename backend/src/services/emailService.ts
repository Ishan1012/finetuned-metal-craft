import resend from "../config/Resend";

export const sendEmail = async (to: string, subject: string, text: string, html: string) => {
    try {
        await resend.emails.send({
            from: `"Admin Portal" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text,
            html,
        });
        console.log(`Email sent successfully to ${to}`);
    } catch (error) {
        console.error(`Failed to send email to ${to}:`, error);
        throw error;
    }
};
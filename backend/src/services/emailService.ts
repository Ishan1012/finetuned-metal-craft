import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true for 465, false for other ports
    connectionTimeout: 20000, // 20 seconds
    greetingTimeout: 20000,
    socketTimeout: 20000,
    tls: {
        rejectUnauthorized: false // Helps prevent local/Render certificate issues
    }
});

export const sendEmail = async (to: string, subject: string, text: string, html: string) => {
    try {
        await transporter.sendMail({
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
import 'dotenv/config';
import nodemailer from 'nodemailer';

const host = process.env.SMTP_HOST || 'smtp.gmail.com';
const port = Number(process.env.SMTP_PORT) || 465;
const user = process.env.SMTP_USER || 'memomate702@gmail.com';
const pass = process.env.SMTP_PASS || 'flrnplfiyscovecf';

const transporter = nodemailer.createTransport({
    service: host.includes('gmail') ? 'gmail' : undefined,
    host: host,
    port: port,
    secure: port === 465,
    auth: {
        user: user,
        pass: pass,
    },
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 20000,
    tls: {
        rejectUnauthorized: false
    }
});

export default transporter;
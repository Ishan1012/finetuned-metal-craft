import 'dotenv/config';
import nodemailer from 'nodemailer';

const host = process.env.SMTP_HOST || 'smtp.gmail.com';
const port = Number(process.env.SMTP_PORT) || 587;
const user = process.env.SMTP_USER || 'memomate702@gmail.com';
const pass = process.env.SMTP_PASS || 'flrnplfiyscovecf';

const isSecure = port === 465;

const transporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: isSecure,
    auth: {
        user: user,
        pass: pass,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    tls: {
        rejectUnauthorized: false
    }
});

export default transporter;
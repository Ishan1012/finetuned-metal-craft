import { QueueOptions, Worker } from 'bullmq';
import IORedis from 'ioredis';
import { sendEmail } from './emailService';

const connection = new IORedis(process.env.UPSTASH_REDIS_REST_URL!);

const worker = new Worker('email-tasks', async (job) => {
  const { email, subject, text, html } = job.data;
  await sendEmail(email, subject, text, html);
}, { connection } as QueueOptions);

console.log("Worker started and listening for emails...");
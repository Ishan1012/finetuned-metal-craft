import { QueueOptions, Queue } from 'bullmq';
import IORedis from 'ioredis';

// Use environment variables for your Upstash Redis connection string
const connection: IORedis = new IORedis(process.env.REDIS_URL!); 
export const emailQueue = new Queue('email-tasks', { connection } as QueueOptions);
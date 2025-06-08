import { createClient } from 'redis';

const redisClient = createClient({host: 'localhost',
  port: 6379});

redisClient.connect().catch(console.error);

export default redisClient;

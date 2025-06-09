import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();
// const redisClient = createClient({host: 'localhost',
//   port: 6379});
const redisClient = createClient({
  url: process.env.UPSTASH_REDIS_TLS_URL,
});

redisClient.connect().catch(console.error);

export default redisClient;

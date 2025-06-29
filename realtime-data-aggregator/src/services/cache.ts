import Redis from 'ioredis';

let client: Redis | null = null;

export function getRedisClient() {
  if (!client) {
    // Prefer REDIS_URL if available (for Railway and similar platforms)
    if (process.env.REDIS_URL) {
      client = new Redis(process.env.REDIS_URL);
    } else {
      client = new Redis({
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: Number(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD
      });
    }
  }
  return client;
}
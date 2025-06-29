import Redis from 'ioredis';

let client: Redis | null = null;

export function getRedisClient() {
  if (!client) {
    client = new Redis({
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: Number(process.env.REDIS_PORT) || 6379
    });
  }
  return client;
}
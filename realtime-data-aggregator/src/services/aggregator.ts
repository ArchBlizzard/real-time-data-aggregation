import { getRedisClient } from './cache';
import { fetchDexScreener } from './fetchers';

const CACHE_KEY = 'tokens';
const TTL_SECONDS = 30;

export async function getCachedTokens() {
  const redis = getRedisClient();
  const cached = await redis.get(CACHE_KEY);
  if (cached) return JSON.parse(cached);
  return fetchAndCacheTokens();
}

export async function fetchAndCacheTokens() {
  const dexScreenerData = await fetchDexScreener();
  const merged = mergeTokens(dexScreenerData);
  const redis = getRedisClient();
  await redis.set(CACHE_KEY, JSON.stringify(merged), 'EX', TTL_SECONDS);
  return merged;
}

function mergeTokens(data: any[]) {
  // Simple version: just return data
  // For real app, merge duplicates by token_address
  return data;
}
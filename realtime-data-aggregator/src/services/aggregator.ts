import { getRedisClient } from './cache';
import { fetchDexScreener, fetchGeckoTerminal } from './fetchers';

const CACHE_KEY = 'tokens';
const TTL_SECONDS = 30;

export async function getCachedTokens() {
  const redis = getRedisClient();
  const cached = await redis.get(CACHE_KEY);
  if (cached) return JSON.parse(cached);
  return fetchAndCacheTokens();
}

export async function fetchAndCacheTokens() {
  // Fetch from both APIs in parallel
  const [dexScreenerData, geckoTerminalData] = await Promise.all([
    fetchDexScreener(),
    fetchGeckoTerminal()
  ]);
  // Merge tokens by token_address
  const merged = mergeTokens([ ...dexScreenerData, ...geckoTerminalData ]);
  const redis = getRedisClient();
  await redis.set(CACHE_KEY, JSON.stringify(merged), 'EX', TTL_SECONDS);
  return merged;
}

function mergeTokens(tokens: any[]) {
  const merged: { [address: string]: any } = {};
  for (const t of tokens) {
    if (!merged[t.token_address]) {
      merged[t.token_address] = t;
    } else {
      // Merge logic: prefer DexScreener data, or combine fields as needed
      merged[t.token_address] = {
        ...merged[t.token_address],
        ...t,
        sources: [
          ...(merged[t.token_address].sources || [merged[t.token_address].source]),
          t.source
        ]
      };
    }
  }
  // Remove .source, keep .sources array
  return Object.values(merged).map((t: any) => {
    delete t.source;
    return t;
  });
}
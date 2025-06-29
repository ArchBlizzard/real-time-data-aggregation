import { getRedisClient } from './cache';
import { fetchDexScreener /*, fetchGeckoTerminal, fetchJupiterPrices */ } from './fetchers';

const CACHE_KEY = 'tokens';
const TTL_SECONDS = 30;

export async function getCachedTokens() {
  const redis = getRedisClient();
  const cached = await redis.get(CACHE_KEY);
  if (cached) return JSON.parse(cached);
  return fetchAndCacheTokens();
}

export async function fetchAndCacheTokens() {
  // Fetch only from DexScreener
  const dexScreenerData = await fetchDexScreener();
  // If you want to add back other sources, use:
  // const [dexScreenerData, geckoTerminalData] = await Promise.all([
  //   fetchDexScreener(),
  //   fetchGeckoTerminal()
  // ]);
  // const allTokens = [ ...dexScreenerData, ...geckoTerminalData ];
  const allTokens = [ ...dexScreenerData ];

  // If you want to add back Jupiter, use:
  // const tokenIds = allTokens.map(t => t.token_address).filter(Boolean);
  // const jupiterPrices = await fetchJupiterPrices(tokenIds);
  // const merged = mergeTokens(allTokens).map(token => {
  //   const jup = jupiterPrices[token.token_address];
  //   return {
  //     ...token,
  //     jupiter_price: jup?.price || null
  //   };
  // });

  // For now, just merge DexScreener tokens
  const merged = mergeTokens(allTokens);

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
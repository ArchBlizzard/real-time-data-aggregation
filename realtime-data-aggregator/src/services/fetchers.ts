import { axiosWithBackoff } from './retry';

// DexScreener fetcher
export async function fetchDexScreener() {
  try {
    const { data } = await axiosWithBackoff({
      url: 'https://api.dexscreener.com/latest/dex/search?q=sol',
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    });
    return data?.pairs?.map((p: any) => ({
      token_address: p.baseToken.address,
      token_name: p.baseToken.name,
      token_ticker: p.baseToken.symbol,
      price_sol: Number(p.priceUsd) || 0,
      source: 'DexScreener'
    })) || [];
  } catch (err) {
    console.error('DexScreener fetch error:', err);
    return [];
  }
}

// GeckoTerminal fetcher
/*export async function fetchGeckoTerminal() {
  try {
    const { data } = await axiosWithBackoff({
      url: 'https://api.geckoterminal.com/api/v2/networks/solana/tokens?page=1',
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    });
    return data?.data?.map((t: any) => ({
      token_address: t.id,
      token_name: t.attributes.name,
      token_ticker: t.attributes.symbol,
      price_sol: Number(t.attributes.price_usd) || 0,
      source: 'GeckoTerminal'
    })) || [];
  } catch (err) {
    console.error('GeckoTerminal fetch error:', err);
    return [];
  }
}

// Jupiter Price API fetcher
export async function fetchJupiterPrices(tokenIds: string[]) {
  try {
    if (!tokenIds.length) return {};
    const idsParam = tokenIds.join(',');
    const { data } = await axiosWithBackoff({
      url: `https://price.jup.ag/v4/price?ids=${idsParam}`,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    });
    // data is an object: { [tokenId]: { id, mintSymbol, vsToken, price, ... } }
    return data;
  } catch (err) {
    console.error('Jupiter fetch error:', err);
    return {};
  }
}*/
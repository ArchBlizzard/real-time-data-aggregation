import axios from 'axios';

export async function fetchDexScreener() {
  try {
    const { data } = await axios.get(
      'https://api.dexscreener.com/latest/dex/search?q=sol'
    );
    return data?.pairs?.map((p: any) => ({
      token_address: p.baseToken.address,
      token_name: p.baseToken.name,
      token_price_usd: p.priceUsd ?? 0
    })) || [];
  } catch (err) {
    console.error('DexScreener fetch error:', err);
    return [];
  }
}
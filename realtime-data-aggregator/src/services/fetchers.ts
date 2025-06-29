import axios from 'axios';

export async function fetchDexScreener() {
  try {
    const { data } = await axios.get(
      'https://api.dexscreener.com/latest/dex/search?q=sol'
    );
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

export async function fetchGeckoTerminal() {
  try {
    const { data } = await axios.get(
      'https://api.geckoterminal.com/api/v2/networks/solana/tokens'
    );
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
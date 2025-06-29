import { Router, Request, Response } from 'express';
import { getCachedTokens, fetchAndCacheTokens } from '../services/aggregator';

export const tokenRouter = Router();

tokenRouter.get('/', async (req: Request, res: Response) => {
  try {
    let tokens = await getCachedTokens();

    // --- Filtering ---
    // Filter by time period (dummy: price change in 1h, 24h, 7d)
    const period = req.query.period as string; // '1h', '24h', '7d'
    if (period && ['1h', '24h', '7d'].includes(period)) {
      const key = period === '1h' ? 'price_1hr_change' : period === '24h' ? 'price_24hr_change' : 'price_7d_change';
      tokens = tokens.filter((t: any) => t[key] !== undefined);
    }

    // --- Sorting ---
    // sortBy: 'volume_sol', 'price_sol', 'market_cap_sol', etc.
    const sortBy = (req.query.sortBy as string) || 'volume_sol';
    const sortDir = (req.query.sortDir as string) === 'asc' ? 1 : -1;
    tokens = tokens.sort((a: any, b: any) => {
      const av = a[sortBy] ?? 0;
      const bv = b[sortBy] ?? 0;
      return (av - bv) * sortDir;
    });

    // --- Pagination (cursor-based) ---
    const limit = Math.max(1, Math.min(Number(req.query.limit) || 20, 100));
    const cursor = req.query.cursor as string | undefined;
    let startIdx = 0;
    if (cursor) {
      const idx = tokens.findIndex((t: any) => t.token_address === cursor);
      startIdx = idx >= 0 ? idx + 1 : 0;
    }
    const paginated = tokens.slice(startIdx, startIdx + limit);
    const nextCursor = paginated.length === limit ? paginated[paginated.length - 1].token_address : null;

    res.json({
      tokens: paginated,
      nextCursor,
      total: tokens.length
    });
  } catch (err) {
    res.status(500).json({ error: 'Token fetch failed' });
  }
});

tokenRouter.post('/refresh', async (req: Request, res: Response) => {
  try {
    const updatedTokens = await fetchAndCacheTokens();
    res.json(updatedTokens);
  } catch (err) {
    res.status(500).json({ error: 'Refresh failed' });
  }
});
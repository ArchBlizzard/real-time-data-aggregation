import { Router } from 'express';
import { getCachedTokens, fetchAndCacheTokens } from '../services/aggregator';

export const tokenRouter = Router();

// GET tokens (with caching)
tokenRouter.get('/', async (req, res) => {
  try {
    const tokens = await getCachedTokens();
    return res.json(tokens);
  } catch {
    return res.status(500).json({ error: 'Fetch error' });
  }
});

// Force refresh data
tokenRouter.post('/refresh', async (req, res) => {
  try {
    const tokens = await fetchAndCacheTokens();
    return res.json(tokens);
  } catch {
    return res.status(500).json({ error: 'Refresh error' });
  }
});
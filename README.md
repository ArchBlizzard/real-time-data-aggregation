# Real-time Meme Coin Data Aggregation Service

## Overview

This service aggregates real-time meme coin data from multiple DEX sources (DexScreener and GeckoTerminal), caches results in Redis, and provides both REST API and WebSocket endpoints for live updates.

## Features

- Aggregates token data from DexScreener and GeckoTerminal APIs
- Merges duplicate tokens by address
- Caches results in Redis (default TTL: 30 seconds)
- REST API for fetching and refreshing token data
- WebSocket server (Socket.io) for real-time connections
- CORS enabled for both REST and WebSocket endpoints

## Tech Stack

- Node.js + TypeScript
- Express.js (REST API)
- Socket.io (WebSocket)
- Redis (ioredis client)
- Axios (HTTP client)

## Project Structure

```
realtime-data-aggregator/
├── src/
│   ├── index.ts              # Entry point (Express + Socket.io)
│   ├── routes/
│   │   └── tokens.ts         # REST API routes
│   ├── services/
│   │   ├── aggregator.ts     # Aggregation and caching logic
│   │   ├── fetchers.ts       # DEX API fetchers
│   │   └── cache.ts          # Redis client
├── package.json
├── tsconfig.json
├── .gitignore
```

## How to Run

1. **Install dependencies:**
   ```
   npm install
   ```

2. **Start Redis server** (if not already running):
   ```
   redis-server
   ```

3. **Build and start the server:**
   ```
   npm run build
   npm start
   ```

4. **Test REST API:**
   - Fetch tokens:
     ```
     curl http://localhost:3000/api/tokens
     ```
   - Force refresh:
     ```
     curl -X POST http://localhost:3000/api/tokens/refresh
     ```

5. **Test WebSocket:**
   - Open `socket-test.html` in your browser to connect via Socket.io.

## API Endpoints

- `GET /api/tokens`  
  Returns the list of aggregated tokens (from cache or fresh if cache expired).

- `POST /api/tokens/refresh`  
  Forces a refresh from DEX APIs and updates the cache.

## Next Steps

- Add more DEX sources (e.g., Jupiter)
- Implement rate limiting and exponential backoff for API calls
- Add real-time push logic for price/volume changes via WebSocket
- Support filtering, sorting, and pagination
- Add unit/integration tests and Postman collection
- Deploy to a free hosting platform

---

**Status:**  
MVP backend is running with aggregation, caching, REST API, and WebSocket server.  
Ready for further enhancements and deployment.
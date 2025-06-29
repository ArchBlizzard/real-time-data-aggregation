# Real-time Meme Coin Data Aggregation Service

## Overview

This service aggregates real-time meme coin data from multiple DEX sources (DexScreener and GeckoTerminal), caches results in Redis, and provides both REST API and WebSocket endpoints for live updates.

## Features

- Aggregates token data from DexScreener and GeckoTerminal APIs
- Merges duplicate tokens by address
- Caches results in Redis (default TTL: 30 seconds)
- REST API for fetching and refreshing token data
- WebSocket server (Socket.io) for real-time connections
- Filtering, sorting, and cursor-based pagination
- CORS enabled for both REST and WebSocket endpoints
- Rate limiting and exponential backoff for API calls
- Unit/integration tests and Postman collection
- Ready for deployment to free hosting

## Tech Stack

- Node.js + TypeScript
- Express.js (REST API)
- Socket.io (WebSocket)
- Redis (ioredis client)
- Axios (HTTP client)
- Jest & Supertest (testing)

## Project Structure


realtime-data-aggregator/
├── src/
│   ├── index.ts              # Entry point (Express + Socket.io)
│   ├── routes/
│   │   └── tokens.ts         # REST API routes
│   ├── services/
│   │   ├── aggregator.ts     # Aggregation and caching logic
│   │   ├── fetchers.ts       # DEX API fetchers
│   │   └── cache.ts          # Redis client
├── test/                     # Unit and integration tests
├── package.json
├── tsconfig.json
├── .gitignore
├── socket-test.html


## How to Run Locally

1. *Install dependencies:*
   sh
   npm install
   

2. *Start Redis server* (if not already running):
   sh
   redis-server
   

3. *Build and start the server:*
   sh
   npm run build
   npm start
   

4. *Test REST API:*
   - Fetch tokens:
     sh
     curl http://localhost:3000/api/tokens
     
   - Force refresh:
     sh
     curl -X POST http://localhost:3000/api/tokens/refresh
     

5. *Test WebSocket:*
   - Open socket-test.html in your browser to connect via Socket.io.
   - Open multiple tabs to see real-time updates.

## API Endpoints

- GET /api/tokens  
  Returns the list of aggregated tokens (from cache or fresh if cache expired).

- POST /api/tokens/refresh  
  Forces a refresh from DEX APIs and updates the cache.

## API Testing

Use the included Postman collection (postman_collection.json) to test all endpoints, or use curl/your browser.

#### Example Requests

- *Fetch all tokens (default):*
  sh
  curl "http://localhost:3000/api/tokens"
  

- *Force refresh from DEX APIs:*
  sh
  curl -X POST "http://localhost:3000/api/tokens/refresh"
  

- *Filtering by time period (e.g., 1 hour):*
  sh
  curl "http://localhost:3000/api/tokens?period=1h"
  

- *Sorting by price (descending):*
  sh
  curl "http://localhost:3000/api/tokens?sortBy=price_sol&sortDir=desc"
  

- *Sorting by volume (ascending):*
  sh
  curl "http://localhost:3000/api/tokens?sortBy=volume_sol&sortDir=asc"
  

- *Pagination (first 10 tokens):*
  sh
  curl "http://localhost:3000/api/tokens?limit=10"
  

- *Pagination (next page using nextCursor from previous response):*
  sh
  curl "http://localhost:3000/api/tokens?limit=10&cursor=<nextCursor_value>"
  

- *Combined filtering, sorting, and pagination:*
  sh
  curl "http://localhost:3000/api/tokens?period=1h&sortBy=price_sol&sortDir=desc&limit=5"
  

### WebSocket Testing

- Open socket-test.html in multiple browser tabs to see real-time updates pushed from the backend.
- You should see live token updates as data changes (either periodically or after a manual refresh).

## Demo Video

- [YouTube Demo Link](#) (add your 1-2 min demo video link here)

## Design Decisions

- Aggregation merges tokens by address and combines sources.
- Caching with Redis reduces API calls and improves performance.
- Exponential backoff and retry logic handle rate limits gracefully.
- WebSocket updates are pushed only when data changes for efficiency.
- Filtering, sorting, and pagination are handled server-side for scalability.

## Testing
### API Testing
- See example requests above.

### WebSocket Testing
- Open socket-test.html in multiple browser tabs to see real-time updates.

---

*Status:*  
MVP backend is running with aggregation, caching, REST API, WebSocket server, filtering, sorting, pagination, and tests.  
Ready for deployment and demo.

---

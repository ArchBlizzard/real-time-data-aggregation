# Real-time Meme Coin Data Aggregation Service

**Deployed to free hosting:**  
[URL](https://real-time-data-aggregation.onrender.com/api/tokens)

## Overview

This service aggregates real-time meme coin data from DexScreener, caches results in Redis, and provides both REST API and WebSocket endpoints for live updates.

## Features

- Aggregates token data from DexScreener  
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

## How to Run Locally

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

````

4. **Test REST API (Local):**
- Fetch tokens:
  ```
  curl "http://localhost:3000/api/tokens"
  ```
- Force refresh:
  ```
  curl -X POST "http://localhost:3000/api/tokens/refresh"
  ```

5. **Test WebSocket:**
- Open `socket-test.html` in your browser to connect via Socket.io.
- Open multiple tabs to see real-time updates.

## API Endpoints

- **GET /api/tokens**  
Returns the list of aggregated tokens (from cache or fresh if cache expired).

- **POST /api/tokens/refresh**  
Forces a refresh from DEX APIs and updates the cache.

## API Testing

Use the included Postman collection (`postman_collection.json`) to test endpoints, or use curl/your browser.

---

### 🔹 Example Requests - **Local**

- Fetch all tokens:  
````

curl "[http://localhost:3000/api/tokens](http://localhost:3000/api/tokens)"

```

- Force refresh:  
```

curl -X POST "[http://localhost:3000/api/tokens/refresh](http://localhost:3000/api/tokens/refresh)"

```

- Filter by period (e.g., 1 hour):  
```

curl "[http://localhost:3000/api/tokens?period=1h](http://localhost:3000/api/tokens?period=1h)"

```

- Sort by price (descending):  
```

curl "[http://localhost:3000/api/tokens?sortBy=price\_sol\&sortDir=desc](http://localhost:3000/api/tokens?sortBy=price_sol&sortDir=desc)"

```

- Sort by volume (ascending):  
```

curl "[http://localhost:3000/api/tokens?sortBy=volume\_sol\&sortDir=asc](http://localhost:3000/api/tokens?sortBy=volume_sol&sortDir=asc)"

```

- Pagination - First 10 tokens:  
```

curl "[http://localhost:3000/api/tokens?limit=10](http://localhost:3000/api/tokens?limit=10)"

```

- Pagination - Next page:  
```

curl "[http://localhost:3000/api/tokens?limit=10\&cursor=](http://localhost:3000/api/tokens?limit=10&cursor=)\<nextCursor\_value>"

```

- Combined filters:  
```

curl "[http://localhost:3000/api/tokens?period=1h\&sortBy=price\_sol\&sortDir=desc\&limit=5](http://localhost:3000/api/tokens?period=1h&sortBy=price_sol&sortDir=desc&limit=5)"

```

---

### 🔹 Example Requests - **Deployed**

- Fetch all tokens:  
https://real-time-data-aggregation.onrender.com/api/tokens

- Force refresh:  
https://real-time-data-aggregation.onrender.com/api/tokens/refresh

- Filter by period (e.g., 1 hour):  
https://real-time-data-aggregation.onrender.com/api/tokens?period=1h

- Sort by price (descending):  
https://real-time-data-aggregation.onrender.com/api/tokens?sortBy=price_sol&sortDir=desc

- Sort by volume (ascending):  
https://real-time-data-aggregation.onrender.com/api/tokens?sortBy=volume_sol&sortDir=asc

- Pagination - First 10 tokens:  
https://real-time-data-aggregation.onrender.com/api/tokens?limit=10

- Pagination - Next page:  
https://real-time-data-aggregation.onrender.com/api/tokens?limit=10&cursor=<nextCursor_value>

- Combined filters:  
https://real-time-data-aggregation.onrender.com/api/tokens?period=1h&sortBy=price_sol&sortDir=desc&limit=5

---

## WebSocket Testing

- Open `socket-test.html` in multiple browser tabs.
- You should see live token updates as data changes, either periodically or after a manual refresh.

## Demo Video

[Watch Demo](https://drive.google.com/file/d/1eY_ImSKYNch4e9eCVm8cYoR6zzO_VHJ8/view?usp=sharing)

## Design Decisions

- Aggregation merges tokens by address across sources.  
- Redis caching helps reduce load on external APIs.  
- Retry logic with exponential backoff handles rate limits.  
- WebSocket only emits updates when data changes (efficient broadcasting).  
- Filtering, sorting, and pagination are implemented on the backend.

## Testing

- REST API: Use curl/Postman or your browser to test endpoints.  
- WebSocket: Open `socket-test.html` in multiple tabs to observe real-time updates.
const axios = require('axios');

// Example: SOL and USDC (use real token addresses for more tokens)
const tokenIds = ['So11111111111111111111111111111111111111112', 'EPjFWdd5AufqSSqeM2q8j4cVhF5F7h8Yk1bB5uF7P1xX']; // SOL, USDC

axios.get(`https://price.jup.ag/v4/price?ids=${tokenIds.join(',')}`, {
  headers: {
    'User-Agent': 'Mozilla/5.0',
    'Accept': 'application/json'
  }
})
.then(res => {
  console.log('Jupiter Price API response:', res.data);
})
.catch(err => {
  if (err.response) {
    console.error('Error:', err.response.status, err.response.data);
  } else {
    console.error('Error:', err.message);
  }
});
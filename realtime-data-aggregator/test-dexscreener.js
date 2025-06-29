const axios = require('axios');

axios.get('https://api.dexscreener.com/latest/dex/search?q=sol', {
  headers: {
    'User-Agent': 'Mozilla/5.0',
    'Accept': 'application/json'
  }
})
.then(res => {
  console.log('Success! Sample data:', res.data.pairs?.slice(0, 2)); // print first 2 pairs
})
.catch(err => {
  if (err.response) {
    console.error('Error:', err.response.status, err.response.data);
  } else {
    console.error('Error:', err.message);
  }
});
// test-gecko.js
const axios = require('axios');
axios.get('https://api.geckoterminal.com/api/v2/networks/', {
  headers: {
    'User-Agent': 'Mozilla/5.0',
    'Accept': 'application/json'
  }
}).then(res => {
  console.log('Success:', res.data);
}).catch(err => {
  if (err.response) {
    console.error('Error:', err.response.status, err.response.data);
  } else {
    console.error('Error:', err.message);
  }
});
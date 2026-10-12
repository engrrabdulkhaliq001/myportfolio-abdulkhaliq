const http = require('http');

console.log('Inspecting layout via HTTP server...');
http.get('http://127.0.0.1:3000', (res) => {
  console.log(`HTTP Status: ${res.statusCode}`);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(`Received ${data.length} bytes.`);
    const hasMenuToggle = data.includes('id="menuToggle"');
    console.log(`Has menuToggle: ${hasMenuToggle}`);
  });
});

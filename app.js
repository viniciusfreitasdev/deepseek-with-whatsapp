const express = require('express');
const app = express()
const port = 3000

// Calling the integraton.js file
const integration = require('./integration');

// Middleware to interpret JSON in the request body
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Word!')
});

// API - Return deep prompt, prompt and history chat
app.post('/api/returnPrompt', async (req, res) => {
  const data = await integration.returnPrompt(req, res);
  res.json(data);
});

// API - Return history cache
app.post('/api/viewHistory', (req, res) => {
  integration.viewHistory(req, res);
});

// API - Return QRCode for WhastApp
app.post('/api/returnqr', async (req, res) => {
  const data = await integration.returnqr(req, res);
  res.json(data);
});

app.listen(port, () => console.log(`deepseek-with-whatsapp listening on http://localhost:${port}/ `))
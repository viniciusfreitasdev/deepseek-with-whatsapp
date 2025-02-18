const express = require('express');
const fs = require('fs');
const app = express();
require('dotenv').config(); // Loads the variables from the .env file

const port = process.env.PORT || 3000;;
const pathsDelete = ['./.wwebjs_auth', './.wwebjs_cache']; // Path of folders to be excluded

// Function to delete folder recursively
const deleteFolders = (paths) => {
  paths.forEach(folderPath => {
    if (fs.existsSync(folderPath)) {
      fs.rmSync(folderPath, { recursive: true, force: true });
      console.log(`${folderPath} Test folder deleted successfully!`);
    }
  });
};

// Exclude folder when starting script
deleteFolders(pathsDelete);


// Calling the integraton.js file
const integration = require('./integration');

// Middleware to interpret JSON in the request body
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Word!')
});

// API - Return deep prompt, prompt and history chat -> Change for last message recevied
app.post('/api/viewAll', async (req, res) => {
  const data = await integration.viewAll(req, res);
  res.json(data);
});

// API - Return history cache -> Change for last message recevied
app.post('/api/viewHistory', (req, res) => {
  integration.viewHistory(req, res);
});

// API - Return QRCode for WhastApp
app.get('/api/returnqr', async (req, res) => {
  const data = await integration.returnqr(req, res);
  res.json(data);
});

// API - User history view
app.post('/api/historyView', async (req, res) => {
  const data = await integration.historyView(req, res);
  res.json(data);
});

// API - Message request per user
app.post('/api/messagePerUser', async (req, res) => {
  const data = await integration.messagePerUser(req, res, true);
  res.json(data);
});

// API - Clear histoy per User
app.post('/api/clearUser', async (req, res) => {
  const data = await integration.clearUser(req, res);
  res.json(data);
});

// API - Clean all history
app.post('/api/clearAllUser', async (req, res) => {
  const data = await integration.clearAllUser(req, res);
  res.json(data);
});

app.listen(port, () =>  { console.log(`deepseek-with-whatsapp listening on http://localhost:${port}/ `)})
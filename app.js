const express = require('express');
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Word!')
});

app.get('/api/returnPrompt', (req, res) => {
  // Function to view user prompt
});


app.listen(port, () => console.log(`deepseek-with-whatsapp listening on http://localhost:${port}/ `))
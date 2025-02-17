const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const axios  = require('axios');

// Deep prompt for entire application
const deepPrompt = 'Responda de forma natural e amigável, mantendo o contexto da conversa.'

// Object to store conversation history
let history = {}

// String that controls the qrcode code
let qrCodeData = '';

// Initialize the WhatsApp client
const client = new Client({
  authStrategy: new LocalAuth() // Saves the session locally
});

// WhatsApp Web - Instantiating the qrcode
client.on('qr', (qr) => { qrCodeData = qr; })

// WhatsApp Web - Client is ready to be called
client.on('ready', () => { console.log('Client is ready!'); });

// WhatsApp Web - 
client.on('message', (message) => {
  console.log(`Message received from ${ message.from }: ${ message.body } `);

  const response = '';

  // Reply to the message on WhatsApp
  // message.reply(response);
});

// WhatsApp Web - Starting the client
client.initialize();

// Function - Return QRCode for WhastApp
exports.returnqr = async (req, res) => {
  try {
    



    res.send('Return QRCode is working!');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function - Return history cache
exports.returnPrompt = async (req, res) => {
  try {
    const userPrompt = req.body.prompt;

    const returnData = {
        prompt     : userPrompt
      , deepPrompt : deepPrompt      
      , history    : history
    }

    return returnData;

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Function - Return deep prompt, prompt and history chat
exports.viewHistory = async (req, res) => {
  try {
    res.send(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ProcessMensage
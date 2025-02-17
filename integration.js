const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const axios  = require('axios');

// Deep prompt for entire application
const deepPrompt = 'Responda de forma natural e amigável, mantendo o contexto da conversa.'

// Object to store conversation history
let history = {}

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
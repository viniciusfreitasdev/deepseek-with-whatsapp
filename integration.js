const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const axios  = require('axios');
require('dotenv').config(); // Loads the variables from the .env file

// Deep prompt for entire application
const deepPrompt = 'Responda de forma natural e amigável, mantendo o contexto da conversa.'

// Object that stores conversation history
let history = {}

// Object that stores the last prompt ( Per User )
let lastPrompt = {}

// String that controls the qrcode code
let dataQrcode = '';

// Initialize the WhatsApp client
const client = new Client({
  authStrategy: new LocalAuth() // Saves the session locally
});

// WhatsApp Web - Instantiating the qrcode
client.on('qr', (qr) => { 
  dataQrcode = qr;
  console.log('Client is ready :>> ', qr);
})

// WhatsApp Web - Client is ready to be called
client.on('ready', () => { console.log('Client is ready!'); });

// WhatsApp Web - Captures sent and received messages
// client.on('message', (message) => { -> Capture only incoming messages
client.on('message_create', async (message) => {

  // I added this if statement for testing purposes, to receive only messages from you in a specific WhatsApp group.
  if(
      message.fromMe
    & message.to == process.env.messageTo
    & message.from == process.env.messageFrom
    & !message.body.startsWith("AI Assistant:")
  ) {
    console.log(`Message received from ${ message.from }: ${ message.body } `);

    const response = await this.messagePerUser(message.from, message.body, false) ;

    // Reply to the message on WhatsApp ( in test )
    message.reply(response);
  }
});

// WhatsApp Web - 
client.on('disconnected', (reason) => {
  console.log('Client disconnected! Reason:', reason);
  client.initialize();
});


// WhatsApp Web - Starting the client
client.initialize();

// Function - Return QRCode for WhastApp
exports.returnqr = async (req, res) => {
  try {

    const qrCodeImage = await qrcode.toBuffer(dataQrcode, { type: 'png' })
    res.setHeader('Content-Type', 'image/png');
    res.send(qrCodeImage)

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function - Return history cache
exports.viewAll = async (req, res) => {
  try {

    return {
        deepPrompt     : deepPrompt // Return deep prompt
      , userLastPrompt : lastPrompt // Return all last prompts
      , userHistory    : history    // Return all history
    };

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

// Function - User history view
exports.historyView = async (req, res) => {
  try {
    return {
        lastPrompt : lastPrompt[req.body.user] // Return last prompt per user
      , userHistory: history[req.body.user]    // Return all history per user
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function - Clear histoy per User
exports.clearUser = async (req, res) => {
  try {

    const userId = req.body.user; // User by request
    let replyMessage = '';        // Instace message

    if(history[userId]){ history[userId] = []; replyMessage = `User ${userId} history successfully cleared` } // Return if user exist
    else { replyMessage = `User ${userId} does not yet have a chat history` } // Return 'if else' user not exist

    return replyMessage;

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Function - Clean all history
exports.clearAllUser = async (req, res) => {
  try {
    
    history = {}; // Reset history
    return 'History successfully cleared';
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Function - Message request per user (API e WhatsApp Message)
exports.messagePerUser = async (req, res, typeRequest) => {
  try {

    const userId     = typeRequest ? req.body.user   : req;  // User by request
    const promptUser = typeRequest ? req.body.prompt : res;  // User prompt
  
    if (!history[userId]) { history[userId] = [] }        // Creates the user's history space if it does not exist
    if (!lastPrompt[userId]) { lastPrompt[userId] = [] }  // Creates the user's last prompt space if it does not exist
    
    instancePromptUser = { role: "user", content: promptUser }; // Creates the instance of the user's prompt object
  
    history[userId].push(instancePromptUser); // Saves the history of prompts made by the user
    lastPrompt[userId] = instancePromptUser;  // Saves the last prompt written by the user
  
    history[userId].length > 10 ?? history[userId].shift(); // Removes the history in order to keep the last 10 records.

    const response = await axios.post('http://127.0.0.1:1234/v1/chat/completions', {
        model    : "deepseek-r1-distill-llama-8b"
      , messages : [
            { role: "system", content: deepPrompt },
            ...history[userId] // Sends the user's complete history
          ]
      , temperature : 0.7
      , max_tokens  : -1
    });

    const reply = response.data.choices[0].message.content.replace(/<think>[\s\S]*?<\/think>/g, '').trim(); // Saves response by removing the 'think' tag

    history[userId].push({ role: 'assistant', content: reply }); // Save AI response in history
  
    return `AI Assistant: ${reply}`; // Function response

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

# DeepSeek Local with WhatsApp Web to generate structured responses

This project aims to implement a functionality test using ExpressJS and a locally running LLM (Large Language Model) to generate quick, automatic responses for WhatsApp. The system leverages WhatsApp Web API and integrates with an AI model to simulate a conversational assistant.

## Features

- **QR Code Generation**: Generates a QR code to authenticate WhatsApp Web.
- **Message Handling**: Receives messages from users and sends automatic replies based on a conversation history.
- **History Management**: Provides functionality to view, clear, or manage user-specific and global conversation history.
- **API Endpoints**:
  - `/api/viewAll`: Returns deep prompt, user last prompt, and user history.
  - `/api/viewHistory`: Returns the complete history of messages.
  - `/api/historyView`: Returns the history and last prompt of a specific user.
  - `/api/clearUser`: Clears the chat history for a specific user.
  - `/api/clearAllUser`: Clears all chat history.
  - `/api/messagePerUser`: Sends a message per user based on the conversation context.
  - `/api/returnqr`: Returns the QR code image for WhatsApp Web authentication.

## Requirements

- Node.js (>= 14.x)
- npm (>= 6.x)
- dotenv for environment variables
- WhatsApp Web Client
- Local LLM instance running

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/viniciusfreitasdev/deepseek-with-whatsapp.git
   cd whatsapp-auto-response
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and set up the required environment variables:

   ```env
   PORT=3000
   messageTo=your_target_number
   messageFrom=your_whatsapp_number
   ```

4. Start the application:

   ```bash
   npm start
   ```

## How it Works

- The server runs an ExpressJS application that handles HTTP requests for interacting with the WhatsApp Web client.
- The AI assistant communicates via a locally hosted LLM instance (DeepSeek model) to generate replies based on the user's message history.
- Upon receiving a message from a specific user or group, the system stores the message and responds with an intelligent, context-aware reply.
- The QR code for WhatsApp Web authentication is generated and can be scanned by the user to establish a connection.

## Example Use Case

1. **User sends a message**: The system listens for incoming WhatsApp messages.
2. **Message Processing**: The system processes the message and generates an appropriate response based on the user's conversation history.
3. **Reply**: The system sends the AI-generated reply back to the user on WhatsApp.

## APIs

### `GET /api/returnqr`

Generates and returns the QR code image for WhatsApp Web authentication.

### `POST /api/viewAll`

Returns the deep prompt, last prompt per user, and the entire user history.

### `POST /api/viewHistory`

Returns the complete chat history.

### `POST /api/historyView`

Returns the history and last prompt for a specific user.

### `POST /api/messagePerUser`

Processes a message from a user and returns the AI's reply based on the conversation history.

### `POST /api/clearUser`

Clears the history for a specific user.

### `POST /api/clearAllUser`

Clears the entire chat history.

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-xyz`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add feature XYZ'`)
5. Push to the branch (`git push origin feature-xyz`)
6. Create a new Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments

- [WhatsApp Web API](https://docs.wwebjs.dev/index.html)
- [DeepSeek Model](https://www.deepseek.com/)

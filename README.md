# Relay Chat

A real-time chat application built with Firebase and Node.js. This project provides a scalable backend for managing chat rooms and messages with real-time synchronization.

## Features

- **Real-time Messaging**: Instant message delivery using Firebase Firestore
- **Multiple Chat Rooms**: Create and manage multiple chat rooms
- **User Authentication**: Secure user authentication with Firebase Auth
- **File Uploads**: Share media files in chat rooms
- **Scalable**: Built on Firebase for unlimited scalability

## Prerequisites

- Node.js v14 or higher
- Firebase account
- Firebase CLI installed

## Installation

1. Clone the repository:
```bash
git clone https://github.com/hasinatori/relay-chat.git
cd relay-chat
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
```bash
firebase init
```

4. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your Firebase credentials
```

## Usage

### Local Development

Start the Firebase emulator:
```bash
npm run serve
```

### Deploy to Production

Deploy your functions:
```bash
npm run deploy
```

## API Endpoints

### Create a Chat Room

**POST** `/createChatRoom`

Request body:
```json
{
  "name": "General",
  "description": "General discussion room"
}
```

Response:
```json
{
  "id": "room123",
  "name": "General",
  "description": "General discussion room"
}
```

### Send a Message

**POST** `/createMessage`

Request body:
```json
{
  "text": "Hello everyone!",
  "userId": "user123",
  "chatRoomId": "room123"
}
```

Response:
```json
{
  "id": "msg123",
  "text": "Hello everyone!",
  "userId": "user123",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Get Messages

**GET** `/getMessages?chatRoomId=room123`

Response:
```json
[
  {
    "id": "msg123",
    "text": "Hello everyone!",
    "userId": "user123",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
]
```

## Security Rules

The project includes Firestore and Storage security rules to protect user data:

- Messages are accessible only to authenticated users
- File uploads are limited to 5MB
- User avatars are only modifiable by the user themselves

## Testing

Run tests with:
```bash
npm test
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions, please open an issue on GitHub.

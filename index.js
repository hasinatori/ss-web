const admin = require('firebase-admin');
const functions = require('firebase-functions');
const cors = require('cors')();

// Initialize Firebase Admin SDK
admin.initializeApp();

const db = admin.firestore();

// Create or update a chat message
exports.createMessage = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed');
    }

    try {
      const { text, userId, chatRoomId } = req.body;

      if (!text || !userId || !chatRoomId) {
        return res.status(400).send('Missing required fields');
      }

      const messageRef = await db.collection('chatRooms').doc(chatRoomId).collection('messages').add({
        text,
        userId,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

      res.status(201).json({
        id: messageRef.id,
        text,
        userId,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      functions.logger.error('Error creating message:', error);
      res.status(500).send('Internal Server Error');
    }
  });
});

// Get messages from a chat room
exports.getMessages = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'GET') {
      return res.status(405).send('Method Not Allowed');
    }

    try {
      const { chatRoomId } = req.query;

      if (!chatRoomId) {
        return res.status(400).send('Missing chatRoomId');
      }

      const messagesSnapshot = await db
        .collection('chatRooms')
        .doc(chatRoomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .get();

      const messages = messagesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json(messages);
    } catch (error) {
      functions.logger.error('Error getting messages:', error);
      res.status(500).send('Internal Server Error');
    }
  });
});

// Create a new chat room
exports.createChatRoom = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed');
    }

    try {
      const { name, description } = req.body;

      if (!name) {
        return res.status(400).send('Missing name');
      }

      const chatRoomRef = await db.collection('chatRooms').add({
        name,
        description: description || '',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      res.status(201).json({
        id: chatRoomRef.id,
        name,
        description: description || '',
      });
    } catch (error) {
      functions.logger.error('Error creating chat room:', error);
      res.status(500).send('Internal Server Error');
    }
  });
});

const express = require('express');
const { createServer } = require('http');
const { join } = require('path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

const users = {}; // Store users and their socket IDs

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('register', (userId) => {
    users[userId] = socket.id;
    console.log(`User ${userId} registered with socket ID ${socket.id}`);
    socket.userId = userId; // Store userId on the socket for later use
  });

  socket.on('send-message', ({ to, message }) => {
    const senderId = socket.userId;
    const recipientSocketId = users[to];

    if (recipientSocketId) {
      io.to(recipientSocketId).emit('receive-message', { from: senderId, message });
    } else {
      socket.emit('error', 'Recipient not found');
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    //Remove the user from the users Object
    if(socket.userId){
      delete users[socket.userId];
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
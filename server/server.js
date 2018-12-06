//const server = require('http').createServer()
//const io = require('socket.io')(server)

//const ClientManager = require('./ClientManager')
//const ChatroomManager = require('./ChatroomManager')
//const makeHandlers = require('./handlers')

//const clientManager = ClientManager()
//const chatroomManager = ChatroomManager()

//io.on('connection', function (client) {
//  const {
//    handleRegister,
//    handleJoin,
//    handleLeave,
//    handleMessage,
//    handleGetChatrooms,
//    handleGetAvailableUsers,
//    handleDisconnect
//  } = makeHandlers(client, clientManager, chatroomManager)

//  console.log('client connected...', client.id)
//  clientManager.addClient(client)

//  client.on('register', handleRegister)

//  client.on('join', handleJoin)

//  client.on('leave', handleLeave)

//  client.on('message', handleMessage)

//  client.on('chatrooms', handleGetChatrooms)

//  client.on('availableUsers', handleGetAvailableUsers)

//  client.on('disconnect', function () {
//    console.log('client disconnect...', client.id)
//    handleDisconnect()
//  })

//  client.on('error', function (err) {
//    console.log('received error from client:', client.id)
//    console.log(err)
//  })
//})

//server.listen(3000, function (err) {
//  if (err) throw err
//  console.log('listening on port 3000')
//})


'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, '../index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', function (client) {
  const {
    handleRegister,
    handleJoin,
    handleLeave,
    handleMessage,
    handleGetChatrooms,
    handleGetAvailableUsers,
    handleDisconnect
  } = makeHandlers(client, clientManager, chatroomManager)

  console.log('client connected...', client.id)
  clientManager.addClient(client)

  client.on('register', handleRegister)

  client.on('join', handleJoin)

  client.on('leave', handleLeave)

  client.on('message', handleMessage)

  client.on('chatrooms', handleGetChatrooms)

  client.on('availableUsers', handleGetAvailableUsers)

  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
    handleDisconnect()
  })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
})

//server.listen(PORT, function (err) {
//  if (err) throw err
//  console.log('listening on port ${ PORT }')
//})

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

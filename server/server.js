const io = require('socket.io')(5000)

io.on('connection', socket => {
  const id = socket.handshake.query.id
  socket.join(id)
  // console.log('new socket', id);
  socket.on('send-message', ({ recipients, text }) => {
    // console.log('new message', recipients, text);
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient);
      newRecipients.push(id)
      // console.log(newRecipients, id, recipient);
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients, sender: id, text
      })
    })
  })
})